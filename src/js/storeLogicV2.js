const buildCategory = require('./buildCategory.js');

const { addHeader } = require('./includes/helperFunctions.js');

const buildStoreSectionV2 = (conn, userID) => {
    return new Promise((resolve, reject) => {
        // Fetch all products initially
        // buildCategory(conn, 'All') ... we are skipping buildCategory and querying directly as per previous step

        const sQuery = `SELECT * FROM fix_products ORDER BY priority ASC`;

        conn.query(sQuery, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            // Extract unique categories
            const categories = [...new Set(rows.map(r => r.category))].sort();

            const categoryButtons = categories.map(cat =>
                `<button class="filter-btn" onclick="filterProducts('${cat}')">${cat}</button>`
            ).join('');

            const productsHtml = rows.map(product => {
                const img = product.img_url.startsWith('http') ? product.img_url : '/' + product.img_url;
                return `
                            <a href="/item/product=${product.id}" class="product-card" data-category="${product.category}">
                                <div class="card-image-wrapper">
                                    <img src="${img}" alt="${product.name}" class="card-image" loading="lazy">
                                </div>
                                <div class="card-content">
                                    <div>
                                        <div class="card-category">${product.category}</div>
                                        <h3 class="card-title">${product.name}</h3>
                                    </div>
                                    <div class="card-price">${product.price} JD</div>
                                    <span class="buy-link">Buy</span>
                                </div>
                            </a>
                        `;
            }).join('');

            // Read the template file
            const fs = require('fs');
            const path = require('path');
            const templatePath = path.join(__dirname, '../store_v2.html');

            fs.readFile(templatePath, 'utf8', (err, template) => {
                if (err) {
                    reject(err);
                    return;
                }

                let output = template.replace('<!-- Products injected here -->', productsHtml);
                output = output.replace('<!-- Categories injected here -->', categoryButtons);

                // Inject Header and Footer
                const header = addHeader(userID);
                const footer = fs.readFileSync(path.join(__dirname, '../includes/footer.html'), 'utf8');

                // Inject header after body start (or before container)
                // store_v2.html has <body> ... <div class="store-container">
                // We can replace <body> with <body> + header
                output = output.replace('<body>', '<body>' + header);

                // Inject footer before body end
                // We also need to add the script from main.js if it's not already there or if header needs it
                // header.html includes scripts.

                output = output.replace('</body>', footer + '</body>');

                // Add simple client-side filtering script
                const script = `
                            <script>
                                function filterProducts(category) {
                                    const cards = document.querySelectorAll('.product-card');
                                    const btns = document.querySelectorAll('.filter-btn');

                                    btns.forEach(btn => {
                                        if (btn.textContent === category || (category === 'All' && btn.textContent === 'All')) {
                                            btn.classList.add('active');
                                        } else {
                                            btn.classList.remove('active');
                                        }
                                    });

                                    cards.forEach(card => {
                                        if (category === 'All' || card.dataset.category === category) {
                                            card.style.display = 'flex';
                                        } else {
                                            card.style.display = 'none';
                                        }
                                    });
                                }
                            </script>
                        `;

                output = output.replace('</body>', script + '</body>');
                resolve(output);
            });
        });
    });
};

module.exports = buildStoreSectionV2;
