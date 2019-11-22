class ActivePage {
  constructor ({ metadata, path } = {}) {
    if (!metadata) {
      throw new Error('Metadata is missing.');
    }
    if (!path) {
      throw new Error('Path is missing.');
    }

    this.cleanedPath = path;

    if (path.includes('#')) {
      const [ pathWithoutAnchor ] = path.split('#');

      this.cleanedPath = pathWithoutAnchor;
    }

    if (path.includes('?')) {
      const [ pathWithoutQuery ] = path.split('?');

      this.cleanedPath = pathWithoutQuery;
    }

    this.metadata = metadata;
    this.path = this.cleanedPath.split('/').filter(item => item);

    const [ language, version, section, chapter, page ] = this.path;

    this.language = language;
    this.version = version;
    this.versions = metadata.versions[version];
    this.section = section;
    this.chapter = chapter;
    this.page = page;
    this.title = '';

    this.breadcrumbs = metadata.getBreadcrumbsForPath({ path: this.path });
    this.title = this.breadcrumbs[this.breadcrumbs.length - 1];
  }

  isContentPage () {
    return this.path.length === 5;
  }
}

export default ActivePage;
