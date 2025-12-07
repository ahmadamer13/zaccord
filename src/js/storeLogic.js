const buildCategory = require('./buildCategory.js');
const constants = require('./includes/constants.js');

const highlightCopy = [
  {
    title: 'Curated for real life',
    body: 'Tools, organizers, and daily helpers that arrive ready to print or order with one tap.'
  },
  {
    title: 'Instant pricing',
    body: 'Every card shows size, quick specs, and a transparent JD price before you navigate away.'
  },
  {
    title: 'Support when you need it',
    body: 'Need customization? Chat on WhatsApp or upload your own idea through the Print page.'
  }
];

const buildStoreSection = (conn) => {
  return new Promise((resolve, reject) => {
    buildCategory(conn, 'All', { priceOverride: 5, limit: 5 })
      .then(data => {
        const highlightPanels = highlightCopy.map(item => `
          <article class="store-featured__panel">
            <p class="store-featured__label">Use case</p>
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `).join('');

        const gridContent = data || `<p class="align" style="padding: 40px 0;">No products available at the moment.</p>`;
        const output = `
          <section class="store-hero">
            <div class="store-hero__inner">
              <p class="gothamNormal store-hero__eyebrow">Our curated collection • كل المنتجات</p>
              <h1 class="store-hero__title">Full Product Catalog</h1>
              <p class="store-hero__description">
                Browse everything we currently offer—single click, instant pricing, same trusted quality.
              </p>
              <div class="store-hero__cta">
                <a href="/print" class="fillBtn btnCommon">Upload a model</a>
                <a href="https://wa.me/message/KQRSOE7ZSWJBK1" target="_blank" class="fillBtn btnCommon store-hero__cta--ghost">
                  Chat on WhatsApp
                </a>
              </div>
              <div class="store-hero__meta">
                <span>Ready to print within 24h</span>
                <span>Free pickup in Amman or courier across Jordan</span>
                <span>Each listing shows specs, size, and price at a glance</span>
              </div>
            </div>
          </section>

          <section class="store-featured">
            ${highlightPanels}
          </section>

          <section class="store-products">
            <div class="store-products__header">
              <h2 class="store-products__title">All Products</h2>
              <p class="store-products__subtitle">Tap any tile to view details, download, or buy.</p>
            </div>
            <div class="store-arrange">
              <p class="store-arrange__label">Arranged for fast browsing</p>
              <div class="store-arrange__meta">
                <span>Sorted by shelf-ready priority</span>
                <span>Specs, sizes, and prices stay visible while you scan</span>
                <span>Tap to open the product page or download STL</span>
              </div>
            </div>
            <div class="store-grid store-grid--arranged">
              ${gridContent}
            </div>
          </section>
          ${constants.lazyLoad}
        `;
        resolve(output);
      })
      .catch(err => reject(err));
  });
};

module.exports = buildStoreSection;
