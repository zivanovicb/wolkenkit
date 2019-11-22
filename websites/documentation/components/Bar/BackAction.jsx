import Action from './Action.jsx';
import React from 'react';
import { classNames, Icon, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  BackAction: {
    flex: '1 1 100%',
    paddingLeft: theme.space(1),
    paddingRight: theme.space(0.5)
  },

  Icon: {
    marginLeft: theme.space(0.5),
    marginRight: theme.space(0.5),
    transform: 'rotate(180deg)',
    'transform-origin': '50% 50%',
    fill: 'currentColor'
  }
});

const BackAction = ({ children, classes, className = '', style, onClick }) => (
  <Action
    className={ classNames(classes.BackAction, className) }
    icon={ <Icon className={ classes.Icon } name='chevron' size='sm' /> }
    style={ style }
    onClick={ onClick }
  >
    { children }
  </Action>
);

export default withStyles(styles)(BackAction);
