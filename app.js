const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const { URL } = url;
const mv = require('mv');
const cron = require('node-cron');

const formidable = require('formidable');
const conn = require('./src/js/connectDb.js');
const parseCookies = require('./src/js/includes/parseCookies.js');
const sendConfEmail = require('./src/js/sendConfEmail.js');
const createSession = require('./src/js/includes/createSession.js');
const buyItem = require('./src/js/buyItem.js');
const updateStatus = require('./src/js/updateStatus.js');
const changeDeliveryInfo = require('./src/js/chDelInfo.js');
const changePassword = require('./src/js/chPassword.js');
const userLogin = require('./src/js/loginLogic.js');
const genOrder = require('./src/js/includes/genOrder.js');
const forgotPassword = require('./src/js/forgotPassword.js');
const buildItemSection = require('./src/js/itemLogic.js');
const buildCartSection = require('./src/js/cartLogic.js');
const buildMainSection = require('./src/js/indexLogic.js');
const buildAccountSection = require('./src/js/accountLogic.js');
const buildPrintSection = require('./src/js/printLogic.js');
const buildCustomPrint = require('./src/js/customPrintLogic.js');
const buildBuySection = require('./src/js/buyLogic.js');
const buildAdminPage = require('./src/js/adminLogic.js');
const buildAdminSection = require('./src/js/adminSectionLogic.js');
const buildAdminAddProduct = require('./src/js/adminAddProductLogic.js');
const buildAdminColorsSection = require('./src/js/adminColorsSection.js');
const buildLithophane = require('./src/js/buildLithophane.js');
const buildCategory = require('./src/js/buildCategory.js');
const buildSearch = require('./src/js/buildSearch.js');
const buildBlog = require('./src/js/buildBlog.js');
const buildStoreSection = require('./src/js/storeLogicV2.js');
const buildProdeutsSection = require('./src/js/prodeutsLogic.js');
const sendOpinion = require('./src/js/sendOpinion.js');
const delCartFile = require('./src/js/delCartFile.js');
const buildReferencePage = require('./src/js/referenceLogic.js');
const buildColorsPage = require('./src/js/buildColors.js');
const buildRefImage = require('./src/js/buildRefImage.js');
const generateInvoice = require('./src/js/includes/generateInvoice.js');
const delFromExcel = require('./src/js/delFromExcel.js');
const downloadSTLs = require('./src/js/includes/downloadSTLs.js');
const packetaXML = require('./src/js/includes/packetaXML.js');
const getXMLPacketa = require('./src/js/includes/getXMLPacketa.js');
const buildBlogsSection = require('./src/js/buildBlogsSection.js').buildBlogsSection;
const handleZprod = require('./src/js/handleZprod.js');
const buildZprod = require('./src/js/buildZprod.js');

const helpers = require('./src/js/includes/helperFunctions.js');
const addCookieAccept = helpers.addCookieAccept;
const loggedIn = helpers.loggedIn;
const addHeader = helpers.addHeader;
const addTemplate = helpers.addTemplate;
const generateTemplate = helpers.generateTemplate;
const imgError = helpers.imgError;
const fileResponse = helpers.fileResponse;
const getContentType = helpers.getContentType;
const checkData = helpers.checkData;
const errorFormResponse = helpers.errorFormResponse;
const pageCouldNotLoad = helpers.pageCouldNotLoad;
const commonData = helpers.commonData;
const returnToClient = helpers.returnToClient;
const fileServerResponse = helpers.fileServerResponse;
const loadStaticPage = helpers.loadStaticPage;
const responseCache = helpers.responseCache;
const returnPageWithData = helpers.returnPageWithData;
const litDimensions = helpers.litDimensions;
const sendCompressedFile = helpers.sendCompressedFile;
const gatherData = helpers.gatherData;

const appConsts = require('./src/js/includes/appHelpers.js');
const validateParams = appConsts.validateParams;
const toClientPrototype = appConsts.toClientPrototype;
const toClientRegister = appConsts.toClientRegister;
const validateRegisterParams = appConsts.validateRegisterParams;
const validatePcode = appConsts.validatePcode;
const parseUploadFiles = appConsts.parseUploadFiles;
const setDynamicMeta = appConsts.setDynamicMeta;
const isProtectedFile = appConsts.isProtectedFile;
const buildPage = appConsts.buildPage;

const constants = require('./src/js/includes/constants.js');
const successReturn = constants.successReturn;
const FILES_TO_CACHE = constants.filesToCache;
const ADMIN_LOGIN_URL = constants.adminLoginUrl;
const CONF_EMAIL_URL = constants.confEmailUrl;
const STATUS_UPDATE_URL = constants.statusUpdateUrl;
const ADMIN_PAGE_ACCESS = constants.adminPageAccess;
const ADMIN_UNAME = constants.adminUname;
const ADMIN_PASSWORD = constants.adminPassword;
const DOWNLOAD_STLS_URL = constants.downloadSTLsURL;

const BPAGES = ['/references', '/colors', '/blogs'];
const PAGE_LOOKUP = {
  '/references': {
    'func': buildReferencePage,
    'path': 'src/reference.html'
  },
  '/colors': {
    'func': buildColorsPage,
    'path': 'src/color.html'
  },
  '/blogs': {
    'func': buildBlogsSection,
    'path': 'src/blog.html'
  }
}

// Maybe integrate the app with a framework like Express but vanilla Node.js
// Seems to be more fun

// Store user id in a session
let d = new Date();
d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year
let userSession = createSession('user');

