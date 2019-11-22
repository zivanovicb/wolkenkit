import { Bar } from '..';
import React from 'react';
import { withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  News: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    background: theme.color.panel.dark,
    width: '37.5vw'
  },

  PlaceholderBar: {},

  Title: {
    padding: [ 0, theme.space(3) ],
    fontWeight: 600
  },

  Items: {
    flex: '1 1 100%',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch'
  },

  [theme.breakpoints.down('sm')]: {
    News: {
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

const News = React.memo(({ classes, children }) => (
  <div className={ classes.News }>
    <Bar className={ classes.PlaceholderBar } />
    <Bar><div className={ classes.Title }>News</div></Bar>
    <div className={ classes.Items }>
      { children }
    </div>
  </div>
));

export default withStyles(styles)(News);
