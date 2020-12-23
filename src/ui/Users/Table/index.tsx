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
  dataSource: User[];
  loading?: boolean;
  pagination: Pagination;
  initialSearch?: string;
  initialOrder?: OrderByArguments['order'];
  initialOrderBy?: string;
  fetchMore: (parameters: UserFetchMore) => void;
  getLink?: (user: User) => string;
  onSelectLink?: (data: User, index: number) => void;
  onSelect?: (data: User, index: number) => void;
  onDelete?: (item: User, index: number) => void;
}

const orderToAnt = (
  orderBy: string, initialOrderBy?: string, initialOrder?: string,
) => {
  if (orderBy === initialOrderBy && initialOrder) {
    switch (initialOrder) {
      case 'ASC': return 'ascend';
      default: return 'descend';
    }
  }
  // eslint-disable-next-line unicorn/no-useless-undefined
  return undefined;
};

const UsersTable: React.FC<UsersTableProperties> = ({
  dataSource,
  loading = false,
  initialSearch,
  initialOrder,
  initialOrderBy,
  pagination,
  fetchMore,
  getLink,
  onSelectLink,
  onSelect,
  onDelete,
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [order, setOrder] = useState(initialOrder);
  const [orderBy, setOrderBy] = useState(initialOrderBy);

  const searchPlaceholder = 'Search by name, email or ID';
  const tableColumns = new TableColumns([
    new IDColumn<User>({
      indexID: 'id',
      orderBy: 'user_id',
      defaultSortOrder: orderToAnt('user_id', initialOrderBy, initialOrder),
    }),
    new StringColumn<User>({
      indexID: 'fullName',
      title: 'Name',
      orderBy: 'first_name',
      defaultSortOrder: orderToAnt('first_name', initialOrderBy, initialOrder),
      getLink,
      onSelectLink,
    }),
    new StringColumn<User>({
      indexID: 'email',
      title: 'Email',
      orderBy: 'email',
      defaultSortOrder: orderToAnt('email', initialOrderBy, initialOrder),
      getLink,
      onSelectLink,
    }),
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
    sorter: SorterResult<unknown> | SorterResult<unknown>[],
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
      const newOrder = (sorter.order === 'ascend') ? 'ASC' : 'DESC';
      const columnOrder = column.orderBy
        ? {
          orderBy: column.orderBy,
          order: newOrder,
        } as OrderByArguments : undefined;
      setOrder(newOrder);
      setOrderBy(column.orderBy);
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

  const onPagination = (page: number, limit: number) => {
    const newOrder = (order && orderBy) ? { order, orderBy } : undefined;
    fetchMore({ page, limit, search, order: newOrder });
  };

  return (
    <div className='table-view'>
      <Spin spinning={loading}>
        <Input.Search
          placeholder={searchPlaceholder}
          onSearch={onSearch}
          enterButton
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <PaginationUI
          pagination={pagination}
          onChange={onPagination}
          small
        />
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          onChange={onChangeTable}
          rowKey={(user) => user.id}
        />
        <PaginationUI
          pagination={pagination}
          onChange={onPagination}
        />
      </Spin>
    </div>
  );
};

export default UsersTable;
