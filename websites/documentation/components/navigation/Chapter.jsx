import Page from './Page.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import { classNames, Icon, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Chapter: {
    flex: '1 1 100%'
  },

  Title: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: [ theme.space(0.5), theme.space(1), theme.space(0.75), theme.space(1.75) ],
    margin: 0,
    marginTop: 10,
    lineHeight: 1.1,
    color: `${theme.color.brand.white} !important`,
    cursor: 'pointer',
    textDecoration: 'none',
    opacity: 0.5,

    '&:hover': {
      color: theme.color.brand.white,
      opacity: 1
    }
  },

  ExpandIcon: {
    width: 12,
    height: 12,
    fill: 'currentColor',
    transform: 'rotate(0)',
    transition: 'transform 150ms ease-in-out',
    marginTop: 3,
    marginRight: 6
  },

  IsExpanded: {
    '& $ExpandIcon': {
      transform: 'rotate(90deg)'
    }
  },

  IsActive: {
    '& $Title': {
      fontWeight: 600,
      opacity: 1
    }
  },

  Pages: {
    padding: 0
  }
});

class Chapter extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleChapterClicked = this.handleChapterClicked.bind(this);
  }

  handleChapterClicked (event) {
    const { isExpanded, onClick, path } = this.props;

    event.preventDefault();
    event.stopPropagation();

    if (isExpanded) {
      onClick(path.slice(0, -1));
    } else {
      onClick(path);
    }
  }

  renderPages () {
    const { activePath, classes, isActive, isExpanded, pages, path } = this.props;

    if (!isExpanded) {
      return null;
    }

    return (
      <ul className={ classes.Pages }>
        {
          pages.map(
            page => {
              const pagePath = path.slice(0);

              pagePath.push(page.slug);

              return (
                <Page
                  key={ page.slug }
                  isActive={ activePath.join('/') === pagePath.join('/') }
                  isEmphasized={ isActive }
                  title={ page.title }
                  path={ pagePath }
                />
              );
            }
          )
        }
      </ul>
    );
  }

  render () {
    const { classes, isActive, isExpanded, pages, title } = this.props;

    const componentClasses = classNames(classes.Chapter, {
      [classes.IsActive]: isActive,
      [classes.IsExpanded]: isExpanded
    });

    if (pages) {
      return (
        <div className={ componentClasses }>
          <a href='#' className={ classes.Title } onClick={ this.handleChapterClicked }>
            <Icon className={ classes.ExpandIcon } name='expand' />
            <span>{ title }</span>
          </a>
          {this.renderPages()}
        </div>
      );
    }
  }
}

Chapter.propTypes = {
  activePath: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  pages: PropTypes.array.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Chapter);