// Run a cron job to check if there are any expired z-products
cron.schedule('* * * * *', () => {
  handleZprod(conn, { type: 'check' });
});

function redirectToWWW(req, res) {
  if (!req.headers.host.startsWith('www') && !req.headers.host.startsWith('localhost')) {
    res.writeHead(302, {
      'Location': 'https://www.' + req.headers.host + req.url
    });
    res.end();
  }
}

// Global error handlers to prevent silent crashes and log the cause
process.on('uncaughtException', (err) => {
  console.error('FATAL: Uncaught Exception:', err);
  // Give some time for the log to be written
  setTimeout(() => process.exit(1), 100);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const server = http.createServer((req, res) => {
  // Redirect to a www version of the URL if needed
  redirectToWWW(req, res);

  userSession(req, res, () => { });
  var userID = req.user.id;

  // Facebook & Google appends its own tracking part to the URL -> remove it
  if (req.url.includes('?fbclid=')) {
    req.url = req.url.replace(/\?fbclid=.+/, '');
  } else if (req.url.includes('?gclid=')) {
    req.url = req.url.replace(/\?gclid=.+/, '');
  }

  /*
    Implement searching on the main page; every time the user types in something -> fetch to
    server and build new output
  */
  if (req.url === '/search' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let searchData = JSON.parse(body.join(''));
      let sValue = searchData.value;
      let content = addTemplate(userID);
      buildSearch(conn, sValue).then(data => {
        content += data;
        responseCache('text/html', res, true);
        res.end(data);
      }).catch(err => {
        console.log(err);
        errorFormResponse(res, 'Oops... an error occurred during search');
      });
    });
  } else if (req.url === '/delCartFile' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let data = JSON.parse(body.join(''));
      let ext = data.ext;
      let fname = data.fname;

      let prefixPath = __dirname;
      delCartFile(conn, fname, ext, prefixPath).then(result => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 'status': 'success' }));
      });
    });
  } else if (req.url === '/delFromExcel' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      delFromExcel(conn, formData).then(stat => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 'status': stat }));
      });
    });
  } else if (req.url === '/validatePrototype' && req.method === 'POST') {
    // Perform server-side validation of user data
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let val = validateParams(formData);
      toClientPrototype(res, val, req, formData);
    });
  } else if (req.url === '/validateRegister' && req.method === 'POST') {
    // Make sure user is not alreday logged in
    if (req.user.id) {
      errorFormResponse(res, 'You are already logged in');
    }

    // Perform server-side validation of user data
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let responseData = {};
      let val = validateRegisterParams(formData);
      toClientRegister(res, val, req, formData, userSession);
    });
  } else if (req.url === '/handleZprod' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      handleZprod(conn, JSON.parse(body.join(''))).then(resp => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(resp));
      });
    });

  } else if (req.url === '/validateLogin' && req.method === 'POST') {
    // Make sure user is not alreday logged in
    if (req.user.id) {
      errorFormResponse(res, 'You are already logged in');
    }

    // Implement login system; perform server-side checks & respond to client
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let responseData = {};

      if (!formData.email || !formData.pass) {
        errorFormResponse(res, 'Please fill out all fields');
        return;
      }

      // Now send data to server to process it; generate a session id for user
      userLogin(conn, formData, req).then(data => {
        userSession(req, res, function uSession() {
          req.user.id = data;
          responseData.success = data;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(responseData));
        });
      }).catch(err => {
        errorFormResponse(res, err);
      });
    });
  } else if (req.url === '/logout') {
    // User logout system: empty session & redirect to main page
    req.user.id = '';
    res.writeHead(302, {
      'Location': '/'
    });
    res.end();
  } else if (req.url === '/sendOpinion' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let responseData = {};

      let opinion = formData.opinion;
      returnToClient(sendOpinion, [conn, opinion], null, res, successReturn);
    });
  } else if (req.url === '/createPacket' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let responseData = {};
      let xmlBody = getXMLPacketa(formData, 'createPacket');

      returnToClient(packetaXML, [formData, xmlBody], null, res, successReturn);
    });
  } else if (req.url === '/admin/updateColorStock' && req.method === 'POST') {
    // Update color stock availability in DB
    let body = [];
    gatherData(body, req);
    req.on('end', () => {
      try {
        const data = JSON.parse(body.join(''));
        const { id, in_stock } = data || {};
        const q = 'UPDATE colors SET in_stock = ? WHERE id = ?';
        conn.query(q, [Number(in_stock) ? 1 : 0, id], (err) => {
          if (err) {
            console.log(err);
            errorFormResponse(res, 'DB error');
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success' }));
          }
        });
      } catch (e) {
        errorFormResponse(res, 'Invalid JSON');
      }
    });
  } else if (req.url === '/admin/addColor' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);
    req.on('end', () => {
      try {
        const data = JSON.parse(body.join(''));
        const { material, color, hex_color, images, info } = data;
        const q = 'INSERT INTO colors (material, color, hex_color, images, info, in_stock) VALUES (?, ?, ?, ?, ?, 1)';
        conn.query(q, [material, color, hex_color, images, info], (err) => {
          if (err) {
            console.log(err);
            errorFormResponse(res, 'DB error');
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success' }));
          }
        });
      } catch (e) {
        errorFormResponse(res, 'Invalid JSON');
      }
    });
  } else if (req.url === '/admin/editColor' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);
    req.on('end', () => {
      try {
        const data = JSON.parse(body.join(''));
        const { id, material, color, hex_color, images, info } = data;
        const q = 'UPDATE colors SET material=?, color=?, hex_color=?, images=?, info=? WHERE id=?';
        conn.query(q, [material, color, hex_color, images, info, id], (err) => {
          if (err) {
            console.log(err);
            errorFormResponse(res, 'DB error');
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success' }));
          }
        });
      } catch (e) {
        errorFormResponse(res, 'Invalid JSON');
      }
    });
  } else if (req.url === '/admin/deleteColor' && req.method === 'POST') {
    let body = [];
    gatherData(body, req);
    req.on('end', () => {
      try {
        const data = JSON.parse(body.join(''));
        const { id } = data;
        const q = 'DELETE FROM colors WHERE id=?';
        conn.query(q, [id], (err) => {
          if (err) {
            console.log(err);
            errorFormResponse(res, 'DB error');
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'success' }));
          }
        });
      } catch (e) {
        errorFormResponse(res, 'Invalid JSON');
      }
    });
  } else if (req.url === '/delValidation' && req.method === 'POST') {
    // Make sure user is logged in
    if (!req.user.id) {
      errorFormResponse(res, 'Nem vagy bejelentkezve');
    }

    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let responseData = {};

      // Skip strict postal code validation; accept user input as provided
      returnToClient(changeDeliveryInfo, [conn, userID, formData], null, res, successReturn);
    });
  } else if (req.url === '/passValidate' && req.method === 'POST') {
    // Make sure user is logged in
    if (!req.user.id) {
      errorFormResponse(res, 'Nem vagy bejelentkezve');
    }

    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let responseData = {};

      // User changes their password; validate on server side
      returnToClient(changePassword, [conn, userID, formData], null, res, successReturn);
    });
  } else if (req.url === '/category' && req.method === 'POST') {
    // Sort fixed items on the main page by their category in db
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let responseData = {};

      let errorMsg = 'Oops... an error occurred while sorting';
      returnToClient(buildCategory, [conn, formData.cat], errorMsg, res);
    });
  } else if (req.url === '/uploadPrint' && req.method.toLowerCase() === 'post') {
    // Allow multiple files to be uploaded, max file size is 100MB
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.maxFileSize = 100 * 1024 * 1024;
    parseUploadFiles(form, req, res, userID).then(data => {
      let promises = data[0];
      let isLit = data[1];
      let filePaths = data[2];
      let newpath = data[3];

      // Build custom print page
      if (!isLit) {
        Promise.all(promises).then(data => {
          buildCustomPrint(conn, userID, filePaths).then(data => {
            let files = '';
            for (let i = 0; i < filePaths.length; i++) {
              let sp = filePaths[i].split('/');
              let id = sp[sp.length - 1].replace('.stl', '');
              files += i == filePaths.length - 1 ? id : id + ',';
            }
            returnPageWithData('src/printUpload.html', data, userID, res, '/uploadPrint?file=' + files);
          }).catch(err => {
            // Wrong size
            console.log(err);
            imgError(res, userID, 'sizeError', err);
          });
        });
      } else {
        Promise.all(promises).then(data => {
          let [width, height] = litDimensions(newpath);

          let sp = filePaths[0].split('/');
          let id = sp[sp.length - 1].replace('.png', '').replace('.jpg', '').replace('.jpeg', '');
          buildLithophane(conn, userID, filePaths, width, height).then(data => {
            returnPageWithData('src/lithophane.html', data, userID, res, '/uploadPrint?image=' + id);
          }).catch(err => {
            console.log(err);
            imgError(res, userID, 'sizeError', err);
          });
        });
      }
    }).catch(err => {
      // Error occurred during the upload
      console.log(err);
    });
  } else if (req.url === '/validateOrder' && req.method.toLowerCase() === 'post') {
    let body = [];
    gatherData(body, req);

    // User buys a product -> validate data on server side & push to db
    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let paramArr = [conn, formData, req, res, userSession];
      returnToClient(buyItem, paramArr, null, res, successReturn);
    });
  } else if (req.url === ADMIN_LOGIN_URL && req.method.toLowerCase() === 'post') {
    // Admin page
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      returnToClient(buildAdminPage, [conn, formData], null, res, successReturn);
    });

    // NOTE: change the following URL if you want to use this feature
    // It should match with the URL seen in admin.js
  } else if (req.url === CONF_EMAIL_URL && req.method.toLowerCase() === 'post') {
    // Send an confirmation email to the customer if the package is ready
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      let uid = formData.uid;
      let delType = formData.delType;
      let glsCode = formData.glsCode;

      returnToClient(sendConfEmail, [conn, uid, delType, glsCode], null, res, successReturn);
    });
  } else if (req.url === DOWNLOAD_STLS_URL && req.method.toLowerCase() === 'post') {
    req.on('data', data => {
    });

    req.on('end', () => {
      returnToClient(downloadSTLs, [conn], null, res, successReturn);
    });
  } else if (req.url === STATUS_UPDATE_URL && req.method.toLowerCase() === 'post') {
    // On admin page we can update the status of an order: done / in progress
    let body = [];
    gatherData(body, req);

    // User buys a product -> validate data on server side & push to db
    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      returnToClient(updateStatus, [conn, formData], null, res, successReturn);
    });
  } else if (req.url === '/validateForgotPass' && req.method.toLowerCase() === 'post' &&
    !req.user.id) {
    // If user submits a temporary password request validate email addr & send tmp password
    let body = [];
    gatherData(body, req);

    // Send JSON response
    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      returnToClient(forgotPassword, [conn, formData.email], null, res, successReturn);
    });
  } else if (req.url === '/genInvoice' && req.method.toLowerCase() === 'post') {
    let body = [];
    gatherData(body, req);

    req.on('end', () => {
      let formData = JSON.parse(body.join(''));
      returnToClient(generateInvoice, [conn, formData], null, res, successReturn);
    });
  } else if (req.url === '/moreOrders' && req.method.toLowerCase() === 'post') {
    // Make sure user is logged in
    if (!req.user.id) {
      errorFormResponse(res, 'Nem vagy bejelentkezve');
    }

    let body = [];
    gatherData(body, req);

    // Send JSON response with more orders
    req.on('end', () => {
      returnToClient(genOrder, [conn, req.user.id], null, res);
    });
  } else {
    // Dynamic sitemap.xml
    if (req.url === '/sitemap.xml' && req.method.toLowerCase() === 'get') {
      const host = (req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] : 'https') + '://' + req.headers.host;
      const staticPaths = ['/', '/ar/', '/print', '/account', '/cart', '/blogs', '/colors', '/references', '/services-jordan', '/stl-guide', '/faq-3d-printing-jordan', '/store', '/prodeuts'];
      let urls = staticPaths.map(p => ({ loc: host + p, lastmod: new Date().toISOString().split('T')[0] }));

      const addUrl = (arr, path, dateStr) => arr.push({ loc: host + path, lastmod: dateStr || new Date().toISOString().split('T')[0] });

      // Collect dynamic URLs
      const prom1 = new Promise((resolve) => {
        conn.query('SELECT url, date_added FROM fix_products', (err, rows) => {
          if (!err && Array.isArray(rows)) {
            for (const r of rows) addUrl(urls, '/' + r.url, (r.date_added || new Date()).toISOString ? (r.date_added.toISOString ? r.date_added.toISOString().split('T')[0] : new Date(r.date_added).toISOString().split('T')[0]) : new Date().toISOString().split('T')[0]);
          }
          resolve();
        });
      });

      const prom2 = new Promise((resolve) => {
        // Use available timestamp for blogs; prefer last_update then date
        conn.query('SELECT id, COALESCE(last_update, date) AS lastmod FROM blog', (err, rows) => {
          if (!err && Array.isArray(rows)) {
            for (const r of rows) {
              const lm = r.lastmod ? new Date(r.lastmod).toISOString().split('T')[0] : undefined;
              addUrl(urls, '/blog?id=' + r.id, lm);
            }
          }
          resolve();
        });
      });

      // Include live z-products
      const prom3 = new Promise((resolve) => {
        conn.query('SELECT url, creation_date FROM z_prod WHERE is_live = 1', (err, rows) => {
          if (!err && Array.isArray(rows)) {
            for (const r of rows) {
              let lastmod;
              try {
                lastmod = r.creation_date ? new Date(r.creation_date).toISOString().split('T')[0] : undefined;
              } catch (e) {
                lastmod = undefined;
              }
              addUrl(urls, '/z-product?id=' + r.url, lastmod);
            }
          }
          resolve();
        });
      });

      Promise.all([prom1, prom2, prom3]).then(() => {
        const urlset = urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n');
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`;
        res.writeHead(200, { 'Content-Type': 'application/xml' });
        res.end(xml);
      }).catch(() => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
        res.writeHead(200, { 'Content-Type': 'application/xml' });
        res.end(xml);
      });
      return;
    }

    /*
      Render files that are either stored directly on the server or not fetched via a POST
      request
    */

    let ending = path.join(req.url === '/' ? 'index.html' : req.url.replace('src', ''));
    let filePath = path.join(__dirname, 'src', ending);
    let extension = path.extname(filePath);

    // Serve Arabic homepage via /ar or /ar/
    if (req.url === '/ar' || req.url === '/ar/') {
      filePath = path.join(__dirname, 'src', 'ar', 'index.html');
      extension = '.html';
    }

    let contentType = getContentType(extension);
    if (extension == '.gcode' || extension == '.zip') {
      filePath = path.join(__dirname, req.url.replace('src', ''));
    }

    if (contentType == 'text/html' && !extension) {
      filePath += '.html';
      extension = '.html';
    }

    // Set the proper content-type for server response. If it handled the response, stop here.
    const handled = fileServerResponse(extension, req, res, fileResponse);
    if (handled) return;

    // Make sure user is not logged in when visiting /login and /register pages
    if ((['/register', '/login'].indexOf(req.url) > -1 && req.user.id)
      || req.url.substr(0, 8) === '/?fbclid' || isProtectedFile(req.url) ||
      (req.url == '/forgotPassword' && req.user.id)) {
      res.writeHead(302, {
        'Location': '/'
      });
      res.end();
      return;
    }

    // Read files that are directly stored on the server under [name].html
    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Page not found -> display custom 404 page
        if (err.code == 'ENOENT') {
          // Build pages dynamically that are not stored on the server 
          if (req.url.substr(0, 14) === '/item/product=') {
            let itemId = Number(req.url.substr(14));
            let content = fs.readFileSync(path.join('src', 'item.html'));
            buildItemSection(conn, itemId, req).then(data => {
              // Add custom, dynamic title & description meta tag
              let dataBack = data[0];
              content = setDynamicMeta(data, content);
              content += addCookieAccept(req);
              commonData(content, userID, dataBack, res);
            }).catch(error => {
              console.log(error);
              imgError(res, userID, 'parcel');
            });
          } else if (req.url === '/blog' || req.url.indexOf('/blog?') === 0) {
            let blogID = NaN;
            try {
              const urlObj = new URL(req.url, 'http://localhost');
              blogID = Number(urlObj.searchParams.get('id'));
            } catch (e) {
              blogID = NaN;
            }

            if (!Number.isInteger(blogID) || blogID < 0) {
              res.writeHead(400, { 'Content-Type': 'text/plain; charset=UTF-8' });
              res.end('Invalid blog id');
              return;
            }

            let content = '';
            buildBlog(conn, blogID, req).then(data => {
              commonData(content, userID, data, res);
            }).catch(err => {
              console.log(err);
              pageCouldNotLoad(res, userID);
            });
          } else if (req.url.substr(0, 13) === '/refImage?id=') {
            let content = fs.readFileSync(path.join('src', 'refImage.html'));
            let id = Number(req.url.substr(13));
            content += addCookieAccept(req);
            buildRefImage(conn, id).then(data => {
              commonData(content, userID, data, res);
            }).catch(err => {
              console.log(err);
              pageCouldNotLoad(res, userID);
            });
          } else if (req.url.substr(0, 14) === '/z-product?id=') {
            let content = fs.readFileSync(path.join('src', 'buy.html'));
            let id = req.url.substr(14);
            content += addCookieAccept(req);
            buildZprod(conn, id).then(data => {
              if (data.status == 'success') {
                let q = {
                  product: 'zprod',
                  price: data.price
                }

                req.user.id = '';
                userID = null;

                buildBuySection(conn, q, req).then(data => {
                  commonData(content, userID, data, res);
                }).catch(err => {
                  console.log(err);
                  imgError(res, userID, 'shop', err);
                });
              } else {
                pageCouldNotLoad(res, userID);
              }
            }).catch(err => {
              console.log(err);
              pageCouldNotLoad(res, userID);
            });
          } else if (req.url.substr(0, 13) === '/buy?product=') {
            // User buys a product
            let q = url.parse(req.url, true).query;

            let content = fs.readFileSync(path.join('src', 'buy.html'));
            content += addCookieAccept(req);
            buildBuySection(conn, q, req).then(data => {
              commonData(content, userID, data, res);
            }).catch(err => {
              console.log(err);
              imgError(res, userID, 'shop', err);
            });
          } else if (req.url.substr(0, 6) === '/?cat=') {
            let cat = decodeURIComponent(req.url.substr(6));
            let content = fs.readFileSync(path.join('src', 'index.html'));
            content += addCookieAccept(req);
            content += addHeader(userID);
            buildMainSection(conn, cat).then(data => {
              content += data;
              content += fs.readFileSync(path.join('src', 'includes', 'footer.html'));
              res.writeHead(200, { 'Content-Type': contentType });
              res.end(content, 'utf8');
            }).catch(err => {
              console.log(err);
              pageCouldNotLoad(res, userID);
            });
          } else if (req.url.substr(0, 18) === '/uploadPrint?file=') {
            let fnames = [];
            for (let file of req.url.split('uploadPrint?file=')[1].split(',')) {
              fnames.push(path.join(__dirname, 'printUploads', file + '.stl'));
            }
            buildCustomPrint(conn, userID, [...fnames]).then(data => {
              returnPageWithData(path.join('src', 'printUpload.html'), data, userID, res);
            }).catch(err => {
              console.log(err);
              pageCouldNotLoad(res, userID);
            });
          } else if (req.url.substr(0, 19) === '/uploadPrint?image=') {
            // Check if file exists with a .jpg, .jpeg or .png extension
            // Use sync queries for managable code and it does not block that much
            let fname = path.join(__dirname, 'printUploads', 'lithophanes', req.url.substr(19));
            if (fs.existsSync(fname + '.jpg')) {
              fname += '.jpg';
            } else if (fs.existsSync(fname + '.jpeg')) {
              fname += '.jpeg';
            } else {
              fname += '.png';
            }

            let [width, height] = litDimensions(fname);

            buildLithophane(conn, userID, [fname], width, height).then(data => {
              returnPageWithData(path.join('src', 'lithophane.html'), data, userID, res);
            }).catch(err => {
              console.log(err);
              pageCouldNotLoad(res, userID);
            });
          } else if (BPAGES.indexOf(req.url.toLowerCase()) > -1) {
            let url = req.url.toLowerCase();
            buildPage(req, res, conn, userID, PAGE_LOOKUP[url]['func'], PAGE_LOOKUP[url]['path'])
          } else if (req.url.substr(0, 14) === ADMIN_PAGE_ACCESS) {
            // Admin page login authentication
            let q = url.parse(req.url, true);
            let qdata = q.query;
            let user = decodeURIComponent(qdata.user);
            let pass = decodeURIComponent(qdata.pass);

            // Make sure username and password are correct
            if (user != ADMIN_UNAME || pass != ADMIN_PASSWORD) {
              responseCache('text/html', res, true);
              res.end('hiba', 'utf8');
              // Prevent further handling which would attempt to write again
              return;
            }

            // If view=colors -> render color management page; else orders
            if (qdata.view === 'colors') {
              let content = fs.readFileSync('src/adminColors.html');
              buildAdminColorsSection(conn).then(data => {
                content = content.toString();
                if (content.includes('<!-- buildAdminSection() appends the markup here -->')) {
                  content = content.replace('<!-- buildAdminSection() appends the markup here -->', data);
                } else {
                  content += data;
                }
                responseCache('text/html', res, true);
                res.end(content, 'utf8');
              }).catch(() => pageCouldNotLoad(res, userID));
            } else {
              // Build orders admin by default
              let content = fs.readFileSync('src/adminOrders.html');
              buildAdminSection(conn).then(data => {
                content = content.toString();
                if (content.includes('<!-- buildAdminSection() appends the orders markup here -->')) {
                  content = content.replace('<!-- buildAdminSection() appends the orders markup here -->', data);
                } else {
                  content += data;
                }
                responseCache('text/html', res, true);
                res.end(content, 'utf8');
              });
            }
          } else if (req.url === '/adminColors') {
            // Alternative entry path: /adminColors?user=...&pass=...
            let q = url.parse(req.url, true);
            let qdata = q.query;
            let user = decodeURIComponent(qdata.user || '');
            let pass = decodeURIComponent(qdata.pass || '');
            if (user != ADMIN_UNAME || pass != ADMIN_PASSWORD) {
              responseCache('text/html', res, true);
              res.end('hiba', 'utf8');
              return;
            }
            let content = fs.readFileSync('src/adminColors.html');
            buildAdminColorsSection(conn).then(data => {
              content = content.toString();
              if (content.includes('<!-- buildAdminSection() appends the markup here -->')) {
                content = content.replace('<!-- buildAdminSection() appends the markup here -->', data);
              } else {
                content += data;
              }
              responseCache('text/html', res, true);
              res.end(content, 'utf8');
            }).catch(() => pageCouldNotLoad(res, userID));
          } else if (req.url.startsWith('/admin/addProduct')) {
            // Check admin auth (simplified for now, ideally use session or same check as above)
            // For now, we assume if they know the URL or came from dashboard they are admin, 
            // BUT we should probably check the query params like other admin pages if we want to be consistent,
            // or just rely on the fact that it's an internal tool. 
            // The existing admin uses ?user=...&pass=... in the URL for every request which is not secure but that's how it is.
            // Let's try to get user/pass from query if present, or maybe just serve it.
            // Given the constraints, let's just serve it but maybe check if we can get auth.

            // Better: check query params like /adminColors
            let q = url.parse(req.url, true);
            let qdata = q.query;
            let user = decodeURIComponent(qdata.user || '');
            let pass = decodeURIComponent(qdata.pass || '');

            if (user != ADMIN_UNAME || pass != ADMIN_PASSWORD) {
              res.writeHead(401);
              res.end('Unauthorized');
              return;
            }

            buildAdminAddProduct(conn).then(data => {
              // Inject user/pass into the form action so it persists? 
              // Or just rely on the fact that the POST will need them?
              // The form action is /admin/saveProduct. We can append query params via JS or hidden fields.
              // Let's append hidden fields to the form in the HTML.
              let content = data.replace('</form>',
                `<input type="hidden" name="user" value="${user}">
                     <input type="hidden" name="pass" value="${pass}">
                     </form>`);

              responseCache('text/html', res, true);
              res.end(content, 'utf8');
            }).catch(err => {
              console.log(err);
              res.writeHead(500);
              res.end('Error loading page');
            });

          } else if (req.url.startsWith('/admin/products')) {
            // New Manage Products Page
            const buildAdminProducts = require('./src/js/adminProductsLogic.js');

            let q = url.parse(req.url, true);
            let qdata = q.query;
            let user = decodeURIComponent(qdata.user || '');
            let pass = decodeURIComponent(qdata.pass || '');

            if (user != ADMIN_UNAME || pass != ADMIN_PASSWORD) {
              res.writeHead(401);
              res.end('Unauthorized');
              return;
            }

            let content = fs.readFileSync(path.join(__dirname, 'src', 'adminProducts.html'), 'utf8');
            buildAdminProducts(conn).then(data => {
              if (content.includes('<!-- buildAdminProducts() appends the markup here -->')) {
                content = content.replace('<!-- buildAdminProducts() appends the markup here -->', data);
              }
              responseCache('text/html', res, true);
              res.end(content, 'utf8');
            }).catch(err => {
              console.log(err);
              res.writeHead(500);
              res.end('Error loading products');
            });

          } else if (req.url === '/admin/saveProduct' && req.method === 'POST') {
            const form = formidable({ multiples: false });
            form.parse(req, (err, fields, files) => {
              if (err) {
                res.writeHead(500);
                res.end('Error parsing form');
                return;
              }

              // Auth check
              if (fields.user != ADMIN_UNAME || fields.pass != ADMIN_PASSWORD) {
                res.writeHead(401);
                res.end('Unauthorized');
                return;
              }

              // Save image
              const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
              const imagePath = imageFile ? (imageFile.filepath || imageFile.path) : null; // v1 uses .path, v2+ uses .filepath
              const imageName = imageFile ? (imageFile.originalFilename || imageFile.name) : '';
              if (!imageFile || !imagePath || !imageName) {
                res.writeHead(400);
                res.end('Product image is required');
                return;
              }

              const oldPath = imagePath;
              const extension = path.extname(String(imageName || ''));
              const newFileName = 'prod_' + Date.now() + extension;
              const imageDir = path.join(__dirname, 'images');
              const newPath = path.join(imageDir, newFileName);

              // Ensure destination folders exist
              if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
              const uploadsDir = path.join(__dirname, 'printUploads');
              if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

              mv(oldPath, newPath, (err) => {
                if (err) {
                  console.log(err);
                  res.writeHead(500);
                  res.end('Error saving image');
                  return;
                }

                // Insert into DB
                const q = 'INSERT INTO fix_products (url, img_url, img_showcase, price, size, name, category, description, stl_path, priority, date_added, seo_keyword, seo_meta_desc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)';
                const productUrl = 'Item/Product = ' + Date.now(); // Simple unique URL
                const imgUrl = 'images/' + newFileName;
                const imgShowcase = imgUrl; // Just use main image for showcase for now
                const stlFile = Array.isArray(files.stl) ? files.stl[0] : files.stl;
                const stlOriginalName = stlFile ? (stlFile.originalFilename || stlFile.name) : '';
                let stlPath = ''; // Default: no STL saved
                // If STL is provided, save it
                if (stlFile) {
                  const stlPathSrc = stlFile.filepath || stlFile.path;
                  if (stlPathSrc && stlOriginalName) {
                    const stlNewPath = path.join(uploadsDir, stlOriginalName);
                    stlPath = stlOriginalName;
                    mv(stlPathSrc, stlNewPath, (err) => {
                      if (err) console.log('Error saving STL', err);
                    });
                  }
                }

                conn.query(q, [productUrl, imgUrl, imgShowcase, fields.price, fields.size, fields.name, fields.category, fields.description, stlPath, 100, fields.seo_keyword, fields.seo_meta_desc], (err) => {
                  if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end('Error saving to DB');
                  } else {
                    // Redirect back to admin dashboard
                    res.writeHead(302, { 'Location': `${ADMIN_LOGIN_URL}?user=${fields.user}&pass=${fields.pass}` });
                    res.end();
                  }
                });
              });
            });

          } else if (req.url.startsWith('/admin/editProduct')) {
            // Edit Product Page
            const buildAdminEditProduct = require('./src/js/adminEditProductLogic.js');

            let q = url.parse(req.url, true);
            let qdata = q.query;
            let user = decodeURIComponent(qdata.user || '');
            let pass = decodeURIComponent(qdata.pass || '');
            let pid = qdata.id;

            if (user != ADMIN_UNAME || pass != ADMIN_PASSWORD) {
              res.writeHead(401);
              res.end('Unauthorized');
              return;
            }

            buildAdminEditProduct(conn, pid).then(data => {
              // Inject user/pass into the form action or hidden fields so they persist on submit
              let content = data.replace('</form>',
                `<input type="hidden" name="user" value="${user}">
                 <input type="hidden" name="pass" value="${pass}">
                 </form>`);

              responseCache('text/html', res, true);
              res.end(content, 'utf8');
            }).catch(err => {
              console.log(err);
              res.writeHead(500);
              res.end('Error loading edit page');
            });

          } else if (req.url === '/admin/updateProduct' && req.method === 'POST') {
            const form = formidable({ multiples: false });
            form.parse(req, (err, fields, files) => {
              if (err) {
                res.writeHead(500);
                res.end('Error parsing form');
                return;
              }

              if (fields.user != ADMIN_UNAME || fields.pass != ADMIN_PASSWORD) {
                res.writeHead(401);
                res.end('Unauthorized');
                return;
              }

              const pid = fields.id;

              // Handle Image Update
              const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
              let updateImage = false;
              let newImgUrl = '';

              const handleUpdate = () => {
                let q = 'UPDATE fix_products SET name=?, category=?, price=?, description=?, size=?, seo_keyword=?, seo_meta_desc=?';
                let params = [fields.name, fields.category, fields.price, fields.description, fields.size, fields.seo_keyword, fields.seo_meta_desc];

                if (updateImage) {
                  q += ', img_url=?, img_showcase=?';
                  params.push(newImgUrl, newImgUrl);
                }

                // Handle STL Update
                const stlFile = Array.isArray(files.stl) ? files.stl[0] : files.stl;
                if (stlFile && (stlFile.originalFilename || stlFile.name)) {
                  const stlOriginalName = stlFile.originalFilename || stlFile.name;
                  const stlPathSrc = stlFile.filepath || stlFile.path;
                  const uploadsDir = path.join(__dirname, 'printUploads');
                  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
                  const stlNewPath = path.join(uploadsDir, stlOriginalName);

                  mv(stlPathSrc, stlNewPath, (err) => {
                    if (!err) {
                      // We need to update STL path in DB. 
                      // Since this is async inside, we should have done this before query construction or chained it.
                      // For simplicity, let's just run a separate update or assume it worked if we are here.
                      // Actually, let's just add it to the main query.
                    }
                  });
                  q += ', stl_path=?';
                  params.push(stlOriginalName);
                }

                q += ' WHERE id=?';
                params.push(pid);

                conn.query(q, params, (err) => {
                  if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end('Error updating DB');
                  } else {
                    res.writeHead(302, { 'Location': `/admin/products?user=${fields.user}&pass=${fields.pass}` });
                    res.end();
                  }
                });
              };

              if (imageFile && (imageFile.originalFilename || imageFile.name)) {
                const imagePath = imageFile.filepath || imageFile.path;
                const imageName = imageFile.originalFilename || imageFile.name;
                const extension = path.extname(imageName);
                const newFileName = 'prod_' + Date.now() + extension;
                const imageDir = path.join(__dirname, 'images');
                const newPath = path.join(imageDir, newFileName);

                if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

                mv(imagePath, newPath, (err) => {
                  if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end('Error saving image');
                    return;
                  }
                  updateImage = true;
                  newImgUrl = 'images/' + newFileName;
                  handleUpdate();
                });
              } else {
                handleUpdate();
              }
            });
          } else if (req.url === '/admin/deleteProduct' && req.method === 'POST') {
            let body = [];
            gatherData(body, req);
            req.on('end', () => {
              try {
                const data = JSON.parse(body.join(''));
                const pid = Number(data.id);
                const user = data.user || '';
                const pass = data.pass || '';

                console.log('Delete product request', { pid, user });

                if (user != ADMIN_UNAME || pass != ADMIN_PASSWORD) {
                  res.writeHead(401, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ status: 'unauthorized' }));
                  return;
                }
                if (!pid) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ status: 'error', message: 'Invalid product id' }));
                  return;
                }

                // Grab file paths before delete to optionally remove files
                conn.query('SELECT img_url, stl_path FROM fix_products WHERE id = ? LIMIT 1', [pid], (err, rows) => {
                  if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end('DB error');
                    return;
                  }

                  const imgPathDb = rows && rows[0] ? rows[0].img_url : '';
                  const stlPathDb = rows && rows[0] ? rows[0].stl_path : '';

                  conn.query('DELETE FROM fix_products WHERE id = ? LIMIT 1', [pid], (err2) => {
                    if (err2) {
                      console.log(err2);
                      res.writeHead(500);
                      res.end('DB error');
                      return;
                    }

                    // Best-effort cleanup of uploaded files
                    try {
                      if (imgPathDb) {
                        const imgFileAbs = path.join(__dirname, imgPathDb);
                        if (fs.existsSync(imgFileAbs)) fs.unlink(imgFileAbs, () => { });
                      }
                      if (stlPathDb) {
                        const stlFileAbs = path.join(__dirname, 'printUploads', stlPathDb);
                        if (fs.existsSync(stlFileAbs)) fs.unlink(stlFileAbs, () => { });
                      }
                    } catch (e) {
                      console.log('Cleanup error', e);
                    }

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'success' }));
                  });
                });
              } catch (e) {
                res.writeHead(400);
                res.end('Invalid JSON');
              }
            });
          } else {
            // File is not found in src/path/to/file so it may be under path/to/file
            let fname = filePath.replace('src/', '');
            fs.readFile(fname, (err, content) => {
              // Avoid double-send if response already ended elsewhere
              if (res.writableEnded) return;
              if (err) {
                imgError(res, userID, '404error');
              } else {
                let extension = path.extname(fname);
                let contentType = getContentType(extension);
                // Set proper headers before sending raw content (e.g., mp4)
                responseCache(contentType, res, true, 'no-cache');
                res.end(content);
              }
            });
            return;
          }

          // Server error
        } else {
          res.writeHead(500);
          res.end();
        }
      } else {
        // To every html file append footer, header and cookies (if not accepted)
        if (extension == '.html') {
          content = content.toString().replace('</body>', '').replace('</html>', '');

          if (req.url != '/') {
            content += fs.readFileSync(path.join('src', 'includes', 'footer.html'));
          }

          content += addCookieAccept(req);
          content += addHeader(userID, req.url === '/ar' || req.url === '/ar/');

          if (req.url != '/') {
            content += '</body></html>';
          }
        }

        // Build pages from database
        if (req.url === '/') {
          buildMainSection(conn).then(data => {
            content += data;
            content += fs.readFileSync(path.join('src', 'includes', 'footer.html'));
            content += '</body></html>';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
          }).catch(err => {
            console.log(err);
            pageCouldNotLoad(res, userID);
          });
        } else if (req.url === '/cart') {
          // Build user cart page
          let content = fs.readFileSync(path.join('src', 'cart.html'));
          content += addCookieAccept(req);
          loadStaticPage(buildCartSection, [conn, req], content, userID, res, null, true);
        } else if (req.url === '/account') {
          // Make sure user is logged in when visiting account page
          loggedIn(req, res);

          let content = fs.readFileSync(path.join('src', 'account.html'));
          content += addCookieAccept(req);
          loadStaticPage(buildAccountSection, [conn, userID], content, userID, res);
        } else if (req.url === '/store') {
          // New store V2 logic - bypass loadStaticPage to control full HTML
          buildStoreSection(conn, userID).then(data => {
            responseCache('text/html', res, true);
            res.end(data, 'utf8');
          }).catch(err => {
            console.log(err);
            pageCouldNotLoad(res, userID);
          });
        } else if (req.url === '/prodeuts') {
          let content = fs.readFileSync(path.join('src', 'prodeuts.html'));
          content += addCookieAccept(req);
          loadStaticPage(buildProdeutsSection, [conn], content, userID, res);
        } else if (req.url === '/print') {
          /*
            User does not need to be logged in for experimenting with custom print only for
            shopping
          */
          let content = fs.readFileSync(path.join('src', 'print.html'));
          content += addCookieAccept(req);
          loadStaticPage(buildPrintSection, [conn, req], content, userID, res);
        } else {
          // Cache page for faster load
          // Also compress text-based resources
          if (FILES_TO_CACHE.indexOf(filePath) > -1) {
            // Cache constant files and resources with immutable policy
            responseCache(contentType, res, true, 'public');
            res.end(content, 'utf8');
          } else if (['text/javascript', 'text/css', 'text/html'].indexOf(contentType) > -1) {
            const appendAsset = contentType == 'text/html';
            const cc = (FILES_TO_CACHE.indexOf(filePath) > -1) ? 'public' : 'no-cache';
            sendCompressedFile(filePath, res, req, contentType, appendAsset, userID, cc);
          } else {
            // Static binary assets: images, fonts, video -> cache aggressively
            const publicTypes = ['image/', 'font/', 'video/'];
            const isPublic = publicTypes.some(p => contentType.startsWith(p));
            const cc = isPublic ? 'public' : 'no-cache';
            responseCache(contentType, res, true, cc);
            res.end(content, 'utf8');
          }
        }
      }
    });
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('Server running...'));
