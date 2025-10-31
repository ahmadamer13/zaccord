const bcrypt = require('bcrypt');
const sendEmail = require('./includes/sendEmail.js');

// Handle user registration; push data to db
const userRegister = (conn, formData, req) => {
  return new Promise((resolve, reject) => {
    // Gather data
    let email = formData.email;
    let password = formData.pass;
    let userAgent = String(req.headers['user-agent'] || '').slice(0, 250);
    let ipHeader = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
    let ip = Array.isArray(ipHeader) ? ipHeader[0] : String(ipHeader);
    if (ip.includes(',')) ip = ip.split(',')[0].trim();
    ip = ip.slice(0, 250);

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

      conn.query('SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM users', [], (err, result) => {
        if (err) {
          console.log(err);
          reject('An unexpected error occurred, please try again');
          return;
        }

        let nextId = 1;
        if (result && result[0] && Number(result[0].nextId)) {
          nextId = Number(result[0].nextId);
        }

        // Insert data to db. Providing the id explicitly avoids relying on AUTO_INCREMENT.
        let sQuery = `
          INSERT INTO users (id, email, password, user_agent, ip_addr, register_time)
          VALUES (?, ?, ?, ?, ?, NOW())
        `;

        conn.query(sQuery, [nextId, email, hash, userAgent, ip], function (err, result, fields) {
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
            let dIdQuery = 'SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM delivery_data';
            conn.query(dIdQuery, [], (err, idResult) => {
              if (err) {
                console.log(err);
                reject('An unexpected error occurred, please try again');
                return;
              }

              let deliveryId = 1;
              if (idResult && idResult[0] && Number(idResult[0].nextId)) {
                deliveryId = Number(idResult[0].nextId);
              }

              let iQuery = 'INSERT INTO delivery_data (id, uid, date) VALUES (?, ?, NOW())';
              conn.query(iQuery, [deliveryId, userID], (err, result, field) => {
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
    });
  });
}

module.exports = userRegister;
