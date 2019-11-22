import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import { ActivePage, Metadata } from '../../services';
import { Bar, Link } from '..';
import { Dropdown, Product } from 'thenativeweb-ux';

class VersionBar extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleVersionChanged = this.handleVersionChanged.bind(this);
  }

  handleVersionChanged (newVersion) {
    const { activePage } = this.props;

    Router.push(`/${activePage.language}/${newVersion}`);
  }

  renderLogo () {
    const { activePage } = this.props;

    return (
      <Link
        href={ `/${activePage.language}/${activePage.version}` }
      >
        <Product name='wolkenkit' type='text-only' size='lg' />
      </Link>
    );
  }

  render () {
    const { activePage, metadata } = this.props;

    return (
      <Bar>
        <Bar.Left>
          {this.renderLogo()}
        </Bar.Left>
        <Bar.Right>
          <Dropdown
            style={{ margin: 0 }}
            value={ activePage.version }
            options={ Object.keys(metadata.versions).map(version => ({ label: version, value: version })) }
            selected={ activePage.version }
            onChange={ this.handleVersionChanged }
          />
        </Bar.Right>
      </Bar>
    );
  }
}

VersionBar.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

export default VersionBar;
