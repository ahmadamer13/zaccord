const util = require('util');
const connConstants = require('./connConstants.js');

async function ensureAutoIncrement(conn) {
  if (!conn) return;
  const query = util.promisify(conn.query).bind(conn);
  const checks = [
    {
      table: 'orders',
      column: 'id',
      alter: 'ALTER TABLE orders MODIFY id INT(11) NOT NULL AUTO_INCREMENT'
    },
    {
      table: 'delivery_data',
      column: 'id',
      alter: 'ALTER TABLE delivery_data MODIFY id INT(11) NOT NULL AUTO_INCREMENT'
    }
  ];

  for (const { table, column, alter } of checks) {
    try {
      const rows = await query(
        `SELECT EXTRA FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ? LIMIT 1`,
        [connConstants.database, table, column]
      );
      const extra = rows && rows[0] && (rows[0].EXTRA || rows[0].extra || '');
      if (!/auto_increment/i.test(extra)) {
        await query(alter);
      }
    } catch (err) {
      console.log('Schema check failed for', table, column, err.message || err);
    }
  }
}

module.exports = ensureAutoIncrement;
