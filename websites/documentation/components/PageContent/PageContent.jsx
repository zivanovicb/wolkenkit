import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';
import { withStyles } from 'thenativeweb-ux';
import { ActivePage, Metadata } from '../../services';
import { Breadcrumbs, Head, PageFooter } from '..';

class PageContent extends React.Component {
  render () {
    const {
      activePage,
      children,
      classes,
      metadata
    } = this.props;

    let pageTitle = `${activePage.version} | ${metadata.title}`;

    const breadcrumbsForTitle = activePage.breadcrumbs.slice().reverse().join(' | ');

    pageTitle = `${breadcrumbsForTitle} | ${pageTitle}`;

    return (
      <div ref={ this.saveContainerRef } className={ classes.PageContent }>
        <Head>
          <title>{ pageTitle }</title>
        </Head>

        <Breadcrumbs breadcrumbs={ activePage.breadcrumbs } />

        <article
          className={ classes.Article }
        >
          { children }
        </article>

        <PageFooter
          activePage={ activePage }
        />
      </div>
    );
  }
}

PageContent.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

export default withStyles(styles)(PageContent);
