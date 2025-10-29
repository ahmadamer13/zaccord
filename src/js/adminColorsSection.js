// Build an admin section for managing color stock availability
const adminColorsSection = (conn) => {
  return new Promise((resolve, reject) => {
    const q = 'SELECT material, color, in_stock FROM colors ORDER BY material, color';
    conn.query(q, [], (err, rows) => {
      if (err) return reject('Failed to load colors');
      if (!rows || !rows.length) return resolve('<p class="dash-wrap">No colors found.</p>');

      let html = '';
      html += `<div class="section"><h2 class="mainTitle" style="font-size:20px;margin:8px 0">Colors — Availability</h2>`;
      html += `<div class="actions" style="margin:8px 0">
        <button class="btn fill" onclick="saveAllColors()">Save All Changes</button>
      </div>`;
      html += `<div style="overflow-x:auto"><table class="tbl"><thead><tr>
        <th>Material</th><th>Color</th><th>In stock?</th>
      </tr></thead><tbody>`;
      for (const r of rows) {
        const checked = Number(r.in_stock) ? 'checked' : '';
        const mid = encodeURIComponent(r.material);
        const cid = encodeURIComponent(r.color);
        html += `<tr data-material="${r.material}" data-color="${r.color}">
          <td>${r.material}</td>
          <td>${r.color}</td>
          <td>
            <label class="chCont">
              <input type="checkbox" ${checked} onchange="updateColorStock('${mid}','${cid}', this.checked ? 1 : 0)">
              <span class="cbMark"></span>
            </label>
            <button class="btn" style="margin-left:8px" onclick="saveColor('${mid}','${cid}')">Save</button>
          </td>
        </tr>`;
      }
      html += `</tbody></table></div></div>`;

      // Inline helper script to call backend
      html += `<script>
        function updateColorStock(material, color, inStock) {
          fetch('/admin/updateColorStock', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ material: decodeURIComponent(material), color: decodeURIComponent(color), in_stock: Number(inStock) })
          }).then(r => r.json()).then(j => {
            if (!j || j.status !== 'success') {
              alert('Failed to update.');
            }
          }).catch(() => alert('Network error'));
        }
        function saveColor(material, color) {
          var mat = decodeURIComponent(material);
          var col = decodeURIComponent(color);
          var sel = 'tr[data-material="' + mat + '"][data-color="' + col + '"]';
          var row = document.querySelector(sel);
          if (!row) return;
          var cb = row.querySelector('input[type="checkbox"]');
          updateColorStock(material, color, cb && cb.checked ? 1 : 0);
        }
        function saveAllColors() {
          const rows = document.querySelectorAll('tbody tr[data-material]');
          let ops = [];
          rows.forEach(row => {
            const material = row.getAttribute('data-material');
            const color = row.getAttribute('data-color');
            const cb = row.querySelector('input[type="checkbox"]');
            const inStock = cb && cb.checked ? 1 : 0;
            ops.push(fetch('/admin/updateColorStock', {
              method: 'POST', headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ material, color, in_stock: inStock })
            }));
          });
          Promise.allSettled(ops).then(results => {
            const ok = results.filter(r => r.status === 'fulfilled').length;
            alert('Saved ' + ok + ' changes');
          }).catch(() => alert('Network error'));
        }
      </script>`;

      resolve(html);
    });
  });
}

module.exports = adminColorsSection;
