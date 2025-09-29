const mysql = require('mysql');
const connContsts = require('./includes/connConstants.js');
const HOST = connContsts.host;
const USER = connContsts.user;
const PASSWORD = connContsts.password;
const DATABASE = connContsts.database;
const DATE_STRINGS = connContsts.dateStrings;

// Use a pool to avoid fatal connection errors and allow concurrent queries
const pool = mysql.createPool({
  connectionLimit: 10,
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  dateStrings: DATE_STRINGS
});

module.exports = pool;
