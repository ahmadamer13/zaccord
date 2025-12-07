const buildAdminProducts = (conn) => {
    return new Promise((resolve, reject) => {
        const q = 'SELECT id, name, price, category, img_url FROM fix_products ORDER BY date_added DESC';
        conn.query(q, [], (err, rows) => {
            if (err) return reject(err);

            let html = '';
            if (!rows || rows.length === 0) {
                html = '<p style="text-align:center; color:#666; grid-column: 1/-1;">No products found.</p>';
            } else {
                for (let p of rows) {
                    // Ensure image path is correct (handle relative paths)
                    let img = p.img_url;
                    if (img && !img.startsWith('/') && !img.startsWith('http')) {
                        img = '/' + img;
                    }

                    html += `
                    <div class="product-card" id="card_${p.id}">
                        <img src="${img}" alt="${p.name}" class="product-img" onerror="this.src='/images/placeholder.png'">
                        <div class="product-info">
                            <h3 class="product-title" title="${p.name}">${p.name}</h3>
                            <div class="product-meta">${p.category}</div>
                            <div class="product-price">${p.price} JD</div>
                            <div class="card-actions">
                                <button class="btn-edit" onclick="editProduct('${p.id}')">Edit</button>
                                <button class="btn-delete" onclick="confirmDelete('${p.id}', '${p.name.replace(/'/g, "\\'")}')">Delete</button>
                            </div>
                        </div>
                    </div>
                    `;
                }
            }
            resolve(html);
        });
    });
};

module.exports = buildAdminProducts;
