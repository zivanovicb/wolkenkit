import collectPages from './collectPages';

class Search {
  constructor ({ metadata }) {
    if (!metadata) {
      throw new Error('Metadata is missing.');
    }

    this.metadata = metadata;
    this.pages = {};
  }

  query ({ query, language, version }) {
    if (!query) {
      throw new Error('Query is missing.');
    }
    if (!language) {
      throw new Error('Language is missing.');
    }
    if (!version) {
      throw new Error('Version is missing.');
    }

    const { pages } = this;

    if (!pages[version]) {
      pages[version] = [];

      collectPages({
        from: this.metadata.navigation[version],
        parentSlug: version,
        into: pages[version],
        language,
        version
      });
    }

    const queryWords = query.
      split(' ').
      filter(word => word !== '');

    const patterns = queryWords.map(word => {
      const pattern = new RegExp(`(\\b${word})`, 'iu');

      return pattern;
    });

    const results = pages[version].filter(page => {
      let occurences = 0;

      patterns.forEach(pattern => {
        if (
          pattern.test(page.title) ||
          pattern.test(page.keywordsAsString) ||
          pattern.test(page.breadcrumbsAsString)
        ) {
          occurences += 1;
        }
      });

      return occurences === patterns.length;
    });

    return results;
  }
}

export default Search;
