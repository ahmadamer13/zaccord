#!/usr/bin/env node
/**
 * Sync the `blog` table with the version-controlled seed data.
 *
 * The production database does not change automatically when you push new
 * commits. Blog metadata (title, categories, content_path, etc.) therefore
 * needs to be imported manually whenever you add or edit posts. This script
 * replays only the `INSERT INTO blog` statements from `database1.sql` using
 * MySQL's `REPLACE INTO` so existing rows are updated in-place.
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const mysql = require('mysql');
const connConstants = require('../src/js/includes/connConstants.js');

const dumpPath = path.join(__dirname, '..', 'database1.sql');
if (!fs.existsSync(dumpPath)) {
  console.error('Cannot find database1.sql at', dumpPath);
  process.exit(1);
}

const rawDump = fs.readFileSync(dumpPath, 'utf8');
const insertRegex = /INSERT INTO `blog`[\s\S]*?;\s*/g;
const insertBlocks = rawDump.match(insertRegex) || [];

if (!insertBlocks.length) {
  console.error('No blog seed statements found inside database1.sql');
  process.exit(1);
}

const pool = mysql.createPool({
  connectionLimit: 2,
  host: connConstants.host,
  user: connConstants.user,
  password: connConstants.password,
  database: connConstants.database,
  dateStrings: connConstants.dateStrings,
  multipleStatements: false
});

const query = util.promisify(pool.query).bind(pool);

(async () => {
  let executed = 0;
  for (const block of insertBlocks) {
    const statement = block.replace(/INSERT INTO/i, 'REPLACE INTO');
    await query(statement);
    executed += 1;
  }
  console.log(`Synced blog table using ${executed} seed statement(s).`);
})()
  .catch(err => {
    console.error('Failed to sync blog table:', err);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
