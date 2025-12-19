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
                  <h1>World-class 3D printing — right here in Jordan</h1>
                  <p>Instant quotes, fast turnaround, and expert makers. PLA, PETG, ABS, and resin (SLA) with nationwide delivery.</p>
                  <p style="margin:6px 0 0;color:#475569;font-weight:700;">0.07 JD per gram · FDM & SLA · Fast delivery across Jordan</p>
                  <div class="hero__cta">
                    <a class="pill pill--primary" href="/print">Start a print</a>
                    <a class="pill" href="https://wa.me/962797479825?text=I%20am%20interested%20in%203D%20design%20service" target="_blank" rel="noreferrer">3D Design Service</a>
                    <a class="pill" href="/store">Store</a>
                    <a class="pill" href="https://wa.me/message/KQRSOE7ZSWJBK1" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
                    <a class="pill pill--ghost" href="/ar/" lang="ar" dir="rtl">الموقع بالعربية</a>
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
              <h2>Why choose us</h2>
              <p class="lead">Premium finishing, honest pricing, and attentive support from local makers.</p>
              <div class="grid">
                <div class="tile">
                  <h3>Refined finish</h3>
                  <p>High-quality tuning for smooth surfaces and durable parts.</p>
                </div>
                <div class="tile">
                  <h3>Trusted materials</h3>
                  <p>PLA, PETG, ABS, and resin (SLA) in stocked colors.</p>
                </div>
                <div class="tile">
                  <h3>Speed without compromise</h3>
                  <p>Flexible schedules to ship fast while keeping precision.</p>
                </div>
                <div class="tile">
                  <h3>Local support</h3>
                  <p>English and Arabic guidance to get the best result for your part.</p>
                </div>
              </div>
            </section>

            <section class="section">
              <h2>From file to finished part</h2>
              <div class="timeline">
                <div class="step">
                  <small>01</small>
                  <h4>Upload your STL</h4>
                  <p>See the per-gram price instantly with no wait.</p>
                </div>
                <div class="step">
                  <small>02</small>
                  <h4>Pick the material</h4>
                  <p>PLA for general use, PETG for strength, ABS or resin for detail.</p>
                </div>
                <div class="step">
                  <small>03</small>
                  <h4>We print and deliver</h4>
                  <p>Quality check, then fast delivery anywhere in Jordan.</p>
                </div>
              </div>
            </section>

            <section class="section">
              <h2>Materials & colors</h2>
              <p class="lead">Curated filaments and resin to balance strength, accuracy, and aesthetics.</p>
              <div class="materials">
                <div class="chip">PLA — Everyday & prototypes</div>
                <div class="chip">PETG — Tough & moisture resistant</div>
                <div class="chip">ABS — Strong & post-processable</div>
                <div class="chip">Resin (SLA) — Ultra-detailed</div>
                <div class="chip">Wide color range</div>
              </div>
            </section>

            <section class="section">
              <h2>Visit Us</h2>
              <p class="lead">Come say hello at our workshop in Amman.</p>
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
                <h2>FAQ</h2>
                <p class="lead">Quick answers to common questions.</p>
                <div class="grid">
                  <div class="tile">
                    <h3>How much does it cost?</h3>
                    <p>Starts at 0.07 JOD/gram. Price depends on weight and print time.</p>
                  </div>
                  <div class="tile">
                    <h3>What materials?</h3>
                    <p>PLA (economical), PETG (strong), ABS (heat resistant), and Resin (high detail).</p>
                  </div>
                  <div class="tile">
                    <h3>Do you deliver?</h3>
                    <p>Yes, we deliver to all governorates via trusted courier services.</p>
                  </div>
                  <div class="tile">
                    <h3>How to start?</h3>
                    <p>Upload your STL on the "Get a Quote" page or message us on WhatsApp.</p>
                  </div>
                </div>
                <div style="text-align: center; margin-top: 24px;">
                  <a href="/faq-3d-printing-jordan" class="pill pill--ghost">View all FAQs</a>
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
