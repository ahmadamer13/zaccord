// Checks if an item with a given ID exists in db
const itemExists = (conn, itemID, isCP = false) => {
  return new Promise((resolve, reject) => {
    let iQuery = 'SELECT * FROM fix_products WHERE id = ? LIMIT 1';
    conn.query(iQuery, [itemID], (err, result, field) => {
      if (isCP) {
        resolve('success');
      } else if (err) {
        reject('No such product');
        return;
      } else if (result.length < 1) {
        reject('No such product');
        return;
      }

      resolve(result);
    });
  });
}

module.exports = itemExists;
