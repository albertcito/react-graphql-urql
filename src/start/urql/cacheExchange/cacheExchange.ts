/* eslint-disable unicorn/no-null */
import { cacheExchange as cacheExchangeURQL } from '@urql/exchange-graphcache';

import userExchange from './user';
import translationExchange from './translation';

const cacheExchange = cacheExchangeURQL({
  keys: {
    LangPaginationResponse: () => null,
    Pagination: () => null,
    RolePaginationResponse: () => null,
    TranslationPaginationResponse: () => null,
    UserPaginationResponse: () => null,
    UserStatusReasonPaginationResponse: () => null,
    EmailUpdatePaginationResponse: () => null,
  },
  updates: {
    Mutation: {
      ...translationExchange,
      ...userExchange,
    },
  },
});

export default cacheExchange;
