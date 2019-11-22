import PropTypes from 'prop-types';
import React from 'react';
import { classNames, withStyles } from 'thenativeweb-ux';
import { Headline, StaticImage } from '..';

const styles = theme => ({
  Definition: {
    display: 'flex',
    marginTop: theme.space(6),
    marginBottom: theme.space(10),
    position: 'relative',

    '& $Title': {
      marginTop: 0,
      paddingTop: 0
    },

    '& $Body p': {
      maxWidth: theme.pageContent.maxWidth - theme.space(22)
    },

    '& $Body p:last-child': {
      marginBottom: 0
    },

    '& $Icon img': {
      marginTop: 0
    }
  },

  Icon: {
    width: theme.space(18),
    paddingRight: theme.space(5)
  },

  Body: {
    paddingLeft: theme.space(5),
    borderLeft: '1px solid #eeeeee'
  },

  Title: {},

  [theme.breakpoints.down('sm')]: {
    Definition: {
      borderTop: '1px solid #eeeeee',
      flexDirection: 'column'
    },

    Content: {
      paddingLeft: 0,
      paddingTop: theme.space(1),
      borderLeft: 'none'
    },

    Icon: {
      display: 'flex',
      width: theme.space(12),
      paddingRight: 0
    }
  }
});

const Definition = React.memo(({ classes, className, children, src, title } = {}) => {
  const componentClasses = classNames(classes.Definition, className);

  return (
    <div className={ componentClasses }>
      <div className={ classes.Icon }>
        <StaticImage alt={ title } src={ src } />
      </div>
      <dl className={ classes.Body }>
        <dt><Headline level='2' className={ classes.Title }>{ title }</Headline></dt>
        <dd>{ children }</dd>
      </dl>
    </div>
  );
});

Definition.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Definition);
