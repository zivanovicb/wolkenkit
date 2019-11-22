import React from 'react';
import { withStyles } from 'thenativeweb-ux';

export const getBaseStyle = theme => ({
  maxWidth: theme.pageContent.maxWidth,
  padding: `${theme.space(4)}px ${theme.space(8)}px ${theme.space(4)}px ${theme.space(4)}px`,
  margin: `${theme.space(2)}px ${theme.space(4)}px ${theme.space(2)}px 0px`,
  background: theme.color.panel.light,

  '& p:first-child': {
    marginTop: 0
  }
});

const styles = theme => ({
  Blockquote: {
    ...getBaseStyle(theme)
  }
});

const Blockquote = React.memo(({ classes, children }) => (
  <blockquote className={ classes.Blockquote }>{ children }</blockquote>
));

export default withStyles(styles)(Blockquote);
