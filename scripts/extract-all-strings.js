#!/usr/bin/env node
/*
  Extract ALL visible text content (ASCII + non‑ASCII) from HTML files in src/ and
  create per‑page JSON files under translations/pages_full plus a merged catalog
  at translations/catalog.full.i18n.json.

  Heuristics:
  - Collect visible text nodes (ignores script/style).
  - Collect text-bearing attributes: alt, title, placeholder, aria-label.
  - Filter: trim, collapse whitespace, ignore very short tokens (< 2 chars),
            ignore pure numbers/symbol-only strings.
*/

const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const SRC_DIR = path.join(__dirname, '..', 'src');
const OUT_DIR = path.join(__dirname, '..', 'translations', 'pages_full');
const CATALOG_PATH = path.join(__dirname, '..', 'translations', 'catalog.full.i18n.json');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir)) {
    const fp = path.join(dir, entry);
    const st = fs.statSync(fp);
    if (st.isDirectory()) walk(fp, out);
    else out.push(fp);
  }
  return out;
}

function isHTML(fname) {
  return fname.endsWith('.html');
}

function normalizeText(t) {
  return (t || '').replace(/\s+/g, ' ').trim();
}

function looksLikeIgnorable(t) {
  if (!t) return true;
  if (t.length < 2) return true;
  // Ignore pure numbers or numbers with punctuation only
  if (/^[\d\s.,:;()\-+/]+$/.test(t)) return true;
  // Ignore common boilerplate tokens
  const blacklist = new Set(['©', '™', '|']);
  if (blacklist.has(t)) return true;
  return false;
}

function extractFromHtml(html) {
  const root = parse(html, { script: false, style: false, pre: false });
  const collected = new Set();

  function visit(node) {
    if (!node) return;
    if (node.nodeType === 3 /* TEXT_NODE */) {
      const n = normalizeText(node._rawText || '');
      if (!looksLikeIgnorable(n)) collected.add(n);
      return;
    }
    if (node.attributes) {
      for (const attr of ['alt', 'title', 'placeholder', 'aria-label']) {
        if (node.hasAttribute && node.hasAttribute(attr)) {
          const n = normalizeText(node.getAttribute(attr) || '');
          if (!looksLikeIgnorable(n)) collected.add(n);
        }
      }
    }
    if (node.childNodes && node.childNodes.length) {
      for (const ch of node.childNodes) visit(ch);
    }
  }

  visit(root);
  return Array.from(collected);
}

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function main() {
  ensureDir(OUT_DIR);
  const files = walk(SRC_DIR).filter(isHTML);
  const catalog = { generatedAt: new Date().toISOString(), strings: {} };

  for (const fp of files) {
    const html = fs.readFileSync(fp, 'utf8');
    const strings = extractFromHtml(html).sort((a,b) => a.localeCompare(b));
    const rel = path.relative(SRC_DIR, fp).replace(/\\/g, '/');
    const base = rel.replace(/\//g, '__').replace(/\.html$/, '');
    const outFile = path.join(OUT_DIR, base + '.i18n.json');
    const out = { meta: { source: 'src/' + rel }, strings: {} };
    for (const s of strings) {
      out.strings[s] = '';
      if (!catalog.strings[s]) catalog.strings[s] = { translation: '', occurrences: [] };
      if (catalog.strings[s].occurrences.indexOf('src/' + rel) === -1) {
        catalog.strings[s].occurrences.push('src/' + rel);
      }
    }
    fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
  }

  const sorted = {};
  Object.keys(catalog.strings).sort((a,b) => a.localeCompare(b)).forEach(k => sorted[k] = catalog.strings[k]);
  catalog.strings = sorted;
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2));
  console.log(`Full catalog written with ${Object.keys(sorted).length} strings.`);
}

if (require.main === module) main();

