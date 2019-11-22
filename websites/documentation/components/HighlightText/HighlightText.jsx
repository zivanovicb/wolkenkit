import color from 'color';
import Highlighter from 'react-highlight-words';
import React from 'react';
import { withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  HighlightText: {},

  Highlight: {
    background: color(theme.color.brand.highlight).
      whiten(0.9).
      fade(0.2).
      rgb().
      string(),
    padding: '0px 0 1px 0'
  }
});

const HighlightText = ({ classes, children, searchWords }) => {
  if (!children) {
    return null;
  }

  const patterns = searchWords.map(word => {
    const lookupWordPattern = `(\\b${word})`;

    return lookupWordPattern;
  });

  return (
    <Highlighter
      className={ classes.HighlightText }
      highlightClassName={ classes.Highlight }
      searchWords={ patterns }
      textToHighlight={ children }
    />
  );
};

export default withStyles(styles)(HighlightText);
