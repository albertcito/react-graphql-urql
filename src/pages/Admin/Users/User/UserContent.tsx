import React from 'react';

import { UserQuery } from 'graphql/generated';
import Roles from './ui/Roles';
import Forms from './ui/Forms';
import { userViewEnum } from './config';

interface UserContentProperties {
  view: userViewEnum;
  user: UserQuery['user'];
}

const UserContent: React.FC<UserContentProperties> = ({ view, user }) => {
  switch (true) {
    case view === userViewEnum.roles: return <Roles user={user} />;
    case view === userViewEnum.profile: return <Forms user={user} />;
    default: throw new Error(`The view "${view}" for the user ${user.id} cannot be found`);
  }
};

export default UserContent;
