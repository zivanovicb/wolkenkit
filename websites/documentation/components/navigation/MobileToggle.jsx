import classNames from 'classnames';
import { Icon } from 'thenativeweb-ux';
import injectSheet from 'react-jss';
import React from 'react';

const styles = theme => ({
  MobileToggle: {
    position: 'fixed',
    zIndex: theme.zIndices.content,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    pointerEvents: 'none'
  },

  IsVisible: {},

  Backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    visibility: 'hidden',
    pointerEvents: 'none'
  },

  Toggle: {
    background: theme.color.brand.dark,
    position: 'absolute',
    top: 5,
    left: 5,
    borderRadius: '50%',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    willChange: 'opacity'
  },

  NavIcon: {
    fill: theme.color.brand.white
  },

  [theme.breakpoints.down('sm')]: {
    Toggle: {
      display: 'flex',
      pointerEvents: 'auto'
    },

    IsVisible: {
      '& $Backdrop': {
        visibility: 'visible',
        pointerEvents: 'auto'
      }
    }
  }
});

const MobileToggle = function ({ classes, isVisible, onClick }) {
  return (
    <div className={ classNames(classes.MobileToggle, { [classes.IsVisible]: isVisible }) }>
      <div onClick={ onClick } className={ classes.Backdrop } />
      <div onClick={ onClick } className={ classes.Toggle }>
        <Icon className={ classes.NavIcon } name='nav' size='md' />
      </div>
    </div>

  );
};

export default injectSheet(styles)(MobileToggle);
