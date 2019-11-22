import React from 'react';
import slugify from '../../services/slugify';
import { classNames, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Headline: {
    margin: '1em 0 0.5em 0',
    lineHeight: '1.1',
    position: 'relative',
    fontFamily: theme.font.family.headline,
    paddingTop: theme.space(1.5),
    marginTop: theme.space(4.5),
    fontWeight: 500,

    '&:hover $Anchor': {
      color: theme.color.brand.highlight
    }
  },

  Anchor: {
    position: 'absolute',
    display: 'block',
    left: `-0.9em`,
    top: '50%',
    marginTop: '-0.3em',
    paddingRight: `${theme.space(2)}px`,
    fontSize: `${theme.space(3)}px`,
    color: theme.color.content.background,
    fontWeight: '300 !important',

    '&:visited': {
      color: `${theme.color.content.background}`
    }
  },

  Level1: {
    fontSize: '40px'
  },

  Level2: {
    fontSize: '25px'

  },

  Level3: {
    fontSize: '20px'
  },

  Level4: {
    fontSize: theme.font.family.copytext,
    fontFamily: theme.font.family.default,
    fontWeight: 600
  },

  Level5: {
    fontSize: theme.font.family.copytext,
    fontFamily: theme.font.family.default,
    fontWeight: 600
  },

  [theme.breakpoints.down('sm')]: {
    Headline: {
      margin: 0,
      marginTop: `${theme.space(3)}px`
    },

    Anchor: {
      color: `${theme.color.brand.highlight} !important`
    },

    Level1: {
      fontSize: 26
    },

    Level2: {
      fontSize: 20
    },

    Level3: {
      fontSize: 18
    },

    Level4: {
      fontSize: 18
    },

    Level5: {
      margin: 0,
      fontSize: 18
    }
  }
});

const Headline = React.memo(({ classes, className, children, level }) => {
  if (typeof children !== 'string') {
    throw new Error('Children must be a string.');
  }

  const componentClasses = classNames(classes.Headline, classes[`Level${level}`], className);
  const id = slugify(children);

  return React.createElement(`h${level}`, { className: componentClasses, id }, [
    React.createElement(`a`, { className: classes.Anchor, 'aria-hidden': true, href: `#${id}`, key: 'anchor' }, '#'),
    children
  ]);
});

export default withStyles(styles)(Headline);
