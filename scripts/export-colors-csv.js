#!/usr/bin/env node
// Export distinct colors from DB to CSV with English translation.
const fs = require('fs');
const path = require('path');
const conn = require('../src/js/connectDb.js');
const translateColor = require('../src/js/includes/translateColor.js');

const OUT = path.join(process.cwd(), 'colors_translations.csv');

conn.query('SELECT DISTINCT material, color FROM colors ORDER BY material, color', [], (err, rows) => {
  if (err) { console.error('DB error:', err.message); process.exit(1); }
  const header = 'material,color,english\n';
  let csv = header;
  for (const r of rows) {
    const material = (r.material || '').replace(/\r?\n/g, ' ').trim();
    const color = (r.color || '').replace(/\r?\n/g, ' ').trim();
    const english = translateColor(color).replace(/\r?\n/g, ' ').trim();
    // Escape commas/quotes
    const esc = v => '"' + String(v).replace(/"/g, '""') + '"';
    csv += [esc(material), esc(color), esc(english)].join(',') + '\n';
  }
  fs.writeFileSync(OUT, csv, 'utf8');
  console.log('Wrote', rows.length, 'rows to', OUT);
  process.exit(0);
});

