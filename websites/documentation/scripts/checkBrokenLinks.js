/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const fs = require('fs').promises,
      path = require('path');

const axios = require('axios'),
      { buntstift } = require('buntstift'),
      cheerio = require('cheerio');

const { baseUrl } = require('../configuration');

const ignore = [
  /.+github\.com.+/u
];

const getPage = async ({ url }) => {
  const response = await axios.get(url);

  const page = cheerio.load(response.data);

  return page;
};

const collectPageUrls = function ({ page }) {
  const linkTagsOnPage = page('a[href]');
  let urlsOnPage = [];

  linkTagsOnPage.each((index, tag) => {
    const url = page(tag).attr('href');

    urlsOnPage.push(url);
  });

  urlsOnPage = urlsOnPage.
    filter(url => !url.startsWith('#') && !url.startsWith('mailto:')).
    map(url => {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }

      return url;
    });

  return urlsOnPage;
};

(async () => {
  const sitemapPath = path.join(__dirname, '..', 'out', 'sitemap.txt');
  let pageUrlsToScan;
  const scannedUrls = {};
  const referrerPagesByUrl = {};
  const brokenUrls = [];

  try {
    const sitemap = await fs.readFile(sitemapPath, { encoding: 'utf8' });

    pageUrlsToScan = sitemap.split('\n').filter(url => url !== '');
  } catch {
    buntstift.error(new Error('sitemap.txt does not exist.'));
  }

  try {
    buntstift.info('Starting to crawl...');
    buntstift.line();

    while (pageUrlsToScan.length > 0) {
      const currentPageUrl = pageUrlsToScan.pop();
      let page;

      try {
        page = await getPage({ url: currentPageUrl });
        scannedUrls[currentPageUrl] = true;

        if (currentPageUrl.startsWith(baseUrl)) {
          const colltectedUrls = collectPageUrls({ page });

          for (const url of colltectedUrls) {
            let shouldUrlBeIgnored = false;

            if (!referrerPagesByUrl[url]) {
              referrerPagesByUrl[url] = new Set();
            }

            referrerPagesByUrl[url].add(currentPageUrl);

            if (scannedUrls[url]) {
              shouldUrlBeIgnored = true;
            } else {
              for (const ignorePattern of ignore) {
                shouldUrlBeIgnored = ignorePattern.test(url);
              }
            }

            if (shouldUrlBeIgnored) {
              buntstift.verbose(`Ignoring: ${url}`);

              continue;
            }

            if (!pageUrlsToScan.includes(url)) {
              buntstift.verbose(`Adding: ${url}`);
              pageUrlsToScan.push(url);
            }
          }
        }

        buntstift.info(`Checked: ${currentPageUrl}`);
      } catch (ex) {
        brokenUrls.push(currentPageUrl);

        buntstift.error(ex);
        buntstift.info(`Error: ${currentPageUrl} `);
      }
    }
  } catch (ex) {
    buntstift.error(ex);
  }

  buntstift.line();
  buntstift.info('Finished crawling.');
  buntstift.line();

  if (brokenUrls.length > 0) {
    buntstift.info('The following links are broken:');

    for (const brokenUrl of brokenUrls) {
      buntstift.error(`${brokenUrl}`);

      for (const referrer of referrerPagesByUrl[brokenUrl]) {
        buntstift.info(`- ${referrer}`);
      }
    }

    buntstift.exit(1);
  }
})();
