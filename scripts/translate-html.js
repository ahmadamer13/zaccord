#!/usr/bin/env node
/*
  Translate all HTML files’ visible text from Hungarian to English, in-place.

  - Walks a directory (default: src)
  - For each .html file, translates text nodes between tags
  - Preserves tags/attributes; skips <script> and <style> blocks
  - Uses providers in this priority: DeepL -> Google (v3 if project given, else v2) -> LibreTranslate

  Usage:
    node scripts/translate-html.js --root src

  Env:
    DEEPL_API_KEY=...
    GOOGLE_API_KEY=...
    GOOGLE_PROJECT_ID=... (or GOOGLE_PROJECT_NUMBER=...)
    LT_ENDPOINT=https://libretranslate.com/translate (optional override)
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

function parseArgs(argv) {
  const args = { root: 'src' };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--root') args.root = argv[++i];
  }
  return args;
}

const args = parseArgs(process.argv);

const hasDeepl = !!process.env.DEEPL_API_KEY;
const hasGoogle = !!process.env.GOOGLE_API_KEY;
const G_PROJECT_ID = process.env.GOOGLE_PROJECT_ID || '';
const G_PROJECT_NUM = process.env.GOOGLE_PROJECT_NUMBER || '';

async function translateText(text) {
  if (!text || !/[ÁÉÍÓÖŐÚÜŰáéíóöőúüűA-Za-z]/.test(text)) return text;
  if (hasDeepl) return deeplTranslate(text, 'HU', 'EN');
  if (hasGoogle) return (G_PROJECT_ID || G_PROJECT_NUM)
    ? googleTranslateV3(text, 'hu', 'en')
    : googleTranslateV2(text, 'hu', 'en');
  return libreTranslate(text, 'hu', 'en');
}

function deeplTranslate(text, sourceLang, targetLang) {
  const apiKey = process.env.DEEPL_API_KEY;
  const body = new URLSearchParams({ auth_key: apiKey, text, source_lang: sourceLang, target_lang: targetLang }).toString();
  const options = {
    hostname: 'api-free.deepl.com', port: 443, path: '/v2/translate', method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(body) }
  };
  return new Promise(resolve => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed?.translations?.[0]?.text || text);
        } catch { resolve(text); }
      });
    });
    req.on('error', () => resolve(text));
    req.write(body); req.end();
  });
}

function googleTranslateV2(text, sourceLang, targetLang) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const params = new URLSearchParams({ q: text, source: sourceLang, target: targetLang, format: 'text' }).toString();
  const options = {
    hostname: 'translation.googleapis.com', port: 443,
    path: `/language/translate/v2?key=${encodeURIComponent(apiKey)}`,
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(params) }
  };
  return new Promise(resolve => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed?.data?.translations?.[0]?.translatedText || text);
        } catch { resolve(text); }
      });
    });
    req.on('error', () => resolve(text));
    req.write(params); req.end();
  });
}

function googleTranslateV3(text, sourceLang, targetLang) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const project = G_PROJECT_ID || G_PROJECT_NUM;
  const body = JSON.stringify({ contents: [text], mimeType: 'text/plain', sourceLanguageCode: sourceLang, targetLanguageCode: targetLang });
  const headers = { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) };
  if (G_PROJECT_NUM) headers['X-Goog-User-Project'] = G_PROJECT_NUM;
  const options = {
    hostname: 'translation.googleapis.com', port: 443,
    path: `/v3/projects/${encodeURIComponent(project)}/locations/global:translateText?key=${encodeURIComponent(apiKey)}`,
    method: 'POST', headers
  };
  return new Promise(resolve => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed?.translations?.[0]?.translatedText || parsed?.data?.translations?.[0]?.translatedText || text);
        } catch { resolve(text); }
      });
    });
    req.on('error', () => resolve(text));
    req.write(body); req.end();
  });
}

function libreTranslate(text, sourceLang, targetLang) {
  const endpoint = process.env.LT_ENDPOINT || 'https://libretranslate.com/translate';
  const payload = JSON.stringify({ q: text, source: sourceLang, target: targetLang, format: 'text' });
  const u = new URL(endpoint);
  const options = { hostname: u.hostname, port: u.port ? Number(u.port) : 443, path: u.pathname + (u.search || ''), method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Content-Length': Buffer.byteLength(payload) } };
  return new Promise(resolve => {
    const req = https.request(options, res => { let data = ''; res.on('data', d => data += d); res.on('end', () => { try { const parsed = JSON.parse(data); resolve(parsed?.translatedText || text); } catch { resolve(text); } }); });
    req.on('error', () => resolve(text)); req.write(payload); req.end();
  });
}

function listHtmlFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listHtmlFiles(p));
    else if (e.isFile() && p.endsWith('.html')) out.push(p);
  }
  return out;
}

function splitByTags(html) {
  // Returns array of tokens {type: 'tag'|'text', value}
  const tokens = [];
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) { tokens.push({ type: 'text', value: html.slice(i) }); break; }
    if (lt > i) tokens.push({ type: 'text', value: html.slice(i, lt) });
    const gt = html.indexOf('>', lt + 1);
    if (gt === -1) { tokens.push({ type: 'text', value: html.slice(lt) }); break; }
    tokens.push({ type: 'tag', value: html.slice(lt, gt + 1) });
    i = gt + 1;
  }
  return tokens;
}

function insideScriptOrStyle(openTags) {
  for (let j = openTags.length - 1; j >= 0; j--) {
    const t = openTags[j];
    if (/^<script\b/i.test(t) || /^<style\b/i.test(t)) return true;
  }
  return false;
}

async function translateHtmlContent(content) {
  const tokens = splitByTags(content);
  const out = [];
  const open = [];
  for (const tok of tokens) {
    if (tok.type === 'tag') {
      // Track open/close tags to skip script/style bodies
      if (/^<\//.test(tok.value)) { open.pop(); }
      else if (!/\/>$/.test(tok.value)) { open.push(tok.value); }
      out.push(tok.value);
    } else {
      if (insideScriptOrStyle(open)) { out.push(tok.value); continue; }
      // Translate only meaningful text (skip whitespace-only)
      const chunks = tok.value.split(/(\s+)/);
      const buf = [];
      for (const c of chunks) {
        if (/^\s*$/.test(c)) { buf.push(c); continue; }
        // Only translate text containing letters
        if (/[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]/.test(c)) {
          // eslint-disable-next-line no-await-in-loop
          const tr = await translateText(c);
          buf.push(tr);
        } else { buf.push(c); }
      }
      out.push(buf.join(''));
    }
  }
  return out.join('');
}

(async () => {
  const files = listHtmlFiles(args.root);
  for (const f of files) {
    const orig = fs.readFileSync(f, 'utf8');
    const translated = await translateHtmlContent(orig);
    if (translated !== orig) {
      fs.writeFileSync(f, translated, 'utf8');
      console.log('Translated:', f);
    } else {
      console.log('No change:', f);
    }
  }
  console.log('Done.');
})();

