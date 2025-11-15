const fs = require('fs');
const path = require('path');
const conn = require('../src/js/connectDb.js');

const QUERY = `
  SELECT id, name, description, size, category, price, img_url, img_showcase
  FROM fix_products
  ORDER BY priority ASC, id ASC
`;

const outputPath = path.join(__dirname, '..', 'product_texts.json');

conn.query(QUERY, (err, results) => {
  if (err) {
    console.error('Failed to fetch products from DB:', err.message);
    process.exitCode = 1;
    conn.end();
    return;
  }

  const payload = results.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    size: row.size,
    category: row.category,
    price: row.price,
    img_url: row.img_url,
    img_showcase: row.img_showcase
  }));

  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));
  console.log('Product texts exported to', outputPath);
  conn.end();
});
