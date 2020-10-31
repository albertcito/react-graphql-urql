import React from 'react';
import { IntlProvider } from 'react-intl';
import { HttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { GlobalContext, useGlobal } from 'use/global';
import Routes from './Routes';
import constants from 'config/constants';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      withCredentials: true,
    },
  };
});

const httpLink = new HttpLink({
  uri: `${constants.urlServer}/graphql/public`,
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const GlobalSomething: React.FC = () => {
  const global = useGlobal();
  return (
    <GlobalContext.Provider value={global}>
      <IntlProvider
        locale={global.intl.lang}
        messages={global.intl.messages}
        defaultLocale={global.intl.defaultLocale}
      >
        <Routes />
      </IntlProvider>
    </GlobalContext.Provider>
  );
};

const StartApp = () => (
  <ApolloProvider client={client}>
    <GlobalSomething />
  </ApolloProvider>
);

export default StartApp;
