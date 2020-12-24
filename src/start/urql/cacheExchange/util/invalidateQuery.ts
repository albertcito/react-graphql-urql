import { Cache } from '@urql/exchange-graphcache';
// https://formidable.com/open-source/urql/docs/graphcache/custom-updates/#cacheinspectfields
/**
 * Invalidate all cache of the same query. For instance: UserPagination.
 * It will remove all the user paginations from the cache.
 * @param queryName: users -> name of the query
 * @param cache
 */
const invalidateQuery = (
  queryName: string,
  cache: Cache,
) => {
  const allFields = cache.inspectFields('Query');
  const queries = allFields.filter((x) => x.fieldName === queryName);
  queries.forEach(({ fieldName, arguments: variables }) => {
    cache.invalidate('Query', fieldName, variables ?? undefined);
  });
};

export default invalidateQuery;
