const fs = require('fs');
const path = require('path');
const produceShowcaseOutput = require('./includes/itemGenerator.js');
const { translateRows } = require('./includes/productTranslations.js');
const buildCategory = require('./buildCategory.js');

const CONTACT_FORM = `
  <div class="mtsix" style="width: calc(100% - 40px); max-width: 1300px; margin: 0 auto;">
    <hr class="hrStyle">
    <h2 class="gotham font26 align fontNorm" id="getQuote">
      Contact
    </h2>
    <h2 class="align font18 lh fontNorm gothamNormal">
      For custom printing, questions, or special requests, feel free to contact us!
    </h2>
    <div class="flexDiv" style="flex-wrap: wrap;" id="normalDiv">
      <input type="text" class="dFormField" id="name" placeholder="Name" value="">
      <input type="email" class="dFormField" id="email" placeholder="Email">
      <input type="text" class="dFormField protmob" id="mobile"
        placeholder="Phone number" value="">
      <textarea placeholder="CAD model URL, expectations: material, color, technology, etc."
        id="message" class="dFormField" style="width: 100%; height: 100px;"></textarea>
    </div>
    <button class="fillBtn btnCommon" id="submitBtn" style="display: block; margin: 0 auto;">
      Send
    </button>
    <div id="pstatus" class="align errorBox gothamNormal lh" style="margin-top: 20px;"></div>
    <div id="succstat" class="align successBox gothamNormal lh" style="margin-top: 20px;"></div>
  </div>
`;

