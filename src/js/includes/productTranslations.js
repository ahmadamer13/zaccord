const fs = require('fs');
const path = require('path');

// Load English translations for fixed products by id from product_texts.en.json
let PROD_TX = {};
try {
  const root = path.join(__dirname, '..', '..', '..');
  const p = path.join(root, 'product_texts.en.json');
  const raw = fs.readFileSync(p, 'utf8');
  const list = JSON.parse(raw);
  const map = {};
  for (const it of list) {
    if (it && typeof it.id === 'number') map[it.id] = it;
  }
  PROD_TX = map;
} catch (e) {
  // If file missing or invalid, keep empty map and proceed silently
  PROD_TX = {};
}

function translateRow(row) {
  if (!row || typeof row.id !== 'number') return row;
  const t = PROD_TX[row.id];
  if (!t) return row;
  // Apply selected fields if present in translation
  const out = Object.assign({}, row);
  if (t.name) out.name = t.name;
  if (t.description) out.description = t.description;
  if (t.size) out.size = t.size;
  if (t.category) out.category = t.category;
  if (typeof t.price === 'number') out.price = t.price;
  if (t.img_url) out.img_url = t.img_url;
  if (t.img_showcase) out.img_showcase = t.img_showcase;
  if (t.stl_path) out.stl_path = t.stl_path;
  return out;
}

function translateRows(rows) {
  if (!Array.isArray(rows)) return rows;
  return rows.map(r => translateRow(r));
}

module.exports = {
  translateRow,
  translateRows
};

