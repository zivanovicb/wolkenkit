import React from 'react';
import { Icon, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    'min-height': theme.barHeight,
    padding: [ 0, theme.space(6) ],
    fontSize: theme.font.size.md,
    lineHeight: theme.font.size.md,
    borderBottom: `1px solid ${theme.color.content.border}`,
    color: '#666',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    whiteSpace: 'nowrap'
  },

  SeparatorIcon: {
    fill: '#aaa',
    margin: [ 1, theme.space(0.5), 0, theme.space(0.5) ]
  },

  Item: {
    display: 'flex',
    alignItems: 'center'
  },

  [theme.breakpoints.down('sm')]: {
    Item: {
      '&:last-child': {
        paddingRight: theme.space(4)
      }
    }
  }
});

const renderItems = function ({ breadcrumbs, classes }) {
  if (!Array.isArray(breadcrumbs)) {
    return null;
  }

  return breadcrumbs.map(breadcrumb =>
    (
      <span className={ classes.Item } key={ breadcrumb }>
        <Icon className={ classes.SeparatorIcon } name='chevron' size='sm' />
        <span>{ breadcrumb }</span>
      </span>
    ));
};

const Breadcrumbs = function ({ breadcrumbs, classes }) {
  return (
    <div className={ classes.Breadcrumbs }>
      <span>Documentation</span>
      { renderItems({ breadcrumbs, classes }) }
    </div>
  );
};

export default withStyles(styles)(Breadcrumbs);
