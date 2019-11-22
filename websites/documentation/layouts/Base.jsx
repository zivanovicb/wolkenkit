import PropTypes from 'prop-types';
import React from 'react';
import { ActivePage, Metadata } from '../services';
import { classNames, Website, withStyles } from 'thenativeweb-ux';
import { Head, Icons, Navigation } from '../components';

const styles = theme => ({
  '@global': {
    body: {
      color: theme.color.brand.dark,
      lineHeight: '1.45'
    },

    'a, a:visited, a:active': {
      color: theme.color.brand.highlight,
      textDecoration: 'none'
    },

    table: {
      'border-collapse': 'collapse',
      'border-spacing': 0,

      '& th': {
        textAlign: 'left'
      }
    }
  },

  Base: {}
});

const Base = function ({ activePage, classes, className, children, metadata }) {
  const componentClasses = classNames(classes.Base, className);

  return (
    <Website orientation='horizontal' className={ componentClasses }>
      <Head>
        <title>{ metadata.title }</title>
      </Head>

      <Icons />

      <Navigation
        activePage={ activePage }
        metadata={ metadata }
      />

      { children }
    </Website>
  );
};

Base.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

export default withStyles(styles)(Base);
