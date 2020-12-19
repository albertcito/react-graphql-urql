import { cacheExchange as cacheExchangeURQL } from '@urql/exchange-graphcache';

import { TranslationsDocument } from 'graphql/generated';

const cacheExchange = cacheExchangeURQL({
  keys: {
    Pagination: () => 'Pagination',
    TranslationPaginationResponse: () => 'TranslationPaginationResponse',
    UserPaginationResponse: () => 'UserPaginationResponse',
  },
  updates: {
    Mutation: {
      translationDelete: (_result, { id }, cache) => {
        console.log(cache.readQuery({ query: TranslationsDocument }));
        cache.updateQuery({ query: TranslationsDocument }, (data) => {
          console.log(data, id);
          return data;
        });
      },
    },
  },
});

export default cacheExchange;
