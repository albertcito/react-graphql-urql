import React from 'react';
import Title from 'antd/lib/typography/Title';

import { UserQuery, useRolesQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import UserRolesForm from './UserRolesForm';
import { StructFormat } from 'util/stateHandler/struct';

interface RolesProperties {
  user: UserQuery['user'];
}
const Roles: React.FC<RolesProperties> = ({ user }) => {
  const [{ error, fetching, data }] = useRolesQuery();

  const onSave = (values: StructFormat<boolean>) => {
    console.log(values);
  };

  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  return (
    <div>
      <Title level={3}>
        Users
      </Title>
      <UserRolesForm
        roles={data.roles.data}
        userRoles={user.roles}
        onSave={onSave}
        loading={false}
      />
    </div>
  );
};

export default Roles;
