import React from 'react';
import Title from 'antd/lib/typography/Title';
import { FormattedMessage } from 'react-intl';

import useWindowTitle from 'util/windowTitle/useWindowTitle';
import { useUsersQuery } from 'graphql/generated';
import UsersTable, { User } from 'ui/Users/Table';
import AlertError from 'ui/Alert/AlertError';
import NoDataUrql from 'ui/NoDataUrql';
import PageProperties from 'routes/PageProperties';
import { useTableSearch } from 'ui/Tables/SearchTable/useTableSearch';

const Users: React.FC<PageProperties> = ({ route }) => {
  const { urlQuery, setUrlQuery } = useTableSearch();
  const [{ data, fetching, error }] = useUsersQuery({ variables: urlQuery });
  useWindowTitle('Users');

  if (!data) {
    return <NoDataUrql fetching={fetching} error={error} />;
  }

  return (
    <div>
      <Title level={1}>
        <FormattedMessage id='user.users' />
      </Title>
      {error && <AlertError error={error} />}
      <UsersTable
        dataSource={data.users.data}
        loading={fetching}
        values={urlQuery}
        pagination={data.users.pagination}
        fetchMore={setUrlQuery}
        getLink={(user: User) => `${route.location.pathname}/${user.id}`}
      />
    </div>
  );
};

export default Users;
