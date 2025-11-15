#!/usr/bin/env node
/*
  Extract non‑English text content from HTML files in src/ and create per‑page JSON files
  under translations/pages/. This helps building translation tables per page.

  Heuristics:
  - Collect visible text nodes (ignores script/style).
  - Also collect common text-bearing attributes: alt, title, placeholder, aria-label.
  - Filter strings containing non-ASCII characters (covers Arabic, Hungarian accents, etc.).
  - Deduplicate and sort for stable diffs.
*/

const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const SRC_DIR = path.join(__dirname, '..', 'src');
const OUT_DIR = path.join(__dirname, '..', 'translations', 'pages');

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
  // Collapse whitespace and trim
  return t.replace(/\s+/g, ' ').trim();
}

function isNonEnglish(t) {
  // Non-ASCII catches Arabic and most accented characters (Hungarian, etc.)
  return /[^\x00-\x7F]/.test(t);
}

function extractFromHtml(html) {
  const root = parse(html, { script: false, style: false, pre: false });
  const collected = new Set();

  function visit(node) {
    if (!node) return;
    // Text nodes
    if (node.nodeType === 3 /* TEXT_NODE */) {
      const n = normalizeText(node._rawText || '');
      if (n && n.length > 1 && isNonEnglish(n)) collected.add(n);
      return;
    }
    // Element nodes: check common attributes that hold user-facing text
    if (node.attributes) {
      for (const attr of ['alt', 'title', 'placeholder', 'aria-label']) {
        if (node.hasAttribute && node.hasAttribute(attr)) {
          const n = normalizeText(node.getAttribute(attr) || '');
          if (n && n.length > 1 && isNonEnglish(n)) collected.add(n);
        }
      }
    }
    // Recurse children
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
  const index = {};
  let pagesWithStrings = 0;
  for (const fp of files) {
    const html = fs.readFileSync(fp, 'utf8');
    const strings = extractFromHtml(html).sort((a,b) => a.localeCompare(b));
    const rel = path.relative(SRC_DIR, fp).replace(/\\/g, '/');
    const base = rel.replace(/\//g, '__').replace(/\.html$/, '');
    const outFile = path.join(OUT_DIR, base + '.i18n.json');
    index[rel] = path.relative(path.join(__dirname, '..'), outFile).replace(/\\/g, '/');
    if (strings.length === 0) {
      // Write a minimal stub so translators know page checked
      fs.writeFileSync(outFile, JSON.stringify({ meta: { source: 'src/' + rel }, strings: {} }, null, 2));
      continue;
    }
    const out = { meta: { source: 'src/' + rel }, strings: {} };
    for (const s of strings) out.strings[s] = '';
    fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
    pagesWithStrings++;
  }
  const indexPath = path.join(__dirname, '..', 'translations', 'index.json');
  fs.writeFileSync(indexPath, JSON.stringify({ generatedAt: new Date().toISOString(), pages: index }, null, 2));
  console.log(`Extracted non-English strings for ${pagesWithStrings} page(s). Output folder: ${OUT_DIR}`);
}

if (require.main === module) {
  main();
}

