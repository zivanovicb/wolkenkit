import Base from '../Base.jsx';
import React from 'react';
import { usePageContext } from '../../components';
import { Product, View, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  IntroPage: {
    flex: theme.contentFlex,
    width: theme.contentWidth,
    overflow: 'hidden',
    position: 'fixed',
    left: theme.sidebarWidth,
    top: 0,
    right: 0
  },

  Brand: {},
  IntroContent: {},

  SiteTitle: {
    fontSize: theme.font.size.lg,
    textAlign: 'center',
    color: theme.color.brand.white
  },

  [theme.breakpoints.down('sm')]: {
    IntroPage: {
      left: 0,
      width: '100vw',
      flexDirection: 'column-reverse',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    },

    Brand: {
      flex: '0 0 40vh',
      height: '40vh'
    },

    SiteTitle: {
      fontSize: theme.font.size.sm
    }
  }
});

const Intro = function ({ classes, children }) {
  const { activePage, metadata } = usePageContext();

  return (
    <Base
      activePage={ activePage }
      metadata={ metadata }
    >
      <View orientation='horizontal' background='dark' className={ classes.IntroPage }>
        <View className={ classes.IntroContent } scrollable='auto'>
          { children }
        </View>

        <View className={ classes.Brand } orientation='vertical' alignItems='center' justifyContent='center' adjust='flex'>
          <Product name='wolkenkit' isAnimated={ true } size='xl' />
          <div className={ classes.SiteTitle }>Documentation</div>
        </View>
      </View>
    </Base>
  );
};

export default withStyles(styles)(Intro);
