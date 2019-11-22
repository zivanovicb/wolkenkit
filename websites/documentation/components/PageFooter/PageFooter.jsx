import { ActivePage } from '../../services';
import PropTypes from 'prop-types';
import React from 'react';
import { Brand, Link, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  PageFooter: {
    margin: [ theme.space(4), 0, 0, 0 ],
    padding: [ theme.space(4), theme.space(6) ],
    fontSize: theme.font.size.md,
    fontWeight: 300,

    '& a': {
      fontWeight: 400
    }
  },

  About: {
    borderTop: `1px solid ${theme.color.content.border}`,
    padding: [ theme.space(4), 0, 0, 0 ],
    textAlign: 'center',

    '& p': {
      margin: 0
    }
  },

  Copyright: {
    textAlign: 'center',
    padding: 0,

    '& p': {
      margin: 0
    }
  },

  [theme.breakpoints.down('sm')]: {
    PageFooter: {
      margin: 0,
      marginTop: theme.space(6),
      padding: 0
    },

    About: {
      padding: theme.space(4)
    },

    Copyright: {
      padding: theme.space(4),
      paddingTop: 0,
      marginBottom: theme.space(1)
    }
  }
});

const PageFooter = function ({ classes, activePage }) {
  const editThisPageUrl = `https://github.com/thenativeweb/wolkenkit/edit/master/websites/docs/${activePage.path.join('/')}/index.md`;

  return (
    <footer className={ classes.PageFooter }>
      <div className={ classes.About }>
        <Brand.MadeBy size='md' color='light' />
        <p>
          Found a bug? Missing something? Want to contribute? Just <a href={ editThisPageUrl }>edit this page</a>.
        </p>
      </div>
      <div className={ classes.Copyright }>
        <p>
          © Copyright 2016-2018 the native web GmbH. All rights reserved.
        </p>
        <p>
          <Link href={ `/${activePage.language}/${activePage.version}/legal/imprint` }>Imprint</Link>
        </p>
      </div>
    </footer>
  );
};

PageFooter.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired
};

export default withStyles(styles)(PageFooter);
