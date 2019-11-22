import Action from './Action.jsx';
import BackAction from './BackAction.jsx';
import Left from './Left.jsx';
import merge from 'lodash/merge';
import React from 'react';
import Right from './Right.jsx';
import { classNames, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Bar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    'min-height': theme.barHeight,
    fontSize: theme.font.size.md,
    borderBottom: '1px solid rgba(255,255,255, 0.1)',
    color: 'rgba(255, 255, 255, 0.65)',

    '& a, a:visited': {
      color: 'rgba(255, 255, 255, 0.65)',
      textDecoration: 'none'
    },

    '& a:focus, a:hover': {
      color: theme.color.brand.highlight
    }
  },

  JustifyContentCenter: {
    justifyContent: 'center'
  },

  JustifyContentSpaceBetween: {
    justifyContent: 'space-between'
  },

  VariantBottom: {
    background: theme.color.brand.dark,
    borderBottom: 0,
    borderTop: '1px solid rgba(255,255,255, 0.1)'
  }
});

const Bar = ({ children, classes, className, style, variant, justifyContent }) => {
  const componentClasses = classNames(
    classes.Bar,
    {
      [classes.JustifyContentCenter]: justifyContent === 'center',
      [classes.JustifyContentSpaceBetween]: justifyContent === 'space-between',
      [classes.VariantBottom]: variant === 'bottom'
    },
    className
  );

  return (
    <div className={ componentClasses } style={ style }>
      { children }
    </div>
  );
};

Bar.Action = Action;
Bar.BackAction = BackAction;
Bar.Left = Left;
Bar.Right = Right;

Bar.extendStyle = function (customStyles) {
  return function (theme) {
    return merge({}, styles(theme), customStyles(theme));
  };
};

Bar.defaultProps = {
  justifyContent: 'space-between'
};

export default withStyles(styles)(Bar);
