import PropTypes from 'prop-types';
import React from 'react';
import { classNames, Icon, Text, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Section: {
    flex: '1 1 100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255, 0.1)',

    '& a:link, & a:visited, & a:active': {
      flex: '1 1 100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textDecoration: 'none',
      padding: [ theme.space(1), theme.space(2) ],
      color: theme.color.brand.white
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  Chevron: {
    fill: theme.color.brand.white,
    marginLeft: theme.space(1)
  },

  Label: {
    flex: '1 1 100%',
    padding: 0
  },

  IsActive: {
    fontWeight: 800
  }
});

class Section extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleItemClicked = this.handleItemClicked.bind(this);
  }

  handleItemClicked (event) {
    const { onClick, path } = this.props;

    event.preventDefault();
    event.stopPropagation();

    onClick(path);
  }

  render () {
    const { classes, isActive, title } = this.props;

    const componentClasses = classNames(classes.Section, {
      [classes.IsActive]: isActive
    });

    return (
      <div className={ componentClasses }>
        <a href='#' onClick={ this.handleItemClicked }>
          <Text className={ classes.Label }>{ title }</Text>
          <Icon className={ classes.Chevron } name='chevron' size='sm' />
        </a>
      </div>
    );
  }
}

Section.propTypes = {
  isActive: PropTypes.bool.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(Section);
