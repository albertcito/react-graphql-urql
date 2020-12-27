import React from 'react';
import Title from 'antd/lib/typography/Title';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { UserQuery, useUserTokensQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import UserTokenTable from './Table';
import useTable from 'ui/Tables/Table/useTable';

interface UserTokensProperties {
  user: UserQuery['user'];
}
const UserTokens: React.FC<UserTokensProperties> = ({ user }) => {
  const { urlQuery, setUrlQuery } = useTable();
  const [{ error, fetching, data }] = useUserTokensQuery(
    { variables: { userID: user.id, ...urlQuery } },
  );
  useWindowTitle(`Email updated - ${user.fullName}`);
  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }
  return (
    <div>
      <Title level={3}>
        Tokens
      </Title>
      <UserTokenTable
        dataSource={data.userTokens.data}
        pagination={data.userTokens.pagination}
        loading={fetching}
        values={urlQuery}
        fetchMore={setUrlQuery}
      />
    </div>
  );
};

export default UserTokens;
