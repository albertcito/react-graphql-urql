import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql';
// import { retryExchange } from '@urql/exchange-retry';

import constants from 'config/constants';
import storage from 'util/Storage';
// import cacheExchange from './cacheExchange';

const client = () => createClient({
  url: `${constants.urlServer}/graphql`,
  fetchOptions: () => {
    const token = storage.getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
      withCredentials: true,
    };
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    /* retryExchange({
      retryIf: (error) => {
        if (error && error.response && error.response.status === 401) {
          setUser();
          storage.logout();
        }
        return false;
      },
    }), */
    fetchExchange,
  ],
});

export default client;
