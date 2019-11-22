import collectBreadcrumbs from './collectBreadcrumbs';
import collectUrls from './collectUrls';
import semver from 'semver';
import slugifyNavigationItems from './slugifyNavigationItems';
import { baseUrl, news, title, versions } from '../../configuration';

class Metadata {
  constructor () {
    this.baseUrl = baseUrl;
    this.news = news;
    this.title = title;

    this.navigation = {};
    this.versions = {};

    /* eslint-disable global-require */
    for (const runtimeVersion of versions) {
      const navigationForRuntimeVersion = require(`../../configuration/${runtimeVersion}/navigation`);
      const versionsForRuntimeVersion = require(`../../configuration/${runtimeVersion}/versions`);

      this.navigation[runtimeVersion] = slugifyNavigationItems(navigationForRuntimeVersion);
      this.versions[runtimeVersion] = versionsForRuntimeVersion;
    }
    /* eslint-enable global-require */

    this.stable = semver.maxSatisfying(versions.filter(version => version !== 'latest'), '*') || 'latest';
  }

  getBreadcrumbsForPath ({ path }) {
    if (!path) {
      throw new Error('Path is missing.');
    }

    const [ language, version, section, chapter, page ] = path;
    const pathWithoutLanguageAndVersion = [ section, chapter, page ].filter(item => item);
    const breadcrumbs = [];

    // If we're not a content page e.g. `/en-US/latest` there are no breadcrumbs.
    if (path.length <= 2) {
      return breadcrumbs;
    }

    collectBreadcrumbs({
      language,
      path: pathWithoutLanguageAndVersion,
      children: this.navigation[version],
      into: breadcrumbs
    });

    return breadcrumbs;
  }

  getSitemap () {
    const urls = [];

    for (const runtimeVersions of versions) {
      collectUrls({
        from: this.navigation[runtimeVersions],
        parent: runtimeVersions,
        into: urls,
        baseUrl
      });
    }

    return urls;
  }
}

export default Metadata;
