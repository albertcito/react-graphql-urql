import React from 'react';
import Title from 'antd/lib/typography/Title';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { UserQuery, usePasswordUpdatesQuery } from 'graphql/generated';
import NoDataUrql from 'ui/NoDataUrql';
import PasswordUpdatesTable from './Table';
import useTable from 'ui/Tables/Table/useTable';

interface StatusLogProperties {
  user: UserQuery['user'];
}
const PasswordUpdates: React.FC<StatusLogProperties> = ({ user }) => {
  const { urlQuery, setUrlQuery } = useTable();
  const [{ error, fetching, data }] = usePasswordUpdatesQuery(
    { variables: { userID: user.id, ...urlQuery } },
  );
  useWindowTitle(`Email updated - ${user.fullName}`);
  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }
  return (
    <div>
      <Title level={3}>
        Password Updates
      </Title>
      <PasswordUpdatesTable
        dataSource={data.passwordUpdates.data}
        pagination={data.passwordUpdates.pagination}
        loading={fetching}
        values={urlQuery}
        fetchMore={setUrlQuery}
      />
    </div>
  );
};

export default PasswordUpdates;
