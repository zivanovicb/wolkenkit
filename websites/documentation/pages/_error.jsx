import { Head } from '../components';
import React from 'react';
import { Headline, View } from 'thenativeweb-ux';

const ErrorPage = function ({ statusCode }) {
  return (
    <div>
      <Head>
        <title>404</title>
      </Head>

      <View orientation='horizontal'>
        <View orientation='vertical' alignItems='center' justifyContent='center'>
          <div>
            <Headline>
              {
                statusCode ?
                  `A ${statusCode} error occurred on our server.` :
                  'An error occurred.'
              }
            </Headline>

            <p>
              Unfortunately, something went wrong while loading this page.
              Please <a href='mailto:hello@thenativeweb.io'>contact us</a> if this
              problem persists.
            </p>
            <p>
              Meanwhile, you may <a href='https://twitter.com/thenativeweb'>follow us on Twitter</a> or visit
              the <a href='https://www.wolkenkit.io/'>wolkenkit website</a>.
            </p>
          </div>
        </View>
      </View>
    </div>
  );
};

ErrorPage.getInitialProps = function ({ res, err }) {
  if (res) {
    const { statusCode } = res;

    return { statusCode };
  }

  if (err) {
    const { statusCode } = err;

    return { statusCode };
  }

  return {};
};

export default ErrorPage;
