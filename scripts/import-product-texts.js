const fs = require('fs');
const path = require('path');
const conn = require('../src/js/connectDb.js');

const inputPath = path.join(__dirname, '..', 'product_texts.en.json');

function run() {
  let items;
  try {
    const raw = fs.readFileSync(inputPath, 'utf8');
    items = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read or parse', inputPath, e.message);
    process.exitCode = 1;
    return;
  }

  const sql = 'UPDATE fix_products SET name = ?, description = ?, category = ? WHERE id = ? LIMIT 1';

  let ok = 0, fail = 0;
  let pending = items.length;
  if (pending === 0) {
    console.log('No items to import.');
    conn.end();
    return;
  }

  items.forEach((it) => {
    const params = [it.name, it.description, it.category, it.id];
    conn.query(sql, params, (err, res) => {
      if (err) {
        fail++;
        console.error(`Failed to update id=${it.id}:`, err.message);
      } else {
        ok++;
      }
      if (--pending === 0) {
        console.log(`Import finished. Updated=${ok}, Failed=${fail}`);
        conn.end();
      }
    });
  });
}

run();

