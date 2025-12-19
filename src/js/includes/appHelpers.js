/*
  Helper functions for app.js
*/

const helpers = require('./helperFunctions.js');
const HTMLParser = require('node-html-parser');
// Lazily require heavy native deps to allow startup without build toolchain
let StlThumbnailer;
const randomstring = require('randomstring');
const validateEmail = require('email-validator');
const errorFormResponse = helpers.errorFormResponse;
const litDimensions = helpers.litDimensions;
const imgError = helpers.imgError;
const returnPageWithData = helpers.returnPageWithData;
const pageCouldNotLoad = helpers.pageCouldNotLoad;
const conn = require('../connectDb.js');
const resizeImg = require('resize-img');
const sendPrototype = require('../sendPrototype.js');
const userRegister = require('../registerLogic.js');
const path = require('path');
const mv = require('mv');
const fs = require('fs');
const constants = require('./constants.js');
const DEFAULT_CP_IMG = constants.defaultCpImg;
const basePath = constants.basePath;

function buildPage(req, res, conn, userID, buildFunc, htmlPath) {
  buildFunc(conn).then(data => {
    returnPageWithData(htmlPath, data, userID, res);
  }).catch(err => {
    console.log(err);
    pageCouldNotLoad(res, userID);
  });
}

function validateParams(formData) {
  // Validates prototype parameters
  if (!formData.email || !formData.name || !formData.tel || !formData.message) {
    return 'Please fill in all fields';
  } else if (!validateEmail.validate(formData.email)) {
    return 'Please provide a valid email address';
  } else {
    return 'success';
  }
}

function validateRegisterParams(formData) {
  // Validate params for user sign up
  if (!formData.email || !formData.pass || !formData.passConf) {
    return 'Please fill in all fields';
  } else if (!validateEmail.validate(formData.email)) {
    return 'Please provide a valid email address'
  } else if (formData.pass != formData.passConf) {
    return 'Passwords do not match';
  } else if (formData.pass.length < 6) {
    return 'Password must be at least 6 characters long';
  } else {
    return 'success';
  }
}

function toClientPrototype(res, stat, req, formData) {
  let responseData = {};
  if (stat != 'success') {
    errorFormResponse(res, stat);
  } else {
    sendPrototype(conn, formData, req).then(data => {
      // Auto log in user after successful registration
      responseData.success = 'Contact successful<br>We will get back to you with a detailed quote soon';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responseData));
    }).catch(err => {
      errorFormResponse(res, err);
    });
  }
}

function toClientRegister(res, stat, req, formData, userSession) {
  let responseData = {};
  if (stat != 'success') {
    errorFormResponse(res, stat);
  } else {
    userRegister(conn, formData, req).then(data => {
      // Auto log in user after successful registration
      userSession(req, res, function uSession() {
        req.user.id = data;
        responseData.success = '<p>register succsfully</p>';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
      });
    }).catch(err => {
      errorFormResponse(res, err);
    });
  }
}

function validatePcode(pcode) {
  // Validates a postal code
  if (!Number.isInteger(pcode) || pcode < 1000 || pcode > 9985) {
    return false;
  }
  return true;
}

function validateUploadFile(cFile, err) {
  if (err) {
    return ['sfupload', 'An error occurred during upload: ' + (err.message || err)];
  }
  if (!cFile) {
    return ['cFile', 'Choose a file'];
  }
  // Make sure that the number of files to be uploaded is between 1 and 5 (both inclusive)
  if (Array.isArray(cFile)) {
    if (cFile.length === 0) return ['cFile', 'Choose a file'];
    if (cFile.length > 5) return ['sfupload', 'You can upload a maximum of 5 files'];
  } else {
    if (!cFile.size) return ['cFile', 'Choose a file'];
  }
  return 'success';
}

function isAllImages(cFile) {
  // Check if only images are uploaded
  for (let i = 0; i < cFile.length; i++) {
    let sp = cFile[i].name.split('.');
    if (['png', 'jpg', 'jpeg'].indexOf(sp[sp.length - 1].toLowerCase()) < 0) {
      return false;
    }
  }
  return true;
}

