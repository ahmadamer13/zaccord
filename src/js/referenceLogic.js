const constants = require('./includes/constants.js');
const REF_TRANSLATIONS = require('./includes/refTranslations.json');
const NUM_OF_COLS = constants.numOfCols;
const NUM_OF_IMGS = constants.numOfImgs;
const REF_BG = constants.refBg;
const REF_TRANSLATION_MAP = REF_TRANSLATIONS.reduce((map, entry) => {
  map[entry.id] = entry;
  return map;
}, {});

const formatShortDesc = (description) => {
  const sentences = description
    .split('.')
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length);
  if (sentences.length >= 2) {
    return `${sentences[0]}. ${sentences[1]}.`;
  }
  if (sentences.length === 1) {
    return `${sentences[0]}.`;
  }
  return description;
};

const buildReferencePage = (conn) => {
  return new Promise((resolve, reject) => {
    // First gather the photos from db
    let iQuery = "SELECT * FROM reference_images WHERE title <> 'Naked Female Body'";
    conn.query(iQuery, (err, result, fields) => {
      if (err) {
        reject('Problem during reference image fetch from database');
        return;
      }

      let content = `
        <section class="keepBottom">
          <div class="row">  
      `;

      let initial = 0;
      for (let i = 0; i < NUM_OF_COLS; i++) {
        content += '<div class="column">';
        if (initial + NUM_OF_IMGS > result.length) {
          var upperLimit = result.length;
        } else {
          var upperLimit = initial + NUM_OF_IMGS;
        }

        for (let j = initial; j < upperLimit; j++) {
          let id = result[j].id;
          let imgUrl = result[j].img_url;
          const translation = REF_TRANSLATION_MAP[id];
          let title = translation ? translation.title : result[j].title;
          let description = translation
            ? translation.description
            : result[j].description;
          let shortDesc = formatShortDesc(description);

          content += `
            <div class="refCont">
              <img data-src="/images/referenceImages/${imgUrl}"
                style="width: 100%; height: 100%" class="trans lazy"
                onclick="window.location.href = '/refImage?id=${id}'"
                src="${REF_BG}"
                >
              <a href="/images/referenceImages/${imgUrl}" download="${imgUrl}">
                <div class="refDownload trans">
                  <img src="/images/icons/download.png">
                </div>
              </a>
              <p class="gotham align font18" style="margin-bottom: 5px;">${title}</p>
              <p class="font14 ofref ddgray"
                style="width: 90%; margin: 0 auto; display: block;">
                ${shortDesc}
              </p>
            </div>
          `;
          if (j == upperLimit - 1) initial = upperLimit;
        }
        content += '</div>';
      }

      content += `
          </div>
        </section>
        <script src="/js/includes/lazyLoad.js"></script>
        <script type="text/javascript">
          var lload = new LazyLoad({
            elements_selector: ".lazy"
          });
        </script>
      `;

      resolve(content);
    });
  })
}

module.exports = buildReferencePage;
