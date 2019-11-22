import Bar from './Bar/index.jsx';
import FeedFallback from './FeedFallback.jsx';
import FeedItem from './FeedItem.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Feed: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: theme.color.panel.dark,
    width: '37.5vw'
  },

  PlaceholderBar: {},

  Title: {
    padding: [ 0, theme.space(4), 0, theme.space(4) ],
    fontWeight: 600
  },

  Items: {
    flex: '1 1 100%',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch'
  },

  LoadingIndicator: {
    padding: [ 0, theme.space(4) ]
  },

  [theme.breakpoints.down('sm')]: {
    Feed: {
      overflow: 'visible',
      flex: '1 1 auto',
      width: '100%',
      display: 'block'
    },

    PlaceholderBar: {
      display: 'none'
    },

    Title: {
      padding: theme.space(2)
    }
  }
});

class Feed extends React.PureComponent {
  static renderItems ({ items }) {
    if (!items) {
      return <FeedFallback />;
    }

    return items.map(item => <FeedItem key={ `${item.date.year}${item.date.month}${item.date.day}${item.title}` } item={ item } />);
  }

  render () {
    const { classes, items } = this.props;

    return (
      <div className={ classes.Feed }>
        <Bar className={ classes.PlaceholderBar } />
        <Bar><div className={ classes.Title }>News</div></Bar>
        <div className={ classes.Items }>
          { Feed.renderItems({ classes, items }) }
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(Feed);
