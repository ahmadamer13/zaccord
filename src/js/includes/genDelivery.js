// Generate a form for delivery information from db
function genDelivery(conn, userID, isLoggedIn = true) {
  return new Promise((resolve, reject) => {
    let dQuery = `
      SELECT * FROM delivery_data WHERE uid = ? LIMIT 1
    `;
    conn.query(dQuery, [userID], (err, result, field) => {
      if (err) {
        reject('An unexpected error occurred, please try again');
        return;
      }

      if (result.length > 0) {
        // If there is value in db use that as value; otherwise nothing
        var name = !result[0].name ? '' : result[0].name;
        var postalCode = !result[0].postal_code ? '' : result[0].postal_code;
        var city = !result[0].city ? '' : result[0].city;
        var address = !result[0].address ? '' : result[0].address;
        var mobile = !result[0].mobile ? '' : result[0].mobile;
      } else {
        var name, postalCode, city, address, mobile;
        name = postalCode = city = address = mobile = '';
      }

      let output = `
        <div class="flexDiv" style="flex-wrap: wrap; justify-content: space-evenly;" id="normalDiv">
          <input type="text" class="dFormField" id="name" placeholder="Name"
            value="${name}">
          <input type="text" class="dFormField" id="city" placeholder="City"
            value="${city}">
          <input type="text" class="dFormField" id="address"
            placeholder="Address (house no., floor, door)" value="${address}">
          <input type="text" class="dFormField" id="mobile" placeholder="Phone number"
            value="${mobile}">
          ${!isLoggedIn ? `<input type="text" class="dFormField" id="nlEmail"
            placeholder="Email">` : ''}
        </div>
      `
      resolve(output);
    });
  });
}

module.exports = genDelivery;
