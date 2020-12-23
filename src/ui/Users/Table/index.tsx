import React, { useState } from 'react';
import { Spin, Table, Input } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Key, SorterResult } from 'antd/lib/table/interface';

import { Pagination } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn } from 'util/columns';
import PaginationUI from 'ui/Pagination';
import { ColumnTableProperties } from 'util/columns/base/ColumnTableProperties';

export interface User {
  id: number;
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

interface UserFetchMore extends PaginationArguments {
  search?: string;
  order?: OrderByArguments;
}

interface UsersTableProperties {
  users: User[];
  loading?: boolean;
  pagination: Pagination;
  initialSearch?: string;
  fetchMore: (parameters: UserFetchMore) => void;
  getLink?: (user: User) => string;
  onSelectLink?: (data: User, index: number) => void;
  onSelect?: (data: User, index: number) => void;
  onDelete?: (item: User, index: number) => void;
}
const UsersTable: React.FC<UsersTableProperties> = ({
  users,
  loading = false,
  initialSearch,
  pagination,
  fetchMore,
  getLink,
  onSelectLink,
  onSelect,
  onDelete,
}) => {
  const [search, setSearch] = useState(initialSearch);

  const tableColumns = new TableColumns([
    new IDColumn<User>({ indexID: 'id', orderBy: 'user_id' }),
    new StringColumn<User>({ indexID: 'fullName', title: 'Name', orderBy: 'first_name', getLink, onSelectLink }),
    new StringColumn<User>({ indexID: 'email', title: 'Email', orderBy: 'email', getLink, onSelectLink }),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<User>({ indexID: 'id', onSelect }));
  }
  if (onDelete) {
    tableColumns.append(new DeleteColumn({ onDelete }));
  }
  const columns = tableColumns.getColumns();

  const onChangeTable = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, (Key | boolean)[] | null>,
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
      const columnOrder = column.orderBy
        ? {
          orderBy: column.orderBy,
          order,
        } as OrderByArguments : undefined;
      fetchMore({
        page: 1,
        limit: pagination.limit,
        order: columnOrder,
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
          placeholder='Search by name, email or ID'
          onSearch={onSearch}
          enterButton
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <PaginationUI
          pagination={pagination}
          onChange={(page, limit) => fetchMore({ page, limit, search })}
          small
        />
        <Table
          columns={columns}
          dataSource={users}
          pagination={false}
          onChange={onChangeTable}
          rowKey={(user) => user.id}
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
