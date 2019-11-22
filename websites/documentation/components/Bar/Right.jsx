import React from 'react';
import { classNames, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Right: {
    marginRight: theme.space(2)
  }
});

const Right = ({ children, classes, className = '', style }) => (
  <div className={ classNames(classes.Right, className) } style={ style }>
    { children }
  </div>
);

export default withStyles(styles)(Right);