function isMoreImages(cFile, allImgs) {
  if (cFile.length > 1 && allImgs) {
    return true;
  }
  return false;
}

function getFilePaths(extension, prefix, i) {
  // Return the path on the server where the file will be moved and the filename itself
  let timestamp = Number((Date.now() / 1000).toFixed(0)) % 1000;
  if (extension === 'stl') {
    var isLit = false;
    var uploadFileName = prefix + '_' + timestamp + '_' + i;
    var newpath = path.join(basePath(__dirname), 'printUploads', uploadFileName + '.stl');
  } else {
    var isLit = true;
    var uploadFileName = prefix + '_' + timestamp + '_lit_' + i;
    var newpath = path.join(basePath(__dirname), 'printUploads', 'lithophanes',
      uploadFileName + '.' + extension);
  }
  return [uploadFileName, newpath, isLit];
}

function createDefaultThumbnail(fname) {
  // Moves a default stock photo as the STL thumbnail to a permanent location
  return new Promise((resolve, reject) => {
    let source = DEFAULT_CP_IMG;
    let destination = path.join(basePath(__dirname), 'printUploads', 'thumbnails',
      fname + '.png');
    fs.copyFile(source, destination, (err) => {
      if (err) {
        reject('Error creating default thumbnail');
      }
      resolve('success');
    });
  });
}

function createThumbnail(fname) {
  // Creates a thumbnail from an STL file
  return new Promise((resolve, reject) => {
    // Load the thumbnailer only when needed; if unavailable, fall back to default image
    try {
      StlThumbnailer = StlThumbnailer || require('node-stl-to-thumbnail');
    } catch (e) {
      console.log('STL thumbnailer unavailable, using default thumbnail:', e && e.message ? e.message : e);
      createDefaultThumbnail(fname).then(() => resolve('success')).catch(reject);
      return;
    }

    try {
      let thumbnailer = new StlThumbnailer({
        filePath: path.join(basePath(__dirname), 'printUploads', fname + '.stl'),
        requestThumbnails: [
          {
            width: 500,
            height: 500
          }
        ]
      }).then(function (thumbnails) {
        if (!thumbnails || !thumbnails[0]) {
          return createDefaultThumbnail(fname).then(() => resolve('success')).catch(reject);
        }
        thumbnails[0].toBuffer(function (err, buf) {
          if (err) return reject('Error creating thumbnail buffer');
          fs.writeFile(path.join(basePath(__dirname), 'printUploads', 'thumbnails',
            fname + '.png'), buf, function (err) {
              if (err) reject('Error writing thumbnail file');
              resolve('success');
            });
        });
      }).catch(err => {
        console.error('Thumbnailer promise error:', err);
        createDefaultThumbnail(fname).then(() => resolve('success')).catch(reject);
      });
    } catch (err) {
      console.error('Thumbnailer sync error:', err);
      createDefaultThumbnail(fname).then(() => resolve('success')).catch(reject);
    }
  });
}

function resizeLitImage(newpath) {
  return new Promise((resolve, reject) => {
    let [width, height] = litDimensions(newpath);

    if (width <= 1920 && height <= 1920) {
      resolve('success');
    } else {
      // Set width and heigth of image; make sure the dimensions are within the range
      if (width > 1920 && height <= 1920) {
        var options = {
          width: 1920
        };
      } else if (width <= 1920 && height > 1920) {
        var options = {
          height: 1920
        };
      } else {
        var options = {
          width: 1920,
          height: Math.round(1920 * Math.min(width / height, height / width))
        };
      }

      // Resize img and write file
      (async () => {
        try {
          const image = await resizeImg(fs.readFileSync(newpath), options);
          fs.writeFileSync(newpath, image);
          resolve('success');
        } catch (e) {
          console.error('Error resizing image:', e);
          reject('Error resizing lithophane image');
        }
      })();
    }
  });
}

