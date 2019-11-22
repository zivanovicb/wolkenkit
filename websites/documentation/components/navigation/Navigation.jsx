import { Bar } from '..';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import MenuBar from './MenuBar.jsx';
import MobileToggle from './MobileToggle.jsx';
import PageMenu from './PageMenu.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import Search from './Search.jsx';
import VersionBar from './VersionBar.jsx';
import { ActivePage, Metadata } from '../../services';
import { Brand, Icon, Link, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Navigation: {
    position: 'fixed',
    top: 0,
    left: 0,
    flex: theme.sidebarFlex,
    width: theme.sidebarWidth,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.color.brand.dark,
    overflow: 'hidden'
  },

  Content: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'column',
    zIndex: theme.zIndices.navigation + 1,
    position: 'relative'
  },

  Pattern: {
    zIndex: theme.zIndices.navigationPattern
  },

  Mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '498px',
    backgroundImage: `url(/static/pattern/background-overlay.png)`,
    backgroundRepeat: 'repeat-x',
    backgroundSize: '1px 498px',
    zIndex: theme.zIndices.navigationPattern + 1
  },

  SocialBar: {
    '& a': {
      display: 'flex',
      margin: theme.space(2)
    }
  },

  SocialIcon: {
    width: 22,
    height: 22,
    fill: 'currentColor'
  },

  IsVisibleOnMobile: {},

  [theme.breakpoints.down('sm')]: {
    Navigation: {
      pointerEvents: 'none',
      zIndex: theme.zIndices.navigation,
      flex: theme.sidebarFlexMobile,
      width: theme.sidebarWidthMobile,
      transform: `translate(-30%,0)`,
      transition: 'transform 500ms cubic-bezier(0.190, 1.000, 0.220, 1.000), opacity 400ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
      willChange: 'transform',
      opacity: 0
    },

    IsVisibleOnMobile: {
      pointerEvents: 'auto',
      transform: 'translate(0,0)',
      opacity: 1
    }
  }
});

class Navigation extends React.Component {
  static getDerivedStateFromProps (props, state) {
    if (!isEqual(state.previousActivePath, props.activePage.path)) {
      return {
        previousActivePath: props.activePage.path,
        activePath: props.activePage.path,
        expandedPath: props.activePage.path
      };
    }

    return null;
  }

  constructor (props) {
    super(props);

    this.state = {
      showSearch: false,
      isVisibleOnMobile: false
    };

    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleMobileToggleClick = this.handleMobileToggleClick.bind(this);
    this.handleShowSearch = this.handleShowSearch.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
  }

  handleNavigate (newPath) {
    this.setState({
      expandedPath: newPath
    });
  }

  handleBack () {
    const { activePage } = this.props;

    this.setState({
      expandedPath: [ activePage.language, activePage.version ]
    });
  }

  handleMobileToggleClick () {
    this.setState(currentState => ({
      isVisibleOnMobile: !currentState.isVisibleOnMobile
    }));
  }

  handleShowSearch () {
    this.setState({
      showSearch: true
    });
  }

  handleSearchClose () {
    this.setState({
      showSearch: false
    });
  }

  render () {
    const {
      activePage,
      classes,
      metadata
    } = this.props;

    const {
      expandedPath,
      isVisibleOnMobile,
      showSearch
    } = this.state;

    const expandedBreadcrumbs = metadata.getBreadcrumbsForPath({ path: expandedPath });

    const componentClasses = classNames(classes.Navigation, {
      [classes.IsVisibleOnMobile]: isVisibleOnMobile
    });

    return (
      <React.Fragment>
        <div className={ componentClasses }>
          <Brand.Pattern className={ classes.Pattern } />

          <div className={ classes.Mask } />

          <div className={ classes.Content }>
            <VersionBar
              activePage={ activePage }
              metadata={ metadata }
            />

            <MenuBar
              backLabel={ expandedBreadcrumbs && expandedBreadcrumbs[0] }
              onBack={ this.handleBack }
              onShowSearch={ this.handleShowSearch }
            />

            <PageMenu
              activePage={ activePage }
              expandedPath={ expandedPath }
              metadata={ metadata }
              onNavigate={ this.handleNavigate }
            />

            <Bar className={ classes.SocialBar } variant='bottom' justifyContent='center'>
              <Link href='https://github.com/thenativeweb/wolkenkit' isExternal={ true }>
                <Icon className={ classes.SocialIcon } name='github' />
              </Link>
              <Link href='http://slackin.wolkenkit.io' isExternal={ true }>
                <Icon className={ classes.SocialIcon } name='slack' />
              </Link>
              <Link href='http://stackoverflow.com/questions/tagged/wolkenkit' isExternal={ true }>
                <Icon className={ classes.SocialIcon } name='stackoverflow' />
              </Link>
            </Bar>

            { showSearch ? <Search activePage={ activePage } onClose={ this.handleSearchClose } /> : null }
          </div>
        </div>

        <MobileToggle
          onClick={ this.handleMobileToggleClick }
          isVisible={ isVisibleOnMobile }
        />
      </React.Fragment>
    );
  }
}

Navigation.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

export default withStyles(styles)(Navigation);
