import { Cache, ScalarObject, Scalar, NullArray, Variables } from '@urql/exchange-graphcache';
// https://formidable.com/open-source/urql/docs/graphcache/custom-updates/#cacheinspectfields
const invalidateID = (
  __typename: string,
  id: string | number | boolean | ScalarObject | Variables | Scalar[] | NullArray<Variables> | null,
  cache: Cache,
) => {
  if (typeof id === 'number') {
    cache.invalidate({ __typename, id });
  }
};

export default invalidateID;
