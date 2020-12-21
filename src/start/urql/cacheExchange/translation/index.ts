import { Data, Variables, Cache } from '@urql/exchange-graphcache';

import invalidateID from '../util/invalidateID';
import invalidateQuery from '../util/invalidateQuery';

const translationExchange = {
  translationCreate: (_: Data, __: Variables, cache: Cache) => invalidateQuery('translations', cache),
  translationUpdate: (_: Data, { id }: Variables, cache: Cache) => invalidateID('Translation', id, cache),
  translationDelete: (_: Data, __: Variables, cache: Cache) => invalidateQuery('translations', cache),
  userBasicUpdate: (_: Data, { id }: Variables, cache: Cache) => invalidateID('User', id, cache),
};

export default translationExchange;
