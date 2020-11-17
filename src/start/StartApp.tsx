import React, { useRef } from 'react';
import { IntlProvider } from 'react-intl';
import {
  createClient,
  Provider as URQLProvider,
  dedupExchange,
  fetchExchange,
  // cacheExchange,
} from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { retryExchange } from '@urql/exchange-retry';

import { GlobalContext, useGlobal } from 'use/global';
import Routes from './Routes';
import constants from 'config/constants';
import UserContext, { useUser } from 'use/user/UserContext';
import { StorageItems } from 'util/Storage';
import { removeByColumn } from 'util/stateHandler/items';
import { TranslationsDocument } from 'graphql/generated';

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

const cache = cacheExchange({
  keys: {
    Pagination: () => null,
    TranslationPaginationResponse: () => 'TranslationPaginationResponse',
    UserPaginationResponse: () => 'UserPaginationResponse',
  },
  updates: {
    Mutation: {
      translationDelete: (result, { id }, cache, info) => {
        console.log(cache.readQuery({ query: TranslationsDocument }));
        cache.updateQuery({ query: TranslationsDocument }, (data) => {
          console.log(data, id);
          // removeByColumn(data, 'translationID', translationID);
          return data;
        });
      },
      translationCreate: (result, { id }, cache, info) => {
        console.log(cache.readQuery({ query: TranslationsDocument }));
        cache.updateQuery({ query: TranslationsDocument }, (data) => {
          console.log(data, id);
          // removeByColumn(data, 'translationID', translationID);
          return data;
        });
      }
    },
  },
});

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
      cache,
      dedupExchange,
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
      <URQLProvider value={client}>
        <GlobalStatus />
      </URQLProvider>
    </UserContext.Provider>
  );
};
export default StartApp;
