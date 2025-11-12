(function() {
  const TARGET = '3D Printing Service in Jordan';
  const existingTitle = document.title || '';
  if (!existingTitle.toLowerCase().includes(TARGET.toLowerCase())) {
    document.title = existingTitle ? `${TARGET} | ${existingTitle}` : TARGET;
  }

  const updateHeadingText = (heading) => {
    if (!heading) return;
    if (heading.textContent.trim().toLowerCase() !== TARGET.toLowerCase()) {
      heading.textContent = TARGET;
    }
    heading.classList.add('seo-heading');
  };

  let h1 = document.querySelector('h1');
  if (h1) {
    updateHeadingText(h1);
  } else {
    const newHeading = document.createElement('h1');
    newHeading.textContent = TARGET;
    newHeading.className = 'seo-heading';

    const header = document.querySelector('header');
    if (header && header.parentNode) {
      const next = header.nextSibling;
      if (next) {
        header.parentNode.insertBefore(newHeading, next);
      } else {
        header.parentNode.appendChild(newHeading);
      }
    } else {
      document.body.insertBefore(newHeading, document.body.firstChild);
    }
  }
})();
