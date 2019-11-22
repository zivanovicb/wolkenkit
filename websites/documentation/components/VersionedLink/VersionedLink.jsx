import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';
import { usePageContext } from '..';

const createReplace = function ({ activePage, rewriteLatestAs }) {
  if (!activePage) {
    throw new Error('Active page is missing.');
  }

  return function (match, pattern) {
    switch (pattern) {
      case 'VERSION': {
        let { version } = activePage;

        if (version === 'latest') {
          version = rewriteLatestAs;
        }

        return version;
      }
      default: {
        const lowerCasePath = pattern.toLowerCase();
        const version = get(activePage, lowerCasePath);

        return version;
      }
    }
  };
};

const searchForVersionsRegularExpression = /#(?<version>VERSION|VERSIONS.NODE)#/gu;

const VersionedLink = function ({ href, children, rewriteLatestAs } = {}) {
  const { activePage } = usePageContext();

  return <a href={ href.replace(searchForVersionsRegularExpression, createReplace({ activePage, rewriteLatestAs })) }>{ children }</a>;
};

VersionedLink.propTypes = {
  href: PropTypes.string.isRequired,
  rewriteLatestAs: PropTypes.string
};

VersionedLink.defaultProps = {
  rewriteLatestAs: 'latest'
};

export default VersionedLink;
