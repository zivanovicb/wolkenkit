import { Link } from '..';
import PropTypes from 'prop-types';
import React from 'react';
import { classNames, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Page: {
    'list-style-type': 'none',
    margin: 0,

    '& a, & a:visited': {
      position: 'relative',
      display: 'block',
      padding: [ theme.space(0.5), theme.space(1), theme.space(1), theme.space(4) ],
      color: theme.color.brand.white,
      opacity: 0.5
    },

    '& a:hover, & a:focus': {
      opacity: 1,
      textDecoration: 'none',
      backgroundColor: 'transparent'
    }
  },

  IsEmphasized: {
    '& a': {
      opacity: 1
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  IsActive: {
    '& a:link, & a:hover, & a:visited': {
      opacity: 1,
      color: theme.color.brand.highlight,
      fontWeight: 600
    }
  }
});

const getPrettyUrl = function (path) {
  return `/${path.join('/')}`;
};

const Page = function ({ classes, isActive, isEmphasized, title, path } = {}) {
  const componentClasses = classNames(classes.Page, {
    [classes.IsActive]: isActive,
    [classes.IsEmphasized]: isEmphasized
  });

  return (
    <li className={ componentClasses }>
      <Link href={ getPrettyUrl(path) }>{ title }</Link>
    </li>
  );
};

Page.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isEmphasized: PropTypes.bool.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

Page.defaultProps = {
  isEmphasized: false
};

export default withStyles(styles)(Page);