function parseUploadFiles(form, req, res, userID) {
  // Validate & upload files to server
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      let cFile = files['file[]'];
      let isError = validateUploadFile(cFile, err);
      if (isError != 'success') {
        imgError(res, userID, isError[0], isError[1]);
        reject(isError[0]);
        return;
      }

      if (!Array.isArray(cFile)) {
        cFile = [cFile];
      }

      let filePaths = [];
      let promises = [];
      let allImgs = isAllImages(cFile);
      let origFnames = {};

      // Make sure that only 1 image is uploaded
      if (isMoreImages(cFile, allImgs)) {
        imgError(res, userID, 'sfupload', 'You can only upload 1 image at a time');
        reject('You can only upload 1 image at a time');
        return;
      }

      let uploadFnames = [];
      for (let i = 0; i < cFile.length; i++) {
        if (!cFile[i]) continue;
        let oldpath = cFile[i].path;
        let splitted = (cFile[i].name || 'unknown.stl').split('.');
        let extension = splitted[splitted.length - 1].toLowerCase();
        let uploadFileSize = cFile[i].size;

        // Make sure the extension is valid
        if (['png', 'jpg', 'jpeg', 'stl'].indexOf(extension) < 0) {
          reject('Invalid file extension');
          return;
        }

        // If user is not logged in file prefix is 1 char random string, otherwise it's the uid
        let prefix = randomstring.generate(1);
        if (userID) prefix = userID;

        // Upload files to server
        var [uploadFileName, newpath, isLit] = getFilePaths(extension, prefix, i);

        uploadFnames.push(uploadFileName);
        origFnames[uploadFileName] = cFile[i].name;

        let move = new Promise((resolve, reject) => {
          if (!oldpath) return reject('No temporary file path found');
          mv(oldpath, newpath, err => {
            if (err) {
              console.log('Error moving file:', err);
              reject('Error transferring files');
              return;
            }

            // Create thumbnail from .stl file: used instead of a product image
            /*
              NOTE: since the stl thumbnailer cannot handle files bigger than 10-15MB large stl
              files do not get a thumbnail but a default low res img
            */
            if (extension === 'stl') {
              if (uploadFileSize > 10 * 1024 * 1024) {
                createDefaultThumbnail(uploadFileName).then(res => {
                  resolve('success');
                }).catch(err => {
                  console.log(err);
                  reject('Error creating default thumbnail');
                });
              } else {
                createThumbnail(uploadFileName).then(res => {
                  resolve('success');
                }).catch(err => {
                  reject('Error creating thumbnail');
                });
              }
            } else {
              // Resize image: max width and height is 1920
              // Calc the desired width and height while keeping the same aspect ratio
              resizeLitImage(newpath).then(res => {
                resolve('success');
              }).catch(err => {
                reject('Error resizing lithophane image');
              });
            }
          });
        });

        filePaths.push(newpath);
        promises.push(move);
      }
      resolve([promises, isLit, filePaths, filePaths[0], origFnames]);
    });
  });
}

function isProtectedFile(url) {
  if (url.includes(path.join('js', 'includes', 'constants.js')) ||
    url.includes(path.join('js', 'includes', 'sendEmail.js')) ||
    url.includes(path.join('js', 'includes', 'adminLogic.js')) ||
    url.includes(path.join('js', 'includes', 'createSession.js'))) {
    return true;
  }
  return false;
}

function setDynamicMeta(data, content) {
  let title = data[1];
  let description = data[2];
  let root = HTMLParser.parse(content);

  // Set title
  root.querySelector('title').childNodes[0].rawText = title;
  let descTag = root.querySelectorAll('meta')
    .filter(v => v.rawAttrs.includes('name="description"'));

  // Set description meta tag
  descTag[0].rawAttrs = `name="description" content="${description}"`;
  return root.toString();
}

function urlRedirect(host, res, pattern, redirect) {
  if (host == pattern || (pattern instanceof RegExp && host.match(pattern))) {
    console.log("Redirected " + host);
    res.writeHead(302, {
      'location': redirect
    });
    res.end();
  }
}

module.exports = {
  'validateParams': validateParams,
  'toClientPrototype': toClientPrototype,
  'validateRegisterParams': validateRegisterParams,
  'toClientRegister': toClientRegister,
  'validatePcode': validatePcode,
  'parseUploadFiles': parseUploadFiles,
  'setDynamicMeta': setDynamicMeta,
  'isProtectedFile': isProtectedFile,
  'urlRedirect': urlRedirect,
  'buildPage': buildPage
};
