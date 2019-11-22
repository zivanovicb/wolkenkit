import PropTypes from 'prop-types';
import React from 'react';
import { HighlightText, Keywords, Link } from '..';
import { Icon, withStyles } from 'thenativeweb-ux';

const subtleWhite = 'rgba(255, 255, 255, 0.65)';

const styles = theme => ({
  SearchResults: {
    height: `calc(100vh - ${theme.barHeight * 2}px)`,
    backgroundColor: theme.color.brand.dark,
    overflow: 'scroll',
    '-webkit-overflow-scrolling': 'touch'
  },

  Errors: {
    marginTop: theme.space(4),
    padding: theme.space(2),
    textAlign: 'center',
    color: subtleWhite
  },

  ErrorCause: {
    fontSize: theme.font.size.lg
  },

  ErrorTip: {
    marginTop: theme.space(3),
    fontWeight: 400,

    '& p': {
      margin: '0 0 4px 0'
    }
  },

  ErrorHelp: {
    marginTop: theme.space(1),
    fontWeight: 400,
    color: subtleWhite,

    '& p': {
      marginBottom: theme.space(3)
    },

    '& a, & a:visited': {
      marginRight: theme.space(4),
      color: 'inherit'
    },

    '& a:last-child': {
      marginRight: 0
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  SocialIcon: {
    fill: 'currentColor'
  },

  SearchResult: {
    margin: 0,
    padding: [ theme.space(2), theme.space(2.5) ],
    borderBottom: '1px solid rgba(255,255,255, 0.1)',
    fontSize: theme.font.size.md
  },

  Path: {
    fontWeight: 400,
    fontSize: theme.font.size.sm,
    color: '#66686d',
    paddingBottom: theme.space(0.5),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },

  Section: {
    display: 'inline',
    color: 'inherit'
  },

  PathSeparator: {
    display: 'inline-flex',
    marginLeft: 2
  },

  PathSeparatorIcon: {
    fill: '#66686d',
    opacity: 0.75
  },

  Chapter: {
    display: 'inline'
  },

  Page: {
    display: 'block',

    '&:link, &:visited': {
      fontWeight: 600,
      color: theme.color.brand.white
    },

    '&:hover, &:focus': {
      color: theme.color.brand.highlight,
      opacity: 1,
      background: 'transparent'
    }
  }
});

const SearchResults = ({ classes, results, query }) => {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className={ classes.SearchResults }>
        <div
          className={ classes.Errors }
        >
          <div className={ classes.ErrorCause }>Sorry, no pages found.</div>
          <div className={ classes.ErrorTip }>
            Try searching for something else!
          </div>
          <div className={ classes.ErrorHelp }>
            <p>Or get help from the community:</p>
            <a href='http://slackin.wolkenkit.io' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } size='md' name='slack' />
            </a>
            <a href='http://stackoverflow.com/questions/tagged/wolkenkit' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } size='md' name='stackoverflow' />
            </a>
            <a href='https://github.com/thenativeweb/wolkenkit' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } size='md' name='github' />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const searchWords = query.split(' ').filter(word => word !== '');

  return (
    <div className={ classes.SearchResults }>
      {results.map(result => (
        <div
          className={ classes.SearchResult }
          key={ result.path }
        >
          <div className={ classes.Path }>
            <div className={ classes.Section }>
              <HighlightText searchWords={ searchWords }>
                { result.section.title }
              </HighlightText>
            </div>
            { result.chapter ? (
              <React.Fragment>
                <div className={ classes.PathSeparator }>
                  <Icon className={ classes.PathSeparatorIcon } name='chevron' size='sm' />
                </div>
                <div className={ classes.Chapter }>
                  <HighlightText searchWords={ searchWords }>
                    { result.chapter.title }
                  </HighlightText>
                </div>
              </React.Fragment>) :
              null }
          </div>
          <Link
            className={ classes.Page }
            data-path={ result.path }
            href={ `/${result.path}` }
          >
            <HighlightText searchWords={ searchWords }>
              { result.title }
            </HighlightText>
          </Link>
          <Keywords keywords={ result.keywords } searchWords={ searchWords } />
        </div>
      ))}
    </div>
  );
};

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.array
};

export default withStyles(styles)(SearchResults);
