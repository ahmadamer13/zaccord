// Build an admin section for managing colors (CRUD)
const adminColorsSection = (conn) => {
  return new Promise((resolve, reject) => {
    const q = 'SELECT * FROM colors ORDER BY material, color';
    conn.query(q, [], (err, rows) => {
      if (err) return reject('Failed to load colors');

      let html = '';
      html += `<div class="section"><h2 class="mainTitle" style="font-size:20px;margin:8px 0">Manage Colors</h2>`;

      // Add New Color Button
      html += `<div class="actions" style="margin:8px 0">
        <button class="btn fill" onclick="openModal('add')">Add New Color</button>
      </div>`;

      if (!rows || !rows.length) {
        html += '<p class="dash-wrap">No colors found.</p>';
      } else {
        html += `<div style="overflow-x:auto"><table class="tbl"><thead><tr>
          <th>ID</th><th>Material</th><th>Color</th><th>Hex</th><th>In Stock</th><th>Actions</th>
        </tr></thead><tbody>`;

        for (const r of rows) {
          const checked = Number(r.in_stock) ? 'checked' : '';
          // Escape strings for safety
          const safeMat = r.material.replace(/'/g, "&apos;");
          const safeCol = r.color.replace(/'/g, "&apos;");
          const safeHex = r.hex_color.replace(/'/g, "&apos;");
          const safeImg = (r.images || '').replace(/'/g, "&apos;");
          const safeInfo = (r.info || '').replace(/'/g, "&apos;");

          html += `<tr>
            <td>${r.id}</td>
            <td>${r.material}</td>
            <td>${r.color}</td>
            <td><div style="width:20px;height:20px;background:#${r.hex_color};border:1px solid #ccc;display:inline-block;vertical-align:middle;margin-right:5px"></div> ${r.hex_color}</td>
            <td>
              <label class="chCont">
                <input type="checkbox" ${checked} onchange="updateStock(${r.id}, this.checked)">
                <span class="cbMark"></span>
              </label>
            </td>
            <td>
              <button class="btn" onclick="openModal('edit', {id:${r.id}, material:'${safeMat}', color:'${safeCol}', hex:'${safeHex}', images:'${safeImg}', info:'${safeInfo}'})">Edit</button>
              <button class="btn" style="background:#dc3545;color:#fff" onclick="deleteColor(${r.id})">Delete</button>
            </td>
          </tr>`;
        }
        html += `</tbody></table></div>`;
      }
      html += `</div>`;

      // Modal for Add/Edit
      html += `
      <div id="colorModal" class="modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;">
        <div class="modal-content" style="background:#fff;margin:10% auto;padding:20px;width:90%;max-width:500px;border-radius:8px;position:relative;">
          <span class="close" onclick="closeModal()" style="position:absolute;top:10px;right:15px;font-size:24px;cursor:pointer;">&times;</span>
          <h2 id="modalTitle">Add Color</h2>
          <form id="colorForm" onsubmit="handleFormSubmit(event)">
            <input type="hidden" id="colorId" name="id">
            <div class="form-group" style="margin-bottom:15px">
              <label style="display:block;margin-bottom:5px">Material</label>
              <input type="text" id="material" name="material" required style="width:100%;padding:8px;box-sizing:border-box;">
            </div>
            <div class="form-group" style="margin-bottom:15px">
              <label style="display:block;margin-bottom:5px">Color Name</label>
              <input type="text" id="colorName" name="color" required style="width:100%;padding:8px;box-sizing:border-box;">
            </div>
            <div class="form-group" style="margin-bottom:15px">
              <label style="display:block;margin-bottom:5px">Hex Code (without #)</label>
              <input type="text" id="hexColor" name="hex_color" required style="width:100%;padding:8px;box-sizing:border-box;">
            </div>
            <div class="form-group" style="margin-bottom:15px">
              <label style="display:block;margin-bottom:5px">Images (comma separated filenames)</label>
              <input type="text" id="images" name="images" style="width:100%;padding:8px;box-sizing:border-box;">
            </div>
            <div class="form-group" style="margin-bottom:15px">
              <label style="display:block;margin-bottom:5px">Info / Description</label>
              <input type="text" id="info" name="info" style="width:100%;padding:8px;box-sizing:border-box;">
            </div>
            <button type="submit" class="btn fill" style="width:100%">Save</button>
          </form>
        </div>
      </div>
      `;

      // Scripts
      html += `<script>
        function openModal(mode, data) {
          document.getElementById('colorModal').style.display = 'block';
          if (mode === 'edit') {
            document.getElementById('modalTitle').innerText = 'Edit Color';
            document.getElementById('colorId').value = data.id;
            document.getElementById('material').value = data.material;
            document.getElementById('colorName').value = data.color;
            document.getElementById('hexColor').value = data.hex;
            document.getElementById('images').value = data.images;
            document.getElementById('info').value = data.info;
          } else {
            document.getElementById('modalTitle').innerText = 'Add Color';
            document.getElementById('colorForm').reset();
            document.getElementById('colorId').value = '';
          }
        }

        function closeModal() {
          document.getElementById('colorModal').style.display = 'none';
        }

        function updateStock(id, inStock) {
          fetch('/admin/updateColorStock', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: id, in_stock: inStock ? 1 : 0 })
          }).then(r => r.json()).then(j => {
            if (j.status !== 'success') alert('Failed to update stock.');
          }).catch(() => alert('Network error'));
        }

        function deleteColor(id) {
          if (!confirm('Are you sure you want to delete this color?')) return;
          fetch('/admin/deleteColor', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: id })
          }).then(r => r.json()).then(j => {
            if (j.status === 'success') location.reload();
            else alert('Failed to delete.');
          }).catch(() => alert('Network error'));
        }

        function handleFormSubmit(e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          
          const url = data.id ? '/admin/editColor' : '/admin/addColor';
          
          fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
          }).then(r => r.json()).then(j => {
            if (j.status === 'success') location.reload();
            else alert('Failed to save.');
          }).catch(() => alert('Network error'));
        }
      </script>`;

      resolve(html);
    });
  });
}

module.exports = adminColorsSection;
