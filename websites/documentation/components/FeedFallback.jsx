import FeedItem from './FeedItem.jsx';
import React from 'react';

const FeedFallback = function () {
  return (
    <FeedItem
      isMarkdown={ false }
      item={{
        title: 'Failed to load the latest news',
        content: (
          <React.Fragment>
            <p>
              Unfortunately, there went something wrong while loading the news.
              Please <a href='mailto:hello@thenativeweb.io'>contact us</a> if this
              problem persists.
            </p>
            <p>
              Meanwhile, you may <a href='https://twitter.com/thenativeweb'>follow us on Twitter</a> or visit
              the <a href='https://www.wolkenkit.io/'>wolkenkit website</a>.
            </p>
          </React.Fragment>
        )
      }}
    />
  );
};

export default FeedFallback;
