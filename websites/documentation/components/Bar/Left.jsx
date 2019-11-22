import React from 'react';
import { classNames, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Left: {
    marginLeft: theme.space(2)
  }
});

const Left = ({ children, classes, className = '', style }) => (
  <div className={ classNames(classes.Left, className) } style={ style }>
    { children }
  </div>
);

export default withStyles(styles)(Left);
