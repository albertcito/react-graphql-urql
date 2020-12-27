import React from 'react';
import Title from 'antd/lib/typography/Title';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { UserQuery, useUserAuthAccessQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import AuthAccessTable from './Table';
import useTable from 'ui/Tables/Table/useTable';

interface AuthAccessProperties {
  user: UserQuery['user'];
}
const AuthAccess: React.FC<AuthAccessProperties> = ({ user }) => {
  const { urlQuery, setUrlQuery } = useTable();
  const [{ error, fetching, data }] = useUserAuthAccessQuery(
    { variables: { userID: user.id, ...urlQuery } },
  );
  useWindowTitle(`Email updated - ${user.fullName}`);
  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }
  return (
    <div>
      <Title level={3}>
        Auth Access
      </Title>
      <AuthAccessTable
        dataSource={data.userAuthAccess.data}
        pagination={data.userAuthAccess.pagination}
        loading={fetching}
        values={urlQuery}
        fetchMore={setUrlQuery}
      />
    </div>
  );
};

export default AuthAccess;
