const util = require('util');
const constants = require('./includes/constants.js');
const LAZY_LOAD = constants.lazyLoad;
const blogTranslations = require('./includes/blogTranslations.js');
const blogTranslationsAr = require('./includes/blogTranslationsAr.js');

function applyTranslations(blog, lang = 'en') {
  const translations = lang === 'ar' ? blogTranslationsAr : blogTranslations;
  const t = translations[blog.id];

  // If no translation found, return original blog (which might be in the target language already if from DB)
  if (!t) return blog;

  return {
    ...blog,
    title: t.title || blog.title,
    categories: t.categories || blog.categories,
    summary: t.summary || blog.summary,
    img_url: t.img_url || blog.img_url
  };
}

function buildBlogItem(currentBlog, lang = 'en') {
  currentBlog = applyTranslations(currentBlog, lang);
  let id = currentBlog.id;
  let title = currentBlog.title;
  let categories = currentBlog.categories.split(',').map(e => e.trim()).join(', ');
  let summary = currentBlog.summary;
  let imgUrl = currentBlog.img_url;
  let bgUrl = /^https?:\/\//i.test(imgUrl) ? imgUrl : `/images/blog/${imgUrl}`;
  let date = currentBlog.date.split(' ')[0];
  let isAr = lang === 'ar';

  // Check if title is Arabic to set direction for individual card if needed, 
  // but usually we follow the page language.
  // However, if we have mixed content, we might want to detect.
  // For now, let's rely on the page language `lang` for UI elements (Read more button),
  // and content direction based on content.
  let isContentAr = /^[\u0600-\u06FF]/.test(title);
  let dir = isContentAr ? 'rtl' : 'ltr';

  return `
    <div class="blogCont trans" dir="${dir}">
      <div class="upperImg bgCommon lazy" data-bg="${bgUrl}"
       style="background-color: rgb(53, 54, 58);">
        <div class="darken"></div>
        <h2 class="blogTitle fontNorm gotham font20">${title}</h2>
        <p class="gothamNormal font14">${date}</p>
      </div>
      <div class="middleSummary">
        <p class="gothamNormal maz">${summary}</p>
        <br>
        <p class="gotham maz catLines">
          <span>${isAr ? 'التصنيفات:' : 'Categories:'}</span> ${categories}
        </p>
      </div>
      <div class="lowerReadMore">
        <hr class="hrStyle">
        <a href="${isAr ? '/ar' : ''}/blog?id=${id}">
          <button class="fillBtn btnCommon">${isAr ? 'اقرأ المزيد' : 'Read more'}</button>
        </a>
      </div>
    </div>
  `;
}

async function buildBlogsSection(conn, lang = 'en') {
  // Promisify conn.query so that it can be used with an async/await function
  const query = util.promisify(conn.query).bind(conn);

  let content = `
    <section class="keepBottom lh ofv">
      <div class="flexDiv flexWrap flSpAr">
  `;

  let res = await query('SELECT * FROM blog');

  // Sort: Arabic blogs first if lang is 'ar', else English/others first?
  // Or just by date/ID?
  // Let's keep default sort for now, or maybe reverse ID to show newest first.
  // The DB query doesn't specify order, so it's arbitrary (usually insertion order).
  // Let's sort by ID descending to show newest first.
  let blogs = Array.from(res).sort((a, b) => b.id - a.id);

  for (let currentBlog of blogs) {
    content += buildBlogItem(currentBlog, lang);
  }

  content += `
      </div>
    </section>
    ${LAZY_LOAD}
  `;

  return content;
}

// Wrapper for Arabic
async function buildBlogsSectionAr(conn) {
  return buildBlogsSection(conn, 'ar');
}

module.exports = {
  buildBlogsSection,
  buildBlogsSectionAr,
  buildBlogItem
};
