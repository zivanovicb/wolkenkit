import React from 'react';
import { classNames, Icon, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Action: {
    display: 'flex',
    marginRight: theme.space(2),

    '& a': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      color: 'rgba(255, 255, 255, 0.65)'
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  Icon: {
    flex: '0 0 auto',
    fill: 'currentColor'
  }
});

const Action = ({ children, classes, className = '', icon, style, onClick }) => (
  <div className={ classNames(classes.Action, className) } style={ style }>
    <a
      onClick={ event => {
        event.stopPropagation();
        event.preventDefault();
        onClick(event);
      } } href='#'
    >
      {
        typeof icon === 'string' ?
          <Icon className={ classes.Icon } name={ icon } size='sm' /> :
          icon
      }
      <span className='label'>{ children }</span>
    </a>
  </div>
);

export default withStyles(styles)(Action);
