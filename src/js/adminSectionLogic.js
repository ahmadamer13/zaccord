const addHours = require('./includes/addHours.js');
const EUDateFormat = require('./includes/EUDateFormat.js');
const shipping = require('./includes/shippingConstants.js');
const SHIPPING_OBJ = shipping.shippingObj;

// Simplified Admin Dashboard: lists New and Completed orders
const buildAdminSection = (conn) => {
  return new Promise((resolve, reject) => {
    const q = `
      SELECT o.*, o.price AS aPrice, ud.email AS uemail, o.id AS oid, d.*,
             d.name AS customerName, f.*, pp.name AS packet_name, pp.zipcode AS packet_zip,
             pp.city AS packet_city, pp.packet_id AS packet_point_id
        FROM orders AS o
        LEFT JOIN delivery_data AS d ON (d.uid = o.uid OR d.order_id = o.unique_id)
        LEFT JOIN fix_products AS f ON f.id = o.item_id
        LEFT JOIN users AS ud ON ud.id = d.uid
        LEFT JOIN packet_points AS pp ON o.packet_id = pp.packet_id
       ORDER BY o.status ASC, o.order_time DESC
       LIMIT 100`;

    conn.query(q, [], (err, rows) => {
      if (err) return reject('Failed to load orders');
      if (!rows || rows.length === 0) return resolve('<p class="dash-wrap">No orders yet.</p>');

      const newOrders = rows.filter(r => !r.status);
      const doneOrders = rows.filter(r => !!r.status);

      function getDeliveryTitle(code) {
        for (let k of Object.keys(SHIPPING_OBJ)) {
          if (SHIPPING_OBJ[k]['radioID'] == code) return SHIPPING_OBJ[k]['title'];
        }
        return 'Delivery';
      }
      function total(qty, price) {
        let t = Math.round(qty * price);
        if (t < 800) t = 800; // display rule only
        return t;
      }
      function render(list, startIdx, isDone) {
        let i = startIdx; let out = '';
        for (let r of list) {
          const when = EUDateFormat(addHours(r.order_time, 2));
          const contact = (r.uemail || r.nl_email || '') + (r.mobile ? ` / ${r.mobile}` : '');
          const del = getDeliveryTitle(r.del_type);
          const t = total(r.quantity, r.aPrice);
          const checked = isDone ? 'checked' : '';
          let files = '';
          if (r.cp_fname) {
            files += `<a class="btn" download href="/printUploads/${r.cp_fname}.stl">STL</a>`;
            files += `<a class="btn" download href="/gcode/${r.cp_fname}.gcode">G-code</a>`;
          } else if (r.lit_fname) {
            files += `<a class="btn" download href="/printUploads/lithophanes/${r.lit_fname}">Image</a>`;
          }
          out += `
            <tr id=\"box_${i}\" style=\"${isDone ? 'opacity:0.5' : 'opacity:1'}\">
              <td>#${r.unique_id}</td>
              <td>${when}</td>
              <td>${r.customerName || '-'}</td>
              <td>${contact || '-'}</td>
              <td><span class=\"status-badge ${isDone?'status-done':'status-new'}\">${del}</span></td>
              <td><b id=\"allp_${i}\">${t}</b> JD</td>
              <td class=\"actions\">
                ${files}
                <label class=\"chCont\" style=\"margin-left:6px;\"> 
                  <input type=\"checkbox\" id=\"ch_${i}\" ${checked} value=\"${Number(!isDone)}\" onclick=\"updateStatus(${r.oid}, ${i})\">
                  <span class=\"cbMark\"></span>
                </label>
              </td>
            </tr>`;
          i++;
        }
        return out;
      }

      let html = '';
      html += `<script>var m=document.getElementById('dashMetrics'); if(m){m.innerHTML='` +
        ` <div class=\"metric\">New: <b>${newOrders.length}</b></div>` +
        ` <div class=\"metric\">Completed: <b>${doneOrders.length}</b></div>` +
        ` <div class=\"metric\">Total: <b>${rows.length}</b></div>` +
      `';}</script>`;

      html += `<div class=\"section\"><h2 class=\"mainTitle\" style=\"font-size:20px;margin:8px 0\">New Orders</h2>`;
      html += `<div style=\"overflow-x:auto\"><table class=\"tbl\"><thead><tr>
        <th>ID</th><th>Time</th><th>Customer</th><th>Contact</th><th>Delivery</th><th>Total</th><th>Actions</th>
      </tr></thead><tbody>`;
      html += render(newOrders, 0, false);
      html += `</tbody></table></div></div>`;

      html += `<div class=\"section\"><h2 class=\"mainTitle\" style=\"font-size:20px;margin:8px 0\">Completed Orders</h2>`;
      html += `<div style=\"overflow-x:auto\"><table class=\"tbl\"><thead><tr>
        <th>ID</th><th>Time</th><th>Customer</th><th>Contact</th><th>Delivery</th><th>Total</th><th>Actions</th>
      </tr></thead><tbody>`;
      html += render(doneOrders, 10000, true);
      html += `</tbody></table></div></div>`;

      // Recent prototype requests
      conn.query('SELECT * FROM prototype ORDER BY date DESC LIMIT 20', [], (e2, r2) => {
        if (!e2 && r2 && r2.length) {
          html += `<div class=\"section\"><h2 class=\"mainTitle\" style=\"font-size:20px;margin:8px 0\">Prototype Quotes</h2>`;
          html += `<div style=\"overflow-x:auto\"><table class=\"tbl\"><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Message</th><th>Time</th></tr></thead><tbody>`;
          for (let r of r2) {
            html += `<tr><td>${r.name}</td><td>${r.email}</td><td>${r.mobile || r.tel || ''}</td><td>${r.message}</td><td>${EUDateFormat(addHours(r.date,2))}</td></tr>`;
          }
          html += `</tbody></table></div></div>`;
        }
        resolve(html);
      });
    });
  });
};

module.exports = buildAdminSection;
