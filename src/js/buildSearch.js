const produceShowcaseOutput = require('./includes/itemGenerator.js');
const escapeVars = require('./includes/escapeVars.js');

// Search in fixed products
const buildSearch = (conn, searchValue) => {
  return new Promise((resolve, reject) => {
    searchValue = escapeVars(searchValue);
    let output = '';
    let isDefault = false;

    // If search input is empty show most popular products instead
    if (!searchValue) {
      var sQuery = `
        SELECT * FROM fix_products WHERE is_best = 1 ORDER BY priority
      `;
    } else {
      var sQuery = `
        SELECT * FROM fix_products WHERE name LIKE '${searchValue}%' ORDER BY priority
      `;
    }
    conn.query(sQuery, (err, result, field) => {
      if (err) {
        reject('Search error');
        return;
      }

      let searchIds = [];
      for (let i = 0; i < result.length; i++) {
        searchIds.push(result[i].id);
        output += produceShowcaseOutput(result, true, i);
      }

      // If no result so far try to search in "non-strict" mode & description
      if (searchIds.length < 4) {
        let flatIds = searchIds.join("','");
        let nextQuery = `
          SELECT * FROM fix_products WHERE name LIKE '%${searchValue}%' AND id NOT IN (?)
        `;
        
        conn.query(nextQuery, [flatIds], (err, result, fields) => {
          if (err) {
            reject('An unexpected error occurred, please try again');
            return;
          }

          for (let i = 0; i < result.length; i++) {
            if (searchIds.indexOf(result[i].id) > -1) continue;
            searchIds.push(result[i].id);
            output += produceShowcaseOutput(result, true, i);
          }

          if (searchIds.length < 4) {
            // Try description as a last chance
            flatIds = "'" + searchIds.join("','") + "'";
            let dQuery = `
              SELECT * FROM fix_products WHERE description LIKE '%${searchValue}%'
              AND id NOT IN (?) 
            `;
            conn.query(dQuery, [flatIds], (err, result, fields) => {
              if (err) {
                reject('An unexpected error occurred, please try again');
                return;
              }

              for (let i = 0; i < result.length; i++) {
                if (searchIds.indexOf(result[i].id) > -1) continue;
                output += produceShowcaseOutput(result, true, i);
              }                
              
              // If still no result display error msg
              if (!output) {
                output = `
                  <div style="margin: 0 auto;">
                    <img src="/images/icons/nofound.png" class="emptyCart">
                    <p class="dgray font18">Unfortunately we don’t have such a product...</p>
                  </div>
                `;
              }
              
              resolve(output);
            });
          } else {
            resolve(output);
          }
        });
      } else {
        resolve(output);
      }
    });
  });
}

module.exports = buildSearch;
