const sendOpinion = (conn, opinion) => {
  return new Promise((resolve, reject) => {
    // Push user-submitted opinion to db
    // First make sure the message is below 1001 characters & is not empty
    if (opinion.replace(/(\r|\s)/g, '').length < 1) {
      reject('Your opinion is empty');
      return;
    } else if (opinion.replace(/(\r|\s)/g, '').length > 1000) {
      reject('Your opinion exceeded 1,000 characters');
      return;
    } else {
      let iQuery = 'INSERT INTO feedback (opinion, date) VALUES (?, ?)';
      let commonDate = new Date().toMysqlFormat();
      conn.query(iQuery, [opinion, commonDate], (e, res, f) => {
        if (e) {
          reject('An unexpected error occurred, please try again');
          return;
        }

        resolve('success')
      });
    }
  });
};

module.exports = sendOpinion;
