const fs = require('fs');
const path = require('path');

const buildAdminAddProduct = (conn) => {
    return new Promise((resolve, reject) => {
        const templatePath = path.join(__dirname, '../adminAddProduct.html');
        fs.readFile(templatePath, 'utf8', (err, content) => {
            if (err) {
                reject(err);
            } else {
                resolve(content);
            }
        });
    });
};

module.exports = buildAdminAddProduct;
