const fs = require('fs');
const path = require('path');

const buildAdminEditProduct = (conn, productId) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM fix_products WHERE id = ?', [productId], (err, rows) => {
            if (err) return reject(err);
            if (!rows || rows.length === 0) return reject(new Error('Product not found'));

            const p = rows[0];
            const templatePath = path.join(__dirname, '../adminEditProduct.html');

            fs.readFile(templatePath, 'utf8', (err, content) => {
                if (err) return reject(err);

                // Replace placeholders
                let html = content;
                html = html.replace(/{{id}}/g, p.id);
                html = html.replace(/{{name}}/g, p.name || '');
                html = html.replace(/{{price}}/g, p.price || '');
                html = html.replace(/{{description}}/g, p.description || '');
                html = html.replace(/{{size}}/g, p.size || '');
                html = html.replace(/{{img_url}}/g, p.img_url ? '/' + p.img_url : '');
                html = html.replace(/{{stl_path}}/g, p.stl_path || 'None');

                // Handle Category Selection
                const categories = [
                    'Other', 'Holders, systemators', 'Telephone holders',
                    'Bathroom accessories', 'Kitchen', 'Decor', 'Toys'
                ];

                categories.forEach(cat => {
                    const placeholder = `{{cat_${cat.split(',')[0].trim()}}}`;
                    // Simple check: if current category starts with the option value (to handle potential variations)
                    const isSelected = (p.category && p.category.includes(cat.split(',')[0].trim())) ? 'selected' : '';
                    // Actually, let's try to match exactly or close enough. 
                    // The template uses specific keys like {{cat_Holders}}.
                    // Let's just reset all to empty string first, then set the correct one.
                });

                // A simpler way for categories:
                html = html.replace(/{{cat_Other}}/g, p.category === 'Other' ? 'selected' : '');
                html = html.replace(/{{cat_Holders}}/g, p.category === 'Holders, systemators' ? 'selected' : '');
                html = html.replace(/{{cat_Telephone}}/g, p.category === 'Telephone holders' ? 'selected' : '');
                html = html.replace(/{{cat_Bathroom}}/g, p.category === 'Bathroom accessories' ? 'selected' : '');
                html = html.replace(/{{cat_Kitchen}}/g, p.category === 'Kitchen' ? 'selected' : '');
                html = html.replace(/{{cat_Decor}}/g, p.category === 'Decor' ? 'selected' : '');
                html = html.replace(/{{cat_Toys}}/g, p.category === 'Toys' ? 'selected' : '');

                resolve(html);
            });
        });
    });
};

module.exports = buildAdminEditProduct;
