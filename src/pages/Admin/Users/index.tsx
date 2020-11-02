import React from 'react';
import Title from 'antd/lib/typography/Title';

import { useUsersQuery } from 'graphql/generated';
import UsersTable from 'ui/Users/Table';

const Users: React.FC = () => {
  const [{ data, fetching }, getUsers] = useUsersQuery({ variables: { limit: 10 } });

  if (fetching && !data) {
    return <div> Loading... </div>;
  }

  if (data) {
    return (
      <div>
        <Title level={1}>
          Users
        </Title>
        <UsersTable
          loading={fetching}
          users={data.users.data}
          pagination={data.users.pagination}
          fetchMore={console.log}
          /* fetchMore={(variables) => getUsers({
            variables,
            updateQuery: (previous, { fetchMoreResult }) => {
              if (!fetchMoreResult) return previous;
              return fetchMoreResult;
            },
          })} */
        />
      </div>
    );
  }
  return <div>sdasdas</div>;
};

export default Users;