// Build the index page from fixed products 
// TODO: use an async library to reduce the callback hell and better deal w. async queries
const buildMainSection = (conn, cat) => {
  return new Promise((resolve, reject) => {
    // Check if used in search query
    let isDefault = true;
    let sQuery = 'SELECT * FROM fix_products WHERE is_best = 1 ORDER BY priority ASC';

    let catToNum = {};

    // Build category slider
    let catQuery = 'SELECT DISTINCT category FROM fix_products ORDER BY category ASC';
    conn.query(catQuery, (e, res, f) => {
      if (e) {
        reject('An unexpected error occurred, please try again 1', e);
        return;
      }

      conn.query(sQuery, function (err, result, fields) {
        if (err) {
          reject('An unexpected error occurred, please try again 2');
          return;
        }
        // Translate most-popular items
        result = translateRows(result);

        // Create html output (Apple-inspired minimal layout)
        let output = `
          <style>
            :root{
              --ink:#0b0b0c;
              --silver:#f5f5f7;
              --mid:#c7c7cc;
              --accent:#0071e3;
              --muted:#6e6e73;
            }
            body{
              background:var(--silver);
              color:var(--ink);
              font-family:"SF Pro Display","Helvetica Neue",Arial,sans-serif;
            }
            .page{min-height:100vh;display:flex;flex-direction:column;}
            .nav-lite{
              position:sticky;top:0;z-index:10;
              backdrop-filter:blur(10px);
              background:rgba(245,245,247,0.92);
              border-bottom:1px solid rgba(0,0,0,0.04);
            }
            .nav-lite__inner{
              max-width:1200px;margin:0 auto;padding:14px 20px;
              display:flex;align-items:center;justify-content:space-between;gap:16px;
            }
            .brand{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:0.4px;}
            .brand img{width:36px;height:36px}
            .nav-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
            .pill{display:inline-flex;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;
              border:1px solid rgba(0,0,0,0.08);background:#fff;color:var(--ink);font-weight:600;
              text-decoration:none;box-shadow:0 8px 28px rgba(0,0,0,0.04);font-size:16px;}
            .pill--ghost{background:transparent;border-color:rgba(0,0,0,0.15);}
            .pill--primary{background:var(--ink);color:#fff;border-color:var(--ink);}
            .pill:hover{transform:translateY(-1px);transition:transform 120ms ease;}
            .pill small{color:var(--muted);font-weight:500;}
            .hero{
              position:relative;overflow:hidden;min-height:70vh;display:flex;align-items:center;justify-content:center;
              padding:60px 20px 50px;
            }
            .hero::before{
              content:"";position:absolute;inset:0;
              background:radial-gradient(circle at 20% 20%,rgba(0,113,227,0.18),transparent 32%),
                         radial-gradient(circle at 80% 10%,rgba(0,0,0,0.12),transparent 28%),
                         linear-gradient(135deg,#fff,rgba(255,255,255,0.7));
              z-index:0;
            }
            .hero__inner{
              position:relative;z-index:1;max-width:1200px;width:100%;
              display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
              gap:24px;align-items:center;
            }
            .hero__text{max-width:650px;}
            .hero__text h1{font-size:42px;line-height:1.08;margin:0 0 16px;letter-spacing:-0.02em;}
            .hero__text p{font-size:19px;color:var(--muted);margin:0 0 20px;line-height:1.65;}
            .hero__cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;margin-bottom:12px;}
            .badge-row{
              display:flex;
              gap:12px;
              flex-wrap:wrap;
              margin-top:18px;
              align-items:center;
              width:100%;
              justify-content:flex-start;
            }
            .badge{padding:9px 14px;border-radius:999px;background:#fff;border:1px solid rgba(0,0,0,0.06);
              color:var(--muted);font-weight:700;font-size:16px;display:inline-flex;align-items:center;gap:10px;}
            .badge img{width:18px;height:18px;}
            .hero__panel{background:#fff;border-radius:24px;padding:20px;box-shadow:0 20px 45px rgba(0,0,0,0.06);}
            .panel-title{font-size:20px;margin:0 0 12px;display:flex;align-items:center;gap:8px;}
            .metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;}
            .metric{background:var(--silver);border-radius:16px;padding:14px;}
            .metric strong{display:block;font-size:22px;margin-bottom:4px;}
            .metric span{color:var(--muted);font-size:13px;}
            .section{max-width:1200px;margin:40px auto;padding:0 20px;}
            .section h2{font-size:30px;margin:0 0 14px;letter-spacing:-0.01em;}
            .section p.lead{color:var(--muted);margin:0 0 18px;font-size:17px;}
            .grid{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));}
            .tile{background:#fff;border-radius:20px;padding:18px;box-shadow:0 12px 32px rgba(0,0,0,0.05);min-height:160px;display:flex;flex-direction:column;gap:8px;}
            .tile h3{margin:0;font-size:19px;letter-spacing:-0.01em;}
            .tile p{margin:0;color:var(--muted);line-height:1.6;}
            .timeline{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));}
            .step{background:#0b0b0c;color:#fff;padding:18px;border-radius:18px;min-height:160px;}
            .step small{color:rgba(255,255,255,0.7);font-weight:600;}
            .step h4{margin:8px 0 8px;font-size:20px;}
            .step p{margin:0;color:rgba(255,255,255,0.78);line-height:1.6;}
            .materials{display:flex;gap:14px;flex-wrap:wrap;}
            .chip{background:#fff;border-radius:14px;padding:10px 14px;border:1px solid rgba(0,0,0,0.06);color:var(--muted);font-weight:600;font-size:15px;}
            .cta-band{
              max-width:1200px;margin:60px auto;padding:26px 20px;border-radius:26px;
              background:linear-gradient(120deg,#0b0b0c,#1f2937);color:#fff;
              display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;
            }
            .cta-band h3{margin:0;font-size:26px;}
            .cta-band p{margin:4px 0 0;color:rgba(255,255,255,0.75);}
            .cta-actions{display:flex;gap:10px;flex-wrap:wrap;}
            @media (max-width:700px){
              .hero__text h1{font-size:32px;}
              .hero__text p{font-size:17px;}
              .nav-lite__inner{padding:12px 16px;}
              .pill{width:100%;justify-content:center;}
            }
          </style>

          <div class="page">


            <section class="hero">
              <div class="hero__inner">
                <div class="hero__text">
                  <h1>Professional 3D Printing Services in Jordan</h1>
                  <p>Get custom 3D printing in Jordan with instant quotes. Upload your STL file and choose from PLA, PETG, ABS, and resin (SLA) materials. Fast delivery to Amman, Irbid, Zarqa, Aqaba, and all governorates across Jordan.</p>
                  <p style="margin:6px 0 0;color:#475569;font-weight:700;">0.07 JD per gram · FDM & SLA · Same-day printing available</p>
                  <div class="hero__cta">
                    <a class="pill pill--primary" href="/print" aria-label="Upload STL file for instant 3D printing quote">Upload STL & Get Quote</a>
                    <a class="pill" href="https://wa.me/962797479825?text=I%20am%20interested%20in%203D%20design%20service" target="_blank" rel="noreferrer" aria-label="Contact for 3D design service">3D Design Service</a>
                    <a class="pill" href="/store" aria-label="Browse 3D printed products store">Store</a>
                    <a class="pill" href="https://wa.me/message/KQRSOE7ZSWJBK1" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp for 3D printing help">Chat on WhatsApp</a>
                    <a class="pill pill--ghost" href="/ar/" lang="ar" dir="rtl" aria-label="View website in Arabic">الموقع بالعربية</a>
                  </div>
                  <div class="badge-row">
                    <div class="badge">✓ 1000+ Parts Printed</div>
                    <div class="badge">✓ Same-Day Service</div>
                    <div class="badge">✓ All Jordan Coverage</div>
                  </div>
                </div>
                <div class="hero__panel">
                  <div class="panel-title">At a glance</div>
                  <div class="metrics">
                    <div class="metric">
                      <strong>Instant price</strong>
                      <span>Upload STL for transparent cost</span>
                    </div>
                    <div class="metric">
                      <strong>8am – 10pm</strong>
                      <span>Open daily</span>
                    </div>
                    <div class="metric">
                      <strong>+962 79 747 9825</strong>
                      <span>Call or WhatsApp anytime</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="section">
              <h2>How Our 3D Printing Service Works</h2>
              <p class="lead">Simple, transparent process from STL upload to delivery across Jordan.</p>
              <div class="timeline">
                <div class="step">
                  <small>01</small>
                  <h4>Upload your STL file</h4>
                  <p>Get instant pricing based on weight and material. No hidden fees or waiting.</p>
                </div>
                <div class="step">
                  <small>02</small>
                  <h4>Choose material & color</h4>
                  <p>PLA for prototypes, PETG for strength, ABS for heat resistance, or resin for detail.</p>
                </div>
                <div class="step">
                  <small>03</small>
                  <h4>We print & deliver</h4>
                  <p>Quality check every print, then fast delivery anywhere in Jordan.</p>
                </div>
              </div>
            </section>

            <section class="section">
              <h2>Why Choose Us for 3D Printing in Jordan</h2>
              <p class="lead">Premium quality, honest pricing, and expert support from local makers in Amman.</p>
              <div class="grid">
                <div class="tile">
                  <h3>✓ Instant Online Quotes</h3>
                  <p>Upload your STL file and see exact pricing immediately. 0.07 JD per gram with no surprises.</p>
                </div>
                <div class="tile">
                  <h3>✓ Premium Materials</h3>
                  <p>PLA, PETG, ABS, and resin (SLA) from trusted brands. All colors in stock.</p>
                </div>
                <div class="tile">
                  <h3>✓ Fast Turnaround</h3>
                  <p>Same-day printing available. Flexible schedules for urgent projects without compromising quality.</p>
                </div>
                <div class="tile">
                  <h3>✓ Local Expert Support</h3>
                  <p>English and Arabic guidance via WhatsApp. We help optimize your design for best results.</p>
                </div>
                <div class="tile">
                  <h3>✓ Nationwide Delivery</h3>
                  <p>Fast shipping to Amman, Irbid, Zarqa, Aqaba, and all Jordan governorates.</p>
                </div>
                <div class="tile">
                  <h3>✓ Quality Guaranteed</h3>
                  <p>Every print inspected before shipping. We reprint if there's any issue.</p>
                </div>
              </div>
            </section>

            <section class="section">
              <h2>Materials, Prices & Delivery Options</h2>
              <p class="lead">Transparent pricing at 0.07 JD per gram. Choose the right material for your project.</p>
              <div class="materials">
                <div class="chip">PLA — Best for prototypes & decorative items</div>
                <div class="chip">PETG — Tough & weather resistant</div>
                <div class="chip">ABS — Heat resistant & post-processable</div>
                <div class="chip">Resin (SLA) — Ultra-detailed & smooth</div>
                <div class="chip">TPU — Flexible & impact resistant</div>
                <div class="chip">Nylon — Industrial strength</div>
              </div>
              <p style="margin-top:16px;color:var(--muted);">
                <strong>Delivery:</strong> Fast shipping across Jordan. Same-day printing for urgent orders. 
                <a href="/print" class="blueLink">Upload your STL file now →</a>
              </p>
            </section>
                <div class="chip">Wide color range</div>
              </div>
            </section>

            <section class="section">
              <h2>Useful 3D Printing Resources</h2>
              <p class="lead">Explore these trusted platforms for 3D models, printers, and community support.</p>
              <div class="grid">
                <div class="tile">
                  <h3>🖨️ Bambu Lab</h3>
                  <p>Leading manufacturer of high-speed, reliable 3D printers with innovative features and excellent print quality.</p>
                  <a href="https://bambulab.com" target="_blank" rel="nofollow noopener" class="pill pill--ghost" style="margin-top:10px;font-size:14px;">Visit Bambu Lab →</a>
                </div>
                <div class="tile">
                  <h3>📦 Thingiverse</h3>
                  <p>The world's largest library of free 3D printable files. Download thousands of STL models for any project.</p>
                  <a href="https://www.thingiverse.com" target="_blank" rel="nofollow noopener" class="pill pill--ghost" style="margin-top:10px;font-size:14px;">Browse Thingiverse →</a>
                </div>
                <div class="tile">
                  <h3>🌍 MakerWorld</h3>
                  <p>Bambu Lab's community platform for sharing and downloading high-quality 3D models optimized for modern printers.</p>
                  <a href="https://makerworld.com" target="_blank" rel="nofollow noopener" class="pill pill--ghost" style="margin-top:10px;font-size:14px;">Explore MakerWorld →</a>
                </div>
              </div>
            </section>

            <section class="section">
              <h2>Visit Us</h2>
              <p class="lead">Come say hello at our workshop in Amman. We serve all of Jordan.</p>
              <div class="grid">
                <div class="tile">
                  <h3>Address</h3>
                  <p>Amman, Jordan</p>
                  <p>Zip Code: 11121</p>
                  <a href="https://maps.app.goo.gl/PoRETQmSAV7xHrfSA" target="_blank" class="pill pill--ghost" style="margin-top:10px;font-size:14px;">Open in Maps</a>
                </div>
                <div class="tile">
                  <h3>Opening Hours</h3>
                  <p>Everyday: 9am - 6pm</p>
                </div>
                <div class="tile">
                  <h3>Contact</h3>
                  <p>+962 79 747 9825</p>
                  <p>info@3djordanprint.com</p>
                </div>
                <div class="tile">
                  <h3>Service Areas</h3>
                  <p>Amman, Irbid, Zarqa, Aqaba, Salt, Madaba, Jerash, Ma'an, Karak, Tafilah, Ajloun, Mafraq.</p>
                </div>
              </div>
            </section>

            <section class="cta-band">
              <div>
                <h3>Ready to start?</h3>
                <p>Instant quotes, bilingual support, and Jordan-wide delivery.</p>
              </div>
              <div class="cta-actions">
                <a class="pill pill--primary" href="/print">Upload STL</a>
                <a class="pill" href="https://wa.me/message/KQRSOE7ZSWJBK1" target="_blank" rel="noreferrer">Quick consult</a>
              </div>
            </section>
          </div>
        `;
        output += `
          <div class="topHolder" style="margin-top: 10px;">
            <div class="topShrink">
              <div class="topInner">
                <input type="text" autocomplete="off" class="searchBox" placeholder="Search products..." onkeyup="searchForItem()" id="sfi" />
                <div class="categoryImg" onclick="toggleCategory()" id="categoryImg">
                  <img src="/images/icons/vmenu.svg" alt="Categories">
                </div>
              </div>
              <div class="cbCont flexDiv trans" id="cbCont">
                <div class="arrows trans" id="larr" onclick="scrollHor('left')">
                  <img src="/images/larr.png" width="25" height="25" alt="Left">
                </div>
                <div class="catBox" id="catBox">
        `;

        for (let i = 0; i < res.length; i++) {
          // Build table for getting the respective number value for a category
          catToNum[res[i].category] = (i + 1);

          output += `
            <a href="/?cat=${res[i].category}" class="pseudoLink" rel="nofollow">
              <div onclick="sortByCat('${res[i].category}', ${i + 1})" class="scat">
                ${res[i].category}
              </div>
            </a>
          `;
        }

        output += `
                  <a href="/?cat=All" class="pseudoLink" rel="nofollow"><div onclick="sortByCat('All', ${res.length + 1})" class="scat">All</div></a>
                </div>
                <div class="arrows trans" id="rarr" onclick="scrollHor('right')">
                  <img src="/images/rarr.png" width="25" height="25" alt="Right">
                </div>
              </div>
            </div>
          </div>
          <div class="clear"></div>
        `;

        // Only further products on a category page
        // Only display the top of the landing page on the index page
        let popProdsStyle = 'display: none;';
        let catToggle = 'display: none;';
        let moreShow = 'diplay: none;';
        if (cat) {
          popProdsStyle = 'display: none;';
          catToggle = 'display: block';
          moreShow = 'display: flex;';
        }

        output += `
          <p class="gotham align font34" style="margin-top: 60px; margin-bottom: 0; ${popProdsStyle}"
            id="popProds">
            Most Popular Products
          </p>
        `;

        output += `
          <section class="mainShowcase keepBottom animate__animated animate__fadeIn" id="ms" style="display:none;">
            <div class="dynamicShowcase" id="dynamicShowcase">
        `;

        if (!cat) {
          var prodElements = new Promise((resolve, reject) => {
            let collectItems = '';
            // Loop through all fixed items in the db
            for (let i = 0; i < result.length; i++) {
              collectItems += produceShowcaseOutput(result, isDefault, i, false, true);
            }
            resolve(collectItems);
          });
        } else {
          // If URL is a simple category only display products in that category
          var prodElements = new Promise((resolve, reject) => {
            let collectItems = '';
            buildCategory(conn, cat).then(data => {
              collectItems += data;
              resolve(collectItems);
            }).catch(err => {
              reject('Hiba');
            });
          });
        }

        prodElements.then(data => {
          output += data;

          // Add the 4 newest products after most popular ones
          let newestQuery = 'SELECT * FROM fix_products ORDER BY date_added DESC LIMIT 4';
          conn.query(newestQuery, function displayNewItems(err, newRes, fields) {
            if (err) {
              reject(err);
              return;
            }

            newRes = translateRows(newRes);
            for (let i = 0; i < newRes.length; i++) {
              output += produceShowcaseOutput(newRes, isDefault, i, false, false);
            }

            output += `
                  </div>
                </section>
            `;

            output += `
              <section class="section">
                <h2>Common Questions & Insights</h2>
                <p class="lead">Honest answers about costs, materials, and legality in Jordan.</p>
                
                <style>
                  .faq-item { background: #fff; border-radius: 16px; padding: 18px; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
                  .faq-item summary { font-weight: 600; cursor: pointer; list-style: none; position: relative; padding-right: 24px; font-size: 17px; }
                  .faq-item summary::-webkit-details-marker { display: none; }
                  .faq-item summary::after { content: '+'; position: absolute; right: 0; font-size: 20px; color: var(--accent); }
                  .faq-item[open] summary::after { content: '−'; }
                  .faq-item p { margin-top: 12px; color: var(--muted); line-height: 1.6; }
                  .faq-item strong { color: var(--ink); }
                  .faq-item ul { margin-top: 8px; padding-left: 20px; color: var(--muted); }
                </style>

                <details class="faq-item">
                  <summary>Can I Pay Someone to 3D Print Something?</summary>
                  <p>Yes, absolutely. You don't need to own a 3D printer. Many customers hire us because buying a printer is expensive, printing needs experience, and failed prints waste time and money.</p>
                  <p>With Jordan 3D Print, you simply send the STL file, choose the material, get a price, and receive the printed part.</p>
                </details>

                <details class="faq-item">
                  <summary>How Much Does It Cost to Have Something 3D Printed?</summary>
                  <p>There is no fixed price, because 3D printing cost depends on several factors:</p>
                  <p><strong>1. Material Used:</strong> We work with PLA (cheapest), PETG (stronger), ABS (heat resistant), Resin (high detail), and TPU (flexible).</p>
                  <p><strong>2. Material Weight:</strong> We mainly price by weight. For PLA, the cost is <strong>0.07 JOD per gram</strong>. Example: 100g = 7 JOD, 300g = 21 JOD, 1kg = 70 JOD.</p>
                  <p><strong>3. Print Time & Settings:</strong> Slower speeds, higher quality, or special settings increase machine time and cost.</p>
                </details>

                <details class="faq-item">
                  <summary>Real Case Study: Large Medical Model (Kidney System)</summary>
                  <p><strong>Object:</strong> Large kidney system model<br>
                  <strong>Why 3D printing:</strong> Could not be made any other way<br>
                  <strong>PLA option:</strong> Cost ~50 JOD<br>
                  <strong>PETG option (transparent):</strong> Print time ~10 hours, slower speed for clarity.</p>
                  <p>The customer chose 3D printing because traditional manufacturing was impossible. This shows when 3D printing is not just cheaper — it's the only solution.</p>
                </details>

                <details class="faq-item">
                  <summary>How Much Does 1 KG of PLA Print?</summary>
                  <p>1 kg of PLA prints about 330–400 cubic cm, depending on infill, wall thickness, and design. That equals many small parts or a few large objects.</p>
                  <p>PLA is popular because it offers low cost, good strength, and a clean finish.</p>
                </details>

                <details class="faq-item">
                  <summary>Is 3D Printing Actually Cheaper?</summary>
                  <p>Sometimes yes — sometimes no.</p>
                  <p><strong>It IS cheaper when:</strong> You need one or a few items, the shape is complex, customization is required, or no mold exists.</p>
                  <p><strong>It is NOT cheaper when:</strong> You need mass production, the shape is simple, or injection molding already exists.</p>
                  <p>For students, prototypes, and custom tools, 3D printing is the best choice.</p>
                </details>

                <details class="faq-item">
                  <summary>Is It Illegal to 3D Print Anything?</summary>
                  <p>3D printing itself is legal in Jordan. However, some items are not legal to print.</p>
                  <p><strong>You cannot legally print:</strong> Weapon parts, copyrighted designs (without permission), branded logos for resale, or restricted/dangerous items.</p>
                  <p>At Jordan 3D Print, we refuse any print that breaks the law or ethics.</p>
                </details>

                <details class="faq-item">
                  <summary>Is It Illegal to Sell 3D Printed Items?</summary>
                  <p>Selling 3D printed items is legal if you own the design or the design has a commercial license. Selling copyrighted designs without permission is illegal.</p>
                </details>

                <details class="faq-item">
                  <summary>Can I 3D Print Anything?</summary>
                  <p>Technically — almost anything. Legally — no. Also, some objects are too large, too thin, or not structurally printable. That's why professional review matters.</p>
                </details>

                <details class="faq-item">
                  <summary>Is It Possible to 3D Print a Person?</summary>
                  <p>You cannot print a living person, but you can print busts, face scans, medical models, and anatomical parts for education. These are widely used in medical and academic fields.</p>
                </details>

                <details class="faq-item">
                  <summary>Is Hiring a 3D Printing Service Worth It?</summary>
                  <p>If you are a student, engineer, business owner, or hobbyist, hiring Jordan 3D Print helps you save time, money, and avoid failed prints. With the right material and experience, 3D printing becomes a powerful manufacturing tool.</p>
                </details>

                <div style="text-align: center; margin-top: 24px;">
                  <a href="/faq-3d-printing-jordan" class="pill pill--ghost">View Full FAQ Page</a>
                  <a href="/print" class="pill pill--primary" style="margin-left: 8px;">Get a Quote Now</a>
                </div>
              </section>
            `;

            output += CONTACT_FORM;

            output += `
              <script src="/js/includes/lazyLoad.js"></script>
              <script type="text/javascript">
                var ll = new LazyLoad({
                  elements_selector: ".lazy",
                  callback_loaded: (el) => el.style.backgroundColor = 'white'
                });
              </script>
            `;

            resolve(output);
          });
        });
      });
    });
  });
};

module.exports = buildMainSection;
