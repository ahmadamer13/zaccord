const sendEmail = require('./includes/sendEmail.js');
const randomstring = require("randomstring");
const bcrypt = require('bcrypt');

// If user's forgotten their password validate email & send them a tmp pass
const forgotPassword = (conn, email) => {
  return new Promise((resolve, reject) => {
    // Make sure email is already in system 
    let cQuery = 'SELECT id FROM users WHERE email = ? LIMIT 1';

    conn.query(cQuery, [email], function (err, result, fields) {
      if (err) {
        reject('An unexpected error occurred, please try again');
        return;
      } else if (result.length === 0) {
        reject('No such email address in the system');
        return;
      }

      // Email is in the system, send tmp password
      // Generate 6 char random string as a tmp password
      let tmpPass = randomstring.generate(6);
      const saltRounds = 10;
      const hash = bcrypt.hashSync(tmpPass, saltRounds);

      let iQuery = 'UPDATE users SET temp_password = ? WHERE email = ? LIMIT 1';
      conn.query(iQuery, [hash, email], (err, result, field) => {
        if (err) {
          reject('An unexpected error occurred, please try again');
          return;
        }

        // Now send email
        let subject = 'Temporary password request';
        let emailContent = `
          <p style="font-size: 22px;">Ideiglenes jelszó igénylés</p>
          <p>
            A jelszavad sikeresen megváltozott!<br>
            Az alábbi ideiglenes jelszóval tudsz belépni a fiókodba:
            <b>${tmpPass}</b><br>
            Erősen ajánljuk, hogy belépés után változtatsd meg az ideiglenes jelszót!
          </p>
        `;

        sendEmail('info@jordan3dprint.store', emailContent, email, subject);
        resolve('success');
      });
    });
  });
}

module.exports = forgotPassword;
