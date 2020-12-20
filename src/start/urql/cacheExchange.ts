/* eslint-disable unicorn/no-null */
import { cacheExchange as cacheExchangeURQL } from '@urql/exchange-graphcache';

const cacheExchange = cacheExchangeURQL({
  keys: {
    LangPaginationResponse: () => null,
    Pagination: () => null,
    TranslationPaginationResponse: () => null,
    UserPaginationResponse: () => null,
  },
  updates: {
    Mutation: {
      translationDelete: (_result, _arguments, cache) => {
        const allFields = cache.inspectFields('Query');
        const translationsQueries = allFields.filter((x) => x.fieldName === 'translations');
        translationsQueries.forEach(({ fieldName, arguments: variables }) => {
          cache.invalidate('Query', fieldName, variables ?? undefined);
        });
      },
      translationUpdate: (_result, { id }, cache) => {
        if (typeof id === 'number') {
          cache.invalidate({ __typename: 'Translation', id });
        }
      },
      translationCreate: (_result, _arguments, cache) => {
        // https://formidable.com/open-source/urql/docs/graphcache/custom-updates/#cacheinspectfields
        const allFields = cache.inspectFields('Query');
        const translationsQueries = allFields.filter((x) => x.fieldName === 'translations');
        translationsQueries.forEach(({ fieldName, arguments: variables }) => {
          cache.invalidate('Query', fieldName, variables ?? undefined);
        });
      },
    },
  },
});

export default cacheExchange;
