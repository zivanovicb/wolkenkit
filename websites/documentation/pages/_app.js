import App from 'next/app';
import Documentation from '../layouts/Documentation';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import theme from '../theme/docs';
import { ActivePage, metadata } from '../services';
import { Blockquote, Code, Headline, Link, PageContextProvider } from '../components';
import { removeServerSideStyles, ThemeProvider } from 'thenativeweb-ux';

const mdxComponents = {
  blockquote: Blockquote,
  code: Code,
  /* eslint-disable id-length */
  a: Link,
  /* eslint-enable id-length */
  h1: ({ children }) => <Headline level='1'>{ children }</Headline>,
  h2: ({ children }) => <Headline level='2'>{ children }</Headline>,
  h3: ({ children }) => <Headline level='3'>{ children }</Headline>,
  h4: ({ children }) => <Headline level='4'>{ children }</Headline>,
  h5: ({ children }) => <Headline level='5'>{ children }</Headline>,
  wrapper: ({ children }) => <Documentation>{ children }</Documentation>
};

class CustomApp extends App {
  constructor (props) {
    super(props);

    const { router } = props;

    const activePage = new ActivePage({
      metadata,
      path: router.asPath
    });

    this.state = {
      metadata,
      activePage
    };
  }

  /* eslint-disable class-methods-use-this */
  componentDidMount () {
    removeServerSideStyles();
  }
  /* eslint-enable class-methods-use-this */

  static getDerivedStateFromProps (props) {
    const { router } = props;

    const activePage = new ActivePage({
      metadata,
      path: router.asPath
    });

    return {
      activePage
    };
  }

  render () {
    const { Component, pageProps } = this.props;
    const { activePage } = this.state;
    const { language, version, versions } = activePage;

    return (
      <ThemeProvider theme={ theme }>
        <MDXProvider components={ mdxComponents }>
          <PageContextProvider context={{ activePage, metadata }}>
            <Component
              { ...pageProps }
              language={ language }
              version={ version }
              versions={ versions }
            />
          </PageContextProvider>
        </MDXProvider>
      </ThemeProvider>
    );
  }
}

export default CustomApp;
