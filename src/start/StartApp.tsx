import React from 'react';
import { IntlProvider } from 'react-intl';
import { createClient, Provider, dedupExchange, cacheExchange, fetchExchange, makeOperation } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { retryExchange } from '@urql/exchange-retry';

import { GlobalContext, useGlobal } from 'use/global';
import Routes from './Routes';
import constants from 'config/constants';
import UserContext, { useUser } from 'use/user/UserContext';

function promise<T>(value: T): Promise<T> {
  return new Promise((resolve) => resolve(value));
}
const client = createClient({
  url: `${constants.urlServer}/graphql/public`,
  fetchOptions: () => {
    const token = localStorage.getItem('accessToken');
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
      withCredentials: true,
    };
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    retryExchange({
      retryIf: (error) => {
        console.log(error);
        if ((error && error.graphQLErrors.length > 0) || error.networkError) {
          console.log("true");
          return true;
        }
        console.log("false");
        return false;
      },
    }),
    fetchExchange,
    // dedupExchange,
    // cacheExchange,
    /*
    authExchange<{token: string }>({
      getAuth: ({ authState }) => {
        if (!authState) {
          const token = localStorage.getItem('userToken');
          if (token) {
            return promise({ token });
          }
          return promise({ token: '' });
        }
        return promise({ token: '' });
      },
      addAuthToOperation: ({ authState, operation }) => {
        if (!authState || !authState.token) {
          return operation;
        }
        const fetchOptions = typeof operation.context.fetchOptions === 'function'
          ? operation.context.fetchOptions()
          : operation.context.fetchOptions || {};
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: authState.token,
            },
          },
        });
      },
      willAuthError: ({ authState }) => {
        if (!authState) return true;
        return false;
      },
      didAuthError: ({ error }) => error.graphQLErrors.some((event) => event.extensions?.code === 'FORBIDDEN'),
    }),
    */
  ],
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

const StartApp = () => {
  const user = useUser();
  return (
    <UserContext.Provider value={user}>
      <Provider value={client}>
        <GlobalSomething />
      </Provider>
    </UserContext.Provider>
  );
};
export default StartApp;
