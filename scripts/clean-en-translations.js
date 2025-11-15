#!/usr/bin/env node
/*
  Normalize product_texts.en.json by removing residual Hungarian boilerplate and
  non-ASCII fragments in name/description. Keeps structure intact.
*/
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'product_texts.en.json');

function stripHuBoilerplate(html) {
  if (!html) return html;
  let s = html;
  // Hungarian license / view / modify
  s = s.replace(/A term[é|e]k szabad <a [^>]+>licensszel<\/a>[\s\S]*?m[óo]dos[ií]thatod\.?/gi, '');
  s = s.replace(/van forgalomban, [\s\S]*?m[óo]dos[ií]thatod\.?/gi, '');
  // Hungarian print-on-demand line
  s = s.replace(/Abban az esetben, [\s\S]*?<a [^>]+>b[é|e]rnyomtat[áa]s<\/a> funkci[óo]t\.?/gi, '');
  // Hungarian author/rights line
  s = s.replace(/A term[é|e]ket <a [^>]+>[^<]+<\/a>[\s\S]*?(Minden jog fenntartva\.)/gi, '');
  // Mixed language leftovers in some entries
  s = s.replace(/A term[é|e]ken.*?(<br>|$)/gi, '');
  // Remove duplicate excessive breaks
  s = s.replace(/(\s*<br>\s*){3,}/gi, '<br><br>');
  return s;
}

function hasNonASCII(t) {
  return /[^\x00-\x7F]/.test(t || '');
}

function removeNonAsciiSentences(html) {
  if (!html) return html;
  // Split by sentence-ish delimiters, drop those with non-ASCII
  const parts = html.split(/(?<=[\.!?])\s+/);
  const kept = parts.filter(p => !hasNonASCII(p));
  const out = kept.join(' ');
  return out.trim() ? out : html; // fallback to original if we stripped everything
}

function main() {
  const list = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  let changed = 0, stillNonAscii = 0;
  for (const it of list) {
    // Name: if contains non-ASCII, leave as-is (might be brand), optional sanitize could be added.
    // Description: clean boilerplate then drop HU sentences if any left.
    let desc = it.description || '';
    const before = desc;
    desc = stripHuBoilerplate(desc);
    if (hasNonASCII(desc)) {
      const after = removeNonAsciiSentences(desc);
      if (after !== desc) desc = after;
    }
    if (desc !== before) {
      it.description = desc;
      changed++;
    }
    if (hasNonASCII(it.description)) stillNonAscii++;
  }
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
  console.log(`Updated ${changed} descriptions. ${stillNonAscii} item(s) still contain non-ASCII.`);
}

if (require.main === module) main();

