/* eslint-disable unicorn/no-null */
import { cacheExchange as cacheExchangeURQL } from '@urql/exchange-graphcache';

import invalidateID from './invalidateID';
import invalidateQuery from './invalidateQuery';

const cacheExchange = cacheExchangeURQL({
  keys: {
    LangPaginationResponse: () => null,
    Pagination: () => null,
    RolePaginationResponse: () => null,
    TranslationPaginationResponse: () => null,
    UserPaginationResponse: () => null,
  },
  updates: {
    Mutation: {
      translationCreate: (_result, _arguments, cache) => invalidateQuery('translations', cache),
      translationUpdate: (_result, { id }, cache) => invalidateID('Translation', id, cache),
      translationDelete: (_result, _arguments, cache) => invalidateQuery('translations', cache),
      userBasicUpdate: (_result, { id }, cache) => invalidateID('User', id, cache),
      userUpdateEmail: (_result, { id }, cache) => invalidateID('User', id, cache),
    },
  },
});

export default cacheExchange;
