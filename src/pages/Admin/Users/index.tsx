import React from 'react';
import Title from 'antd/lib/typography/Title';

import { useUsersQuery } from 'graphql/generated';
import UsersTable from 'ui/Users/Table';

const Users: React.FC = () => {
  const { data, loading, fetchMore } = useUsersQuery({
    variables: { limit: 10 },
    fetchPolicy: 'cache-first',
  });

  if (loading && !data) {
    return <div> Loading... </div>;
  }
  if (data) {
    return (
      <div>
        <Title level={1}>
          Users
        </Title>
        <UsersTable
          loading={loading}
          users={data.users.data}
          pagination={data.users.pagination}
          fetchMore={(page, limit, orderBy, order) => fetchMore({
            variables: { page, limit, orderBy, order },
            updateQuery: (previous, { fetchMoreResult }) => {
              if (!fetchMoreResult) return previous;
              return fetchMoreResult;
            },
          })}
        />
      </div>
    );
  }
  throw new Error('Users should be printed');
};

export default Users;
