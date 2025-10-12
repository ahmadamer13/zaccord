const userExists = require('./includes/userExists.js');
const bcrypt = require('bcrypt');
const sendEmail = require('./includes/sendEmail.js');

// Validate user & on successful validation change their password in db
const chPassword = (conn, userID, formData) => {
  return new Promise((resolve, reject) => {
    // Make sure user exists in db
    userExists(conn, userID).then(data => {
      // Make sure the current password has been entered correctly
      let cpass = formData.cpass;
      let npass = formData.npass;
      let rpass = formData.rpass;

      // Get current hashed password form db
      conn.query('SELECT password, temp_password FROM users WHERE id = ? LIMIT 1', [userID],
      function (err, result, fields) {
        if (err) {
          reject('An unexpected error occurred, please try again');
          throw err;
        }
        
        if (result.length < 1) {
          reject('No such user');
          return;
        }

        // Make sure password (or temp password) is correct
        let hashedPass = result[0].password;
        let tmpPass = result[0].temp_password ? result[0].temp_password : '';
        if (!bcrypt.compareSync(cpass, hashedPass) && !bcrypt.compareSync(cpass, tmpPass)) {
          reject('Incorrect current password');
          return;
        }

        // Current password is valid; now check new password
        if (npass.length < 6 || rpass != npass) {
          reject('Invalid new password');
          return;
        }

        // Now update password in db & delete potential tmp password
        // First hash password
        const saltRounds = 10;
        const hash = bcrypt.hashSync(npass, saltRounds);
       
        let uQuery = 'UPDATE users SET password = ?, temp_password = ? WHERE id = ? LIMIT 1';
        conn.query(uQuery, [hash, '', userID],
        (err, result, field) => {
          if (err) {
            reject('An unexpected error occurred, please try again');
            return;
          }

          let eQuery = 'SELECT email FROM users WHERE id = ? LIMIT 1';
          conn.query(eQuery, [userID], (err, result, field) => {
            // On successful ordering, send customer a notification email
            let email = result[0].email;
            let emailContent = `
              <p style="font-size: 22px;">Password change successful!</p>
              <p>
                We confirm that you successfully changed your account password.<br>
                You can now log in with the new password.
              </p>
            `;
            let subject = 'Password change successful!';
            sendEmail('info@jordan3dprint.store', emailContent, email, subject);
            
            // Successful change
            resolve('password changed');
          });
        });
      });
    }).catch(err => {
      // User does not exist in db
      reject('No such user');
    });
  });
}

module.exports = chPassword;
