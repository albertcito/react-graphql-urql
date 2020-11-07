import React from 'react';

import { UserQuery } from 'graphql/generated';
import Roles from './ui/Roles';
import Forms from './ui/Forms';

interface UserContentProperties {
  route: string;
  user: UserQuery['user'];
}
const UserContent: React.FC<UserContentProperties> = ({ route, user }) => {
  switch (true) {
    case route.includes('roles'): return <Roles user={user} />;
    case (route === `/admin/users/${user.userID}`): return <Forms user={user} />;
    default: throw new Error(`The route ${route} for the user ${user.userID} cannot be found`);
  }
};
export default UserContent;
