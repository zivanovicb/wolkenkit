import React from 'react';
import { StyleCollector } from 'thenativeweb-ux';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends NextDocument {
  static async getInitialProps (ctx) {
    const collection = StyleCollector.createCollection();
    const originalRenderPage = ctx.renderPage;

    /* eslint-disable no-param-reassign */
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => (
          <StyleCollector collection={ collection }>
            <App { ...props } />
          </StyleCollector>
        )
      });
    /* eslint-enable no-param-reassign */

    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          { initialProps.styles }
          { collection.generateStyleTag() }
        </React.Fragment>
      )
    };
  }

  /* eslint-disable class-methods-use-this */
  render () {
    return (
      <Html>
        <Head>
          <link rel='icon' type='image/png' href='/favicon.png' sizes='32x32' />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default CustomDocument;
