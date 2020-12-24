import { Data, Variables, Cache } from '@urql/exchange-graphcache';

import { UserQuery, UserDocument, RolesEnum } from 'graphql/generated';
import invalidateID from '../util/invalidateID';
import invalidateQuery from '../util/invalidateQuery';

const userExchange = {
  userUpdateEmail: (
    _result: Data, { id }: Variables, cache: Cache,
  ) => invalidateID('User', id, cache),

  userRolesUpdate: (_result: Data, variables: Variables, cache: Cache) => {
    const allFields = cache.inspectFields('Query');
    const queries = allFields.filter((x) => x.fieldName === 'user');
    queries.forEach(({ arguments: _arguments }) => {
      if (_arguments && _arguments.id === variables.userID) {
        const roles = variables.rolesID as string[];
        cache.updateQuery<UserQuery>(
          { query: UserDocument, variables: _arguments },
          (user) => {
            if (!user) {
              return user;
            }
            const newUser = user;
            newUser.user.roles = roles.map((role) => ({
              id: role as RolesEnum,
              __typename: 'Role',
            }));
            return newUser;
          },
        );
      }
    });
  },
  userStatusUpdate: (
    _result: Data, variables: Variables, cache: Cache,
  ) => {
    invalidateQuery('userStatusReasons', cache);
    invalidateID('User', variables.userID, cache);
  },
};

export default userExchange;
