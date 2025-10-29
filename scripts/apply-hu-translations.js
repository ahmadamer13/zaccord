#!/usr/bin/env node
/**
 * Apply translated lines from a mapping file to source files.
 * Mapping format per line: "file:line:translated_text"
 * - file: path relative to repo root
 * - line: 1-based line number
 * - translated_text: full replacement content for that line
 */

const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/apply-hu-translations.js [mappingFile]');
  console.log('Default mappingFile: hungarian_candidates.hu.en.txt');
}

const mappingFile = process.argv[2] || 'hungarian_candidates.hu.en.txt';
if (!fs.existsSync(mappingFile)) {
  console.error(`Mapping file not found: ${mappingFile}`);
  usage();
  process.exit(1);
}

/** Read mapping lines */
const lines = fs.readFileSync(mappingFile, 'utf8').split(/\r?\n/);
const perFile = new Map();

const lineRe = /^([^:]+):(\d+):(.*)$/;
let total = 0;
for (const raw of lines) {
  if (!raw || /^\s*$/.test(raw)) continue;
  // Skip headers like "Total output lines: ..." if present
  if (/^Total output lines:/.test(raw)) continue;
  const m = raw.match(lineRe);
  if (!m) {
    // Ignore non-conforming lines silently to be safe
    continue;
  }
  const file = m[1];
  const lineNum = Number(m[2]);
  const text = m[3];
  if (!perFile.has(file)) perFile.set(file, []);
  perFile.get(file).push({ line: lineNum, text });
  total++;
}

let applied = 0;
let skipped = 0;
const report = [];

for (const [file, entries] of perFile.entries()) {
  const abs = path.resolve(file);
  if (!fs.existsSync(abs)) {
    report.push(`${file}: missing (skip ${entries.length})`);
    skipped += entries.length;
    continue;
  }
  const buf = fs.readFileSync(abs);
  // Detect EOL (prefer CRLF if present)
  const content = buf.toString('utf8');
  const hasCRLF = /\r\n/.test(content);
  const EOL = hasCRLF ? '\r\n' : '\n';
  const parts = content.split(/\r?\n/);

  // Sort entries by line asc, and de-duplicate by last one wins
  const byLine = new Map();
  for (const e of entries) byLine.set(e.line, e.text);
  const sorted = Array.from(byLine.entries()).sort((a, b) => a[0] - b[0]);

  let appliedHere = 0;
  let skippedHere = 0;
  for (const [lineNum, text] of sorted) {
    const idx = lineNum - 1;
    if (idx < 0 || idx >= parts.length) {
      skippedHere++;
      continue;
    }
    parts[idx] = text;
    appliedHere++;
  }

  if (appliedHere > 0) {
    fs.writeFileSync(abs, parts.join(EOL), 'utf8');
  }
  applied += appliedHere;
  skipped += skippedHere;
  report.push(`${file}: applied ${appliedHere}, skipped ${skippedHere}`);
}

console.log(`Processed ${perFile.size} files, ${total} mapping lines.`);
console.log(`Applied: ${applied}, Skipped: ${skipped}`);
for (const r of report) console.log(r);

