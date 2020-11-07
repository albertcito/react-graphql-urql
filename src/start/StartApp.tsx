import React, { useRef } from 'react';
import { IntlProvider } from 'react-intl';
import { createClient, Provider, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { retryExchange } from '@urql/exchange-retry';

import { GlobalContext, useGlobal } from 'use/global';
import Routes from './Routes';
import constants from 'config/constants';
import UserContext, { useUser } from 'use/user/UserContext';
import { StorageItems } from 'util/Storage';

const GlobalStatus: React.FC = () => {
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

const StartApp: React.FC = () => {
  const { setUser, ...props } = useUser();
  const client = useRef(createClient({
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
          if (error && error.response && error.response.status === 401) {
            setUser();
            localStorage.removeItem(StorageItems.accessToken);
            localStorage.removeItem(StorageItems.langID);
            localStorage.removeItem(StorageItems.userID);
          }
          return false;
        },
      }),
      fetchExchange,
    ],
  })).current;
  return (
    <UserContext.Provider value={{ ...props, setUser }}>
      <Provider value={client}>
        <GlobalStatus />
      </Provider>
    </UserContext.Provider>
  );
};
export default StartApp;
