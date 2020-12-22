import React from 'react';
import Title from 'antd/lib/typography/Title';

import { UserQuery, useUserStatusReasonsQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';

interface RolesProperties {
  user: UserQuery['user'];
}
const Roles: React.FC<RolesProperties> = ({ user }) => {
  const [{ error, fetching, data }] = useUserStatusReasonsQuery({ variables: { userID: user.id } });
  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  return (
    <div>
      <Title level={3}>
        Users Status Log
      </Title>
    </div>
  );
};

export default Roles;
