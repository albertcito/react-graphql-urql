import React from 'react';
import { Spin, Table } from 'antd';
import Title from 'antd/lib/typography/Title';

import { Pagination, User, useUsersQuery } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn } from 'util/columns';
import PaginationUI from 'ui/Pagination';

interface UsersTableProperties {
  users: User[];
  loading?: boolean;
  pagination: Pagination;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchMore: (page: number, pageSize: number) => void;
}
const UsersTable: React.FC<UsersTableProperties> = ({
  users,
  loading = false,
  pagination,
  fetchMore,
}) => {
  const tableColumns = new TableColumns([
    new IDColumn<User>({ indexID: 'userID' }),
    new StringColumn<User>({ indexID: 'fullName', title: 'First Name' }),
    new StringColumn<User>({ indexID: 'email', title: 'Email' }),
    new DeleteColumn({ onDelete: console.log }),
  ]);
  const columns = tableColumns.getColumns();

  return (
    <div className='table-view'>
      <PaginationUI
        pagination={pagination}
        onChange={fetchMore}
        small
      />
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={users}
          pagination={false}
        />
        <PaginationUI pagination={pagination} onChange={fetchMore} />
      </Spin>
    </div>
  );
};

const Users: React.FC = () => {
  const { data, loading, fetchMore } = useUsersQuery({
    variables: { limit: 10 },
    fetchPolicy: 'cache-and-network',
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
          fetchMore={(page: number, limit: number) => fetchMore({
            variables: { page, limit },
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
