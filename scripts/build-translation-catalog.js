#!/usr/bin/env node
/*
  Merge per-page i18n JSON files under translations/pages into a single catalog:
  translations/catalog.i18n.json
  Structure:
  {
    "generatedAt": ISOString,
    "strings": {
      "Source text": { "translation": "", "occurrences": ["src/page.html", ...] }
    }
  }
*/

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '..', 'translations', 'pages');
const OUT = path.join(__dirname, '..', 'translations', 'catalog.i18n.json');

function list(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.i18n.json'));
}

function main() {
  const files = list(PAGES_DIR);
  const catalog = { generatedAt: new Date().toISOString(), strings: {} };

  for (const fname of files) {
    const p = path.join(PAGES_DIR, fname);
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    const source = (data.meta && data.meta.source) ? data.meta.source : fname;
    const strings = data.strings || {};
    for (const k of Object.keys(strings)) {
      if (!k || k.trim().length === 0) continue;
      if (!catalog.strings[k]) {
        catalog.strings[k] = { translation: '', occurrences: [] };
      }
      if (catalog.strings[k].occurrences.indexOf(source) === -1) {
        catalog.strings[k].occurrences.push(source);
      }
    }
  }

  // Sort keys for stable diffs
  const sorted = {};
  Object.keys(catalog.strings).sort((a,b) => a.localeCompare(b)).forEach(k => sorted[k] = catalog.strings[k]);
  catalog.strings = sorted;

  fs.writeFileSync(OUT, JSON.stringify(catalog, null, 2));
  console.log(`Wrote ${Object.keys(sorted).length} strings to ${OUT}`);
}

if (require.main === module) main();

