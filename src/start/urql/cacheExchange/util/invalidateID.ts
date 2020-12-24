import { Cache, ScalarObject, Scalar, NullArray, Variables } from '@urql/exchange-graphcache';
// https://formidable.com/open-source/urql/docs/graphcache/custom-updates/#cacheinspectfields
/**
 * When updated an item. Then invalidate cache, so it go again to the server to get the new values.
 * For instance: Update an email from a user => fo to the server with the new values and
 * updated it in every place where the __typeName: 'User' is present.
 * @param __typename
 * @param id
 * @param cache
 */
const invalidateID = (
  __typename: string,
  id: string | number | boolean | ScalarObject | Variables | Scalar[] | NullArray<Variables> | null,
  cache: Cache,
) => {
  if (typeof id === 'number' || typeof id === 'string') {
    cache.invalidate({ __typename, id });
  }
};

export default invalidateID;
