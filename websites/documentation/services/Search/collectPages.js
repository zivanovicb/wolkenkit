import path from 'path';

const collectPages = function ({ from, into, parent, parentSlug, section, chapter, version, language } = {}) {
  if (!from) {
    throw new Error('From is missing.');
  }
  if (!parentSlug) {
    throw new Error('Parent slug is missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }
  if (!version) {
    throw new Error('Version is missing.');
  }
  if (!language) {
    throw new Error('Language is missing.');
  }

  from.forEach(page => {
    const pagePath = path.join(parentSlug, page.slug);

    if (page.children) {
      const pathDepth = pagePath.match(/\/.+?/gu).length;

      return collectPages({
        from: page.children,
        into,
        parent: page,
        parentSlug: path.join(parentSlug, page.slug),
        section: pathDepth === 1 ? page : section,
        chapter: pathDepth === 2 ? page : chapter,
        version,
        language
      });
    }
    if (!page.slug) {
      return;
    }

    const pageMetaData = {
      id: pagePath,
      parent,
      path: path.join(language, pagePath),
      title: page.title,
      keywords: page.keywords,
      keywordsAsString: page.keywords ? page.keywords.join(' ') : undefined,
      section,
      chapter,
      version,
      language,
      breadcrumbsAsString: `${section.title} ${chapter && chapter.title}`
    };

    into.push(pageMetaData);
  });
};

export default collectPages;
