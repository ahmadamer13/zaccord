const produceShowcaseOutput = require('./includes/itemGenerator.js');
const { translateRows } = require('./includes/productTranslations.js');

// Display all items a certain category
const buildCategory = (conn, category, opts = {}) => {
  return new Promise((resolve, reject) => {
    let output = '';

    /*
      Tackle 3 cases:
        - category is an ordinary category in db
- category is 'Legnépszerűbb' which is marked as is_best in db
- catgegory is 'All' when we list all products from every category
    */

    let sQuery;
    if (category == 'Most Popular') {
      sQuery = `SELECT * FROM fix_products WHERE is_best = 1 ORDER BY priority ASC`;
    } else if (category == 'All') {
      sQuery = `SELECT * FROM fix_products ORDER BY priority ASC`;
    } else {
      sQuery = `SELECT * FROM fix_products WHERE category = '${category}' ORDER BY
        priority ASC`;
    }

    conn.query(sQuery, (err, result, field) => {
      if (err) {
        reject('An unexpected error occurred, please try again');
        return;
      }

      // Build the output
      const rows = translateRows(result);
      const limit = typeof opts.limit === 'number' ? Math.min(opts.limit, rows.length) : rows.length;
      for (let i = 0; i < limit; i++) {
        output += produceShowcaseOutput(rows, true, i, false, true, typeof opts.priceOverride === 'number' ? opts.priceOverride : null);
      }

      resolve(output);
    });
  });
}

module.exports = buildCategory;
