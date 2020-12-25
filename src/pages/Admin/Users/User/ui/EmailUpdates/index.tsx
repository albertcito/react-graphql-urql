import React from 'react';
import Title from 'antd/lib/typography/Title';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { UserQuery, useEmailUpdatesQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import UserStatusReasonsTable from './Table';
import useTable from 'ui/Tables/Table/useTable';

interface StatusLogProperties {
  user: UserQuery['user'];
}
const EmailUpdates: React.FC<StatusLogProperties> = ({ user }) => {
  const { urlQuery, setUrlQuery } = useTable();
  const [{ error, fetching, data }] = useEmailUpdatesQuery(
    { variables: { userID: user.id, ...urlQuery } },
  );
  useWindowTitle(`Email updated - ${user.fullName}`);
  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }
  return (
    <div>
      <Title level={3}>
        Email Updates
      </Title>
      <UserStatusReasonsTable
        dataSource={data.emailUpdates.data}
        pagination={data.emailUpdates.pagination}
        loading={fetching}
        values={urlQuery}
        fetchMore={setUrlQuery}
      />
    </div>
  );
};

export default EmailUpdates;
