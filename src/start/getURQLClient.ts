import {
  createClient,
  dedupExchange,
  fetchExchange,
} from 'urql';
import { retryExchange } from '@urql/exchange-retry';
// import { cacheExchange } from '@urql/exchange-graphcache';

import constants from 'config/constants';
import { StorageItems } from 'util/Storage';
// import { removeByColumn } from 'util/stateHandler/items';
// import { TranslationsDocument } from 'graphql/generated';

/*
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
*/

const client = (setUser: () => void) => createClient({
  url: `${constants.urlServer}/graphql/public`,
  fetchOptions: () => {
    const token = localStorage.getItem('accessToken');
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
      withCredentials: true,
    };
  },
  exchanges: [
    // cache,
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
});

export default client;
