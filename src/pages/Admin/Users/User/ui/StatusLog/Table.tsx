import React from 'react';
import { Spin, Table } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Key, SorterResult } from 'antd/lib/table/interface';

import { Pagination } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn } from 'util/columns';
import PaginationUI from 'ui/Pagination';
import { ColumnTableProperties } from 'util/columns/base/ColumnTableProperties';

export interface UserStatusReason {
  id: number;
  userID: number;
  userStatusID: string;
  reason: string;
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
  order?: OrderByArguments;
}

interface UserStatusReasonsTableProperties {
  reasons: UserStatusReason[];
  loading?: boolean;
  pagination: Pagination;
  fetchMore: (parameters: UserFetchMore) => void;
  getLink?: (user: UserStatusReason) => string;
  onSelectLink?: (data: UserStatusReason, index: number) => void;
  onSelect?: (data: UserStatusReason, index: number) => void;
  onDelete?: (item: UserStatusReason, index: number) => void;
}
const UserStatusReasonsTable: React.FC<UserStatusReasonsTableProperties> = ({
  reasons,
  loading = false,
  pagination,
  fetchMore,
  getLink,
  onSelectLink,
  onSelect,
  onDelete,
}) => {
  const tableColumns = new TableColumns([
    new IDColumn<UserStatusReason>({ indexID: 'id', orderBy: 'user_id' }),
    new StringColumn<UserStatusReason>({
      indexID: 'userStatusID',
      title: 'userStatusID',
      orderBy: 'userStatusID',
      getLink,
      onSelectLink,
    }),
    new StringColumn<UserStatusReason>({
      indexID: 'reason',
      title: 'Reason',
      getLink,
      onSelectLink,
    }),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<UserStatusReason>({ indexID: 'id', onSelect }));
  }
  if (onDelete) {
    tableColumns.append(new DeleteColumn({ onDelete }));
  }
  const columns = tableColumns.getColumns();

  const onChangeTable = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, (Key | boolean)[] | null>,
    sorter: SorterResult<UserStatusReason> | SorterResult<UserStatusReason>[],
  ) => {
    if (Array.isArray(sorter)) { return; }
    if (!sorter.column) {
      fetchMore({
        page: pagination.page,
        limit: pagination.limit,
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
      });
    }
  };

  return (
    <div className='table-view'>
      <Spin spinning={loading}>
        <PaginationUI
          pagination={pagination}
          onChange={(page, limit) => fetchMore({ page, limit })}
          small
        />
        <Table
          columns={columns}
          dataSource={reasons}
          pagination={false}
          onChange={onChangeTable}
          rowKey={(user) => user.id}
        />
        <PaginationUI
          pagination={pagination}
          onChange={(page, limit) => fetchMore({ page, limit })}
        />
      </Spin>
    </div>
  );
};

export default UserStatusReasonsTable;
