import React, { useState } from 'react';
import { Spin, Table, Input } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Key, SorterResult } from 'antd/lib/table/interface';

import { Pagination } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn } from 'util/columns';
import PaginationUI from 'ui/Pagination';
import { ColumnTableProperties } from 'util/columns/base/ColumnTableProperties';

interface User {
  userID: number;
  email: string;
  fullName: string;
}

interface PaginationArguments {
  page: number;
  limit: number;
}
interface OrderByArguments {
  orderBy: string;
  order: 'ASC' | 'DESC';
}

interface UserFetchMore extends Partial<OrderByArguments>, Partial<PaginationArguments> {
  search?: string;
}

interface UsersTableProperties {
  users: User[];
  loading?: boolean;
  pagination: Pagination;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchMore: (parameters: UserFetchMore) => void;
}
const UsersTable: React.FC<UsersTableProperties> = ({
  users,
  loading = false,
  pagination,
  fetchMore,
}) => {

  const [search, setSearch] = useState('');

  const tableColumns = new TableColumns([
    new IDColumn<User>({ indexID: 'userID', orderBy: 'user_id' }),
    new StringColumn<User>({ indexID: 'fullName', title: 'Name', orderBy: 'first_name' }),
    new StringColumn<User>({ indexID: 'email', title: 'Email', orderBy: 'email' }),
    new DeleteColumn({ onDelete: console.log }),
  ]);
  const columns = tableColumns.getColumns();

  const onChangeTable = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, Key[] | null>,
    sorter: SorterResult<User> | SorterResult<User>[],
  ) => {
    if (Array.isArray(sorter)) { return; }
    if (!sorter.column) {
      fetchMore({
        page: pagination.page,
        limit: pagination.limit,
        search,
      });
    } else {
      const column = sorter.column as ColumnTableProperties;
      const order = (sorter.order === 'ascend') ? 'ASC' : 'DESC';
      fetchMore({
        page: 1,
        limit: pagination.limit,
        orderBy: column.orderBy,
        order,
        search,
      });
    }
  };

  const onSearch = (value: string) => {
    fetchMore({
      page: 1,
      limit: pagination.limit,
      search: value,
    });
  };

  return (
    <div className='table-view'>
      <Spin spinning={loading}>
        <Input.Search
          placeholder='Input name, email or ID'
          onSearch={onSearch}
          enterButton
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <PaginationUI
          pagination={pagination}
          onChange={(page, limit) => fetchMore({ page, limit })}
          small
        />
        <Table
          columns={columns}
          dataSource={users}
          pagination={false}
          onChange={onChangeTable}
        />
        <PaginationUI
          pagination={pagination}
          onChange={(page, limit) => fetchMore({ page, limit, search })}
        />
      </Spin>
    </div>
  );
};

export default UsersTable;
