const bcrypt = require('bcrypt');
const sendEmail = require('./includes/sendEmail.js');

// Handle user registration; push data to db
const userRegister = (conn, formData, req) => {
  return new Promise((resolve, reject) => {
    // Gather data
    let email = formData.email;
    let password = formData.pass;
    let userAgent = req.headers['user-agent'];
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Secure password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    // Make sure email is not already in the system
    conn.query('SELECT id FROM users WHERE email = ?', [email], (err, result, fields) => {
      if (err) {
        console.log(err);
        reject('An unexpected error occurred, please try again');
        return;
      }
      if (result && result.length > 0) {
        reject('This email address is already in use');
        return;
      }

      // Insert data to db
      let sQuery = `
        INSERT INTO users (email, password, user_agent, ip_addr, register_time)
        VALUES (?, ?, ?, ?, NOW())
      `;

      conn.query(sQuery, [email, hash, userAgent, ip], function (err, result, fields) {
        if (err) {
          console.log(err);
          reject('An unexpected error occurred, please try again');
          return;
        }

        // TODO do img source when deployed to server & email
        // On successful registration send a welcome email to user
        let emailContent = `
          <p style="font-size: 22px;">Welcome to Jordan3DPrint!</p>
          <p style="line-height: 1.4;">
            You are receiving this email because you recently registered on Jordan3DPrint.
            Jordan3DPrint is a service where customers can purchase 3D printed
            items or submit their existing designs and we will
            print them for you.
            Our mission is to bring every idea to life and popularize 3D‑printed
            products.
          </p>
        `;
        let subject = 'Welcome to Jordan3DPrint!';

        // Fire-and-forget email; do not block or crash registration on email errors
        Promise.resolve(
          sendEmail('info@jordan3dprint.store', emailContent, email, subject)
        ).catch(e => {
          console.log('Registration email failed (non-fatal):', e);
        });

        // Insert user to delivery_data table
        let sQuery = 'SELECT id FROM users WHERE email = ? LIMIT 1';
        conn.query(sQuery, [email], (err, result, field) => {
          if (err) {
            console.log(err);
            reject('An unexpected error occurred, please try again');
            return;
          }
          if (!result || result.length === 0) {
            reject('An unexpected error occurred, please try again');
            return;
          }
          let userID = result[0].id;
          let iQuery = 'INSERT INTO delivery_data (uid, date) VALUES (?, NOW())';
          conn.query(iQuery, [userID], (err, result, field) => {
            if (err) {
              console.log(err);
              reject('An unexpected error occurred, please try again');
              return;
            }

            // Success
            resolve(userID);
          });
        });
      });
    });
  });
}

module.exports = userRegister;
