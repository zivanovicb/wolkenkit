import format from 'date-fns/format';
import React from 'react';
import { withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  FeedItem: {
    padding: '20px 0 22px 0',
    margin: 0,
    borderBottom: '1px solid rgba(255,255,255, 0.1)',
    width: '37.5vw',

    '& p': {
      padding: [ 0, theme.space(4) ],
      color: 'rgba(255, 255, 255, 0.8)'
    }
  },

  Title: {
    display: 'flex',
    fontFamily: theme.font.family.default,
    fontSize: theme.font.size.md,
    color: theme.color.brand.white,
    fontWeight: 600,
    padding: [ 0, theme.space(4) ]
  },

  Date: {
    color: '#BDBDC1',
    fontWeight: 400,
    paddingRight: theme.space(4)
  },

  [theme.breakpoints.down('sm')]: {
    FeedItem: {
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

const FeedItem = function ({ classes, item = {}}) {
  let publishedAt;

  if (item.date) {
    publishedAt = new Date(item.date.year, item.date.month - 1, item.date.day);
  }

  return (
    <section className={ classes.FeedItem }>
      <h2 className={ classes.Title }>
        { publishedAt ? <span className={ classes.Date }>{format(publishedAt, 'dd.MM.yyyy')}</span> : null }
        { item.title }
      </h2>
      { item.content }
    </section>
  );
};

export default withStyles(styles)(FeedItem);
