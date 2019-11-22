import { HighlightText } from '..';
import PropTypes from 'prop-types';
import React from 'react';
import { classNames, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Keywords: {
    'padding-top': 10,
    fontSize: 12
  },

  Keyword: {
    display: 'inline-block',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: '0px 7px 1px 7px',
    marginRight: 8,
    color: theme.color.brand.dark,
    marginBottom: 8
  }
});

const Keywords = ({ classes, className, keywords, searchWords }) => {
  if (!keywords) {
    return null;
  }

  return (
    <div className={ classNames(classes.Keywords, className) }>
      { keywords.sort((left, right) => left.localeCompare(right)).map(keyword => (
        <span key={ keyword } className={ classes.Keyword }>
          <HighlightText searchWords={ searchWords }>{ keyword }</HighlightText>
        </span>
      ))}
    </div>
  );
};

Keywords.propTypes = {
  keywords: PropTypes.array,
  searchWords: PropTypes.array
};

export default withStyles(styles)(Keywords);
