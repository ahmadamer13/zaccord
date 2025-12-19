const genSpecs = require('./includes/genSpecs.js');
const escapeVars = require('./includes/escapeVars.js');
const getColors = require('./includes/getColors.js');
const { translateRow, translateRows } = require('./includes/productTranslations.js');

// Build page for a specific item
const buildItemSection = (conn, itemId, req) => {
    return new Promise((resolve, reject) => {
        // Select the item from db & make sure it exists
        itemId = Number(escapeVars(itemId));
        conn.query("SELECT * FROM fix_products WHERE id = ? LIMIT 1", [itemId],
            function (err, result, fields) {
                if (err) {
                    reject('An unexpected error occurred, please try again')
                    return;
                }

                // Invalid item id
                if (result.length === 0) {
                    reject('No such product');
                    return;
                }

                const tr = translateRow(result[0]);

                const escapeBackticks = (str) => str ? String(str).replace(/`/g, '\\`') : '';

                let id = tr.id;
                let imgUrl = tr.img_url;
                let productName = escapeBackticks(tr.name);
                let category = escapeBackticks(tr.category);
                let price = tr.price;
                let size = escapeBackticks(tr.size); // e.g. "100x100x100"
                let description = escapeBackticks(tr.description);
                let stlPath = tr.stl_path;
                let showcaseImgs = tr.img_showcase ? tr.img_showcase.split(',') : [];

                // Fetch colors
                getColors(conn).then(([colors, hex_codes]) => {
                    const plaColors = colors['pla'] || [];
                    const plaHex = hex_codes['pla'] || {};

                    // Default color
                    let defaultColor = plaColors.includes('White') ? 'White' : plaColors[0];

                    // Generate Color Options
                    let colorOptionsHtml = plaColors.map(c => {
                        let hex = plaHex[c] || '#cccccc';
                        let isSelected = c === defaultColor ? 'selected' : '';
                        return `<div class="color-option ${isSelected}" data-color="${c}" style="background-color: ${hex};" onclick="selectColor(this, '${c}')" title="${c}"></div>`;
                    }).join('');

                    // Modern Apple-style Product Page Layout
                    let output = `
            <script src="/js/includes/cookie.js"></script>
            <script src="/js/includes/short.js"></script>
            <style>
                .product-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    font-family: 'Inter', sans-serif;
                }
                .product-gallery {
                    position: sticky;
                    top: 100px;
                    height: fit-content;
                }
                .main-image {
                    width: 100%;
                    border-radius: 20px;
                    background: #f5f5f7;
                    margin-bottom: 20px;
                    aspect-ratio: 1;
                    object-fit: contain;
                    padding: 40px;
                    box-sizing: border-box;
                }
                .gallery-thumbs {
                    display: flex;
                    gap: 10px;
                    overflow-x: auto;
                }
                .thumb {
                    width: 80px;
                    height: 80px;
                    border-radius: 10px;
                    background: #f5f5f7;
                    object-fit: contain;
                    cursor: pointer;
                    padding: 10px;
                    box-sizing: border-box;
                    border: 2px solid transparent;
                    transition: border-color 0.2s;
                }
                .thumb:hover, .thumb.active {
                    border-color: #0071e3;
                }
                
                .product-details {
                    padding-top: 20px;
                }
                .new-badge {
                    color: #bf4800;
                    font-weight: 600;
                    font-size: 14px;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                    display: block;
                }
                .product-title {
                    font-size: 48px;
                    font-weight: 700;
                    margin: 0 0 10px;
                    line-height: 1.1;
                    color: #1d1d1f;
                }
                .product-price {
                    font-size: 24px;
                    color: #1d1d1f;
                    margin-bottom: 30px;
                    font-weight: 500;
                }
                .product-desc {
                    font-size: 17px;
                    line-height: 1.5;
                    color: #1d1d1f;
                    margin-bottom: 40px;
                }
                
                .action-box {
                    background: #f5f5f7;
                    padding: 30px;
                    border-radius: 18px;
                    margin-bottom: 40px;
                }
                .qty-selector {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .qty-btn {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 1px solid #d2d2d7;
                    background: #fff;
                    cursor: pointer;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .qty-input {
                    width: 40px;
                    text-align: center;
                    font-size: 16px;
                    border: none;
                    background: transparent;
                }
                
                .color-picker {
                    margin-bottom: 25px;
                }
                .color-label {
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 10px;
                    display: block;
                }
                .color-options {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .color-option {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: 2px solid #fff;
                    box-shadow: 0 0 0 1px #d2d2d7;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .color-option:hover {
                    transform: scale(1.1);
                }
                .color-option.selected {
                    box-shadow: 0 0 0 2px #0071e3;
                    transform: scale(1.1);
                }

                .btn-primary {
                    background: #0071e3;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 980px;
                    font-size: 17px;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%;
                    margin-bottom: 10px;
                    transition: background 0.2s;
                }
                .btn-primary:hover { background: #0077ed; }
                
                .btn-secondary {
                    background: #e8e8ed;
                    color: #1d1d1f;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 980px;
                    font-size: 17px;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%;
                    transition: background 0.2s;
                }
                .btn-secondary:hover { background: #d2d2d7; }

                .whatsapp-order-btn:hover {
                    background: linear-gradient(135deg, #128C7E 0%, #075E54 100%) !important;
                    box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4) !important;
                    transform: translateY(-2px);
                }

                .whatsapp-order-btn:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3) !important;
                }

                .specs-list {
                    margin-top: 40px;
                    border-top: 1px solid #d2d2d7;
                    padding-top: 40px;
                }
                .spec-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px 0;
                    border-bottom: 1px solid #e5e5e5;
                    font-size: 14px;
                }
                .spec-label { color: #86868b; }
                .spec-value { font-weight: 500; }

                @media (max-width: 768px) {
                    .product-container {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }
                    .product-gallery {
                        position: static;
                    }
                    .product-title {
                        font-size: 36px;
                    }
                }
            </style>

            <div class="product-container">
                <div class="product-gallery">
                    <img src="/${imgUrl}" class="main-image" id="mainImage" alt="${productName}">
                    <div class="gallery-thumbs">
                        <img src="/${imgUrl}" class="thumb active" onclick="changeImage(this.src)">
                        ${showcaseImgs.map(img => `<img src="/images/${img}" class="thumb" onclick="changeImage(this.src)">`).join('')}
                    </div>
                </div>

                <div class="product-details">
                    <span class="new-badge">${category}</span>
                    <h1 class="product-title">${productName}</h1>
                    <div class="product-price">5 JD</div>
                    
                    <div class="product-desc">
                        ${description}
                    </div>

                    <div class="action-box">
                        <!-- Hidden Inputs for Technical Specs -->
                        <input type="hidden" id="rvas" value="0.2">
                        <input type="hidden" id="suruseg" value="20">
                        <input type="hidden" id="fvas" value="1.2">
                        <input type="hidden" id="scale" value="1">
                        <input type="hidden" id="printMat" value="PLA">
                        <input type="hidden" id="tech" value="FDM">
                        <input type="hidden" id="size" value="${size}">
                        <input type="hidden" id="selectedColor" value="${defaultColor}">

                        <div class="color-picker">
                            <span class="color-label">Color: <span id="colorName">${defaultColor}</span></span>
                            <div class="color-options">
                                ${colorOptionsHtml}
                            </div>
                        </div>

                        <div class="qty-selector">
                            <span>Quantity:</span>
                            <button class="qty-btn" onclick="updateQty(-1)">-</button>
                            <input type="number" id="quantity" value="1" class="qty-input" readonly>
                            <button class="qty-btn" onclick="updateQty(1)">+</button>
                        </div>
                        
                        <button class="btn-primary" onclick="addToCart(${id})">Order Now</button>
                        <a href="https://wa.me/962797479825?text=I%20want%20to%20order:%20${encodeURIComponent(productName)}" target="_blank" rel="noopener noreferrer" class="whatsapp-order-btn" style="text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 12px 16px; margin-top: 10px; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: #fff; border-radius: 980px; font-size: 17px; font-weight: 600; transition: all 0.3s ease; border: none; cursor: pointer; box-shadow: 0 2px 8px rgba(37, 211, 102, 0.2);">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                            </svg>
                            Order on WhatsApp
                        </a>
                        <div id="status" style="margin-top:10px; text-align:center; font-weight:500;"></div>
                    </div>

                    <div class="specs-list">
                        <h3>Specifications</h3>
                        <div class="spec-item">
                            <span class="spec-label">Size</span>
                            <span class="spec-value">${size}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Material</span>
                            <span class="spec-value">PLA (Premium)</span>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                function changeImage(src) {
                    document.getElementById('mainImage').src = src;
                    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
                    event.target.classList.add('active');
                }
                
                function updateQty(change) {
                    const input = document.getElementById('quantity');
                    let val = parseInt(input.value) + change;
                    if (val < 1) val = 1;
                    if (val > 100) val = 100;
                    input.value = val;
                }

                function selectColor(el, color) {
                    document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
                    el.classList.add('selected');
                    document.getElementById('selectedColor').value = color;
                    document.getElementById('colorName').innerText = color;
                }
                
                function getModelSize() {
                    return document.getElementById('size').value.replace(/(x)|(mm)/g, '').replace(/\\s+/g, ',');
                }

                function addToCart(id) {
                    buyItem(id);
                }
                
                function buyItem(id) {
                     let rvas = document.getElementById('rvas').value;
                     let suruseg = document.getElementById('suruseg').value;
                     let color = document.getElementById('selectedColor').value;
                     let scale = document.getElementById('scale').value;
                     let fvas = document.getElementById('fvas').value;
                     let q = document.getElementById('quantity').value;
                     let size = getModelSize();
                     let printMat = document.getElementById('printMat').value;
                     let tech = document.getElementById('tech').value;

                     window.location.href = \`/buy?product=\${id}&rvas=\${rvas}&suruseg=\${suruseg}&color=\${encodeURIComponent(color)}&scale=\${scale}&fvas=\${fvas}&q=\${q}&size=\${size}&printMat=\${printMat}&tech=\${tech}\`;
                }
            </script>
          `;

                    let descToTag = description.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
                    resolve([output, productName, descToTag]);
                });
            });
    });
};

module.exports = buildItemSection;
