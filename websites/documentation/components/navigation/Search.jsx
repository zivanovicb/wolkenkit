import { Bar } from '..';
import PropTypes from 'prop-types';
import React from 'react';
import SearchResults from './SearchResults.jsx';
import { withStyles } from 'thenativeweb-ux';
import { ActivePage, search } from '../../services';

const styles = theme => ({
  Search: {
    position: 'absolute',
    left: 0,
    top: theme.barHeight,
    width: '100%',
    zIndex: theme.zIndices.overlay,
    display: 'flex',
    flexDirection: 'column'
  },

  SearchBar: {
    backgroundColor: theme.color.brand.dark
  },

  Query: {
    width: '100%',
    marginRight: theme.space(2)
  },

  QueryInput: {
    width: '100%',
    padding: [ theme.space(0.5), theme.space(1), theme.space(0.5), theme.space(2) ],
    fontFamily: theme.font.family.default,
    fontSize: theme.font.size.md,
    fontWeight: 500,
    border: `1px solid ${theme.color.brand.dark}`,
    borderRadius: 0,
    outline: 0
  },

  [theme.breakpoints.down('sm')]: {
    QueryInput: {
      fontSize: 16
    }
  }
});

class Search extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      query: '',
      results: undefined
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  }

  handleSearchInputChange (event) {
    const { activePage } = this.props;
    const query = event.target.value;

    if (query.length > 1) {
      const results = search.query({
        query,
        language: activePage.language,
        version: activePage.version
      });

      this.setState({
        query,
        results
      });

      return;
    }

    this.setState({
      query,
      results: undefined
    });
  }

  render () {
    const { classes, onClose } = this.props;
    const { results, query } = this.state;

    return (
      <div className={ classes.Search }>
        <Bar className={ classes.SearchBar }>
          <Bar.Left className={ classes.Query }>
            <input
              value={ query }
              type='search'
              autoFocus={ true }
              placeholder='Search…'
              className={ classes.QueryInput }
              onChange={ this.handleSearchInputChange }
            />
          </Bar.Left>

          <Bar.Action icon='close' onClick={ onClose } />
        </Bar>
        <SearchResults query={ query } results={ results } />
      </div>
    );
  }
}

Search.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(Search);
