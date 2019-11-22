import Base from '../Base.jsx';
import React from 'react';
import { PageContent, usePageContext } from '../../components';

const Documentation = ({ children }) => {
  const { activePage, metadata } = usePageContext();

  return (
    <Base
      activePage={ activePage }
      metadata={ metadata }
    >
      <PageContent
        activePage={ activePage }
        metadata={ metadata }
      >
        { children }
      </PageContent>
    </Base>
  );
};

export default Documentation;
