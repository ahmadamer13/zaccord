const buildCategory = require('./buildCategory.js');
const constants = require('./includes/constants.js');

const highlights = [
  {
    title: 'Crafted precision',
    body: 'Every model is tuned for smooth surfaces and balanced strength so your prints can be shared or displayed without extra finishing.'
  },
  {
    title: 'Sustainable sourcing',
    body: 'We use certified eco-PLA and recyclable packaging to lower the footprint of each Prodeuts shipment.'
  },
  {
    title: 'Expert support',
    body: 'Order-ready STLs, guided scaling, and fast WhatsApp support keep production moving from design to delivery.'
  }
];

const buildHighlights = () => {
  return highlights.map(item => `
    <article class="highlight-card">
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </article>
  `).join('');
};

const buildProdeutsSection = (conn) => {
  return new Promise((resolve, reject) => {
    buildCategory(conn, 'All')
      .then(data => {
        const gridContent = data || `<p class="align" style="padding: 40px 0;">No products available right now.</p>`;
        const output = `
          <section class="prodeuts-hero">
            <div class="prodeuts-hero__inner">
              <p class="gothamNormal prodeuts-hero__eyebrow">Prodeuts Collection • كل المنتجات</p>
              <h1 class="prodeuts-hero__title">Professional 3D prints made for every project</h1>
              <p class="prodeuts-hero__subtitle">
                Browse our full catalog of carefully curated models—ready to print, inspected by our team, and shipped with trusted quality control.
              </p>
              <div class="prodeuts-hero__cta">
                <a href="/print" class="fillBtn btnCommon">Upload your STL</a>
                <a href="https://wa.me/message/KQRSOE7ZSWJBK1" target="_blank" class="outlineBtn gothamNormal">Talk to production</a>
              </div>
            </div>
          </section>

          <section class="prodeuts-highlights">
            ${buildHighlights()}
          </section>

          <section class="prodeuts-products">
            <div class="prodeuts-products__header">
              <h2 class="prodeuts-products__title">All Prodeuts models</h2>
              <p class="prodeuts-products__subtitle">Tap any tile to explore the design, download STL, or request a quote.</p>
            </div>
            <div class="prodeuts-grid">
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

module.exports = buildProdeutsSection;
