import { Date } from '..';
import React from 'react';
import { withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  NewsItem: {
    padding: '20px 0 22px 0',
    margin: 0,
    borderBottom: '1px solid rgba(255,255,255, 0.1)',
    width: '37.5vw',

    '& p': {
      padding: [ 0, theme.space(3) ],
      color: 'rgba(255, 255, 255, 0.8)'
    }
  },

  Title: {
    display: 'flex',
    fontFamily: theme.font.family.default,
    fontSize: theme.font.size.md,
    color: theme.color.brand.white,
    fontWeight: 600,
    padding: [ 0, theme.space(3), theme.space(1.75), theme.space(3) ]
  },

  Date: {
    color: '#BDBDC1',
    fontWeight: 400,
    paddingRight: theme.space(3)
  },

  [theme.breakpoints.down('sm')]: {
    NewsItem: {
      padding: 0,
      margin: [ theme.space(0.5), 0 ],
      width: '100vw',

      '& p': {
        margin: [ 0, theme.space(2) ],
        padding: [ theme.space(2), 0 ]
      }
    },

    Title: {
      padding: [ theme.space(2), theme.space(2), 0, theme.space(2) ],
      margin: 0
    }
  }
});

const NewsItem = function ({ classes, children, day, month, title, year }) {
  return (
    <section className={ classes.NewsItem }>
      <h2 className={ classes.Title }>
        <Date className={ classes.Date } year={ year } month={ month } day={ day } />
        { title }
      </h2>

      { children }
    </section>
  );
};

export default withStyles(styles)(NewsItem);
