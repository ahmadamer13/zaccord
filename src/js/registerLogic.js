const bcrypt = require('bcrypt');

// Handle user registration; push data to db
const userRegister = async (conn, formData, req) => {
  // Small promisified query helper
  const q = (sql, params = []) => new Promise((resolve, reject) => {
    conn.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  try {
    // Gather data
    const email = formData.email;
    const password = formData.pass;
    const userAgent = String(req.headers['user-agent'] || '').slice(0, 250);
    const ipHeader = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
    let ip = Array.isArray(ipHeader) ? ipHeader[0] : String(ipHeader);
    if (ip.includes(',')) ip = ip.split(',')[0].trim();
    ip = ip.slice(0, 250);

    // Secure password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    // Ensure email not already used
    const existing = await q('SELECT id FROM users WHERE email = ?', [email]);
    if (existing && existing.length > 0) {
      throw 'This email address is already in use';
    }

    // Compute next user id (project prefers explicit ids)
    const idRow = await q('SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM users');
    let nextId = 1;
    if (idRow && idRow[0] && Number(idRow[0].nextId)) nextId = Number(idRow[0].nextId);

    // Insert user
    const insertUserSQL = `
      INSERT INTO users (id, email, password, user_agent, ip_addr, register_time)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;
    await q(insertUserSQL, [nextId, email, hash, userAgent, ip]);

    // Create delivery_data row for this user (AUTO_INCREMENT id)
    await q('INSERT INTO delivery_data (uid, date) VALUES (?, NOW())', [nextId]);

    return nextId;
  } catch (e) {
    if (typeof e === 'string') throw e; // pass through friendly message
    console.log(e);
    throw 'An unexpected error occurred, please try again';
  }
}

module.exports = userRegister;
