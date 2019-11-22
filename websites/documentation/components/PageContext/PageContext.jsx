import React, { createContext, useContext } from 'react';

const PageContext = createContext({});

export const usePageContext = () => {
  const context = useContext(PageContext);

  return context;
};

export const PageContextProvider = ({ context, children }) => (
  <PageContext.Provider value={ context }>
    { children }
  </PageContext.Provider>
);
