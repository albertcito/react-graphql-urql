import { cacheExchange as cacheExchangeURQL } from '@urql/exchange-graphcache';

import { TranslationsDocument } from 'graphql/generated';

const cacheExchange = cacheExchangeURQL({
  keys: {
    Pagination: () => null,
    TranslationPaginationResponse: () => null,
    UserPaginationResponse: () => null,
  },
  updates: {
    Mutation: {
      translationDelete: (_result, { id }, cache) => {
        // cache.invalidate evicts the entity from the cache, do note that I'm not sure about the typename I'm making an example
        // https://formidable.com/open-source/urql/docs/graphcache/custom-updates/#cacheinvalidate
        cache.invalidate({ __typename: 'Translation', id });
        // to use cache.readQuery you'll probably have to use the variables passed into this document.
        // cache.inspectFields might be worth looking at:
        // https://formidable.com/open-source/urql/docs/graphcache/custom-updates/#cacheinspectfields
        // console.log(cache.readQuery({ query: TranslationsDocument }));
      },
    },
  },
});

export default cacheExchange;
