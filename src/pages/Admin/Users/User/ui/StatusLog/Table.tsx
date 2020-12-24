import React from 'react';

import { UserStatusReason } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn, DateTimeColumn } from 'util/columns';
import Table from 'ui/Tables/Table';
import { SearchFetchMore } from 'ui/Tables/interfaces';
import { SearchTableProperties } from 'ui/Tables/SearchTable';

interface UserStatusReasonsTableProperties extends Omit<SearchTableProperties, 'tableColumns' | 'placeholder'> {
  fetchMore: (parameters: SearchFetchMore) => void;
  getLink?: (user: UserStatusReason) => string;
  onSelectLink?: (data: UserStatusReason, index: number) => void;
  onSelect?: (data: UserStatusReason, index: number) => void;
  onDelete?: (item: UserStatusReason, index: number) => void;
}
const UserStatusReasonsTable: React.FC<UserStatusReasonsTableProperties> = ({
  dataSource,
  loading,
  pagination,
  fetchMore,
  getLink,
  onSelectLink,
  onSelect,
  onDelete,
}) => {
  const tableColumns = new TableColumns([
    new IDColumn<UserStatusReason>({ indexID: 'id', orderBy: 'id' }),
    new StringColumn<UserStatusReason>({
      indexID: 'userStatusID',
      title: 'Status',
      orderBy: 'user_status_id',
      getLink,
      onSelectLink,
    }),
    new StringColumn<UserStatusReason>({
      indexID: 'reason',
      title: 'Reason',
      getLink,
      onSelectLink,
    }),
    new StringColumn<UserStatusReason>({
      indexID: 'createdBy',
      title: 'createdBy',
      getLink,
      onSelectLink,
    }),
    new DateTimeColumn<UserStatusReason>({
      indexID: 'createdAt',
      title: 'createdAt',
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

  return (
    <Table
      dataSource={dataSource}
      tableColumns={tableColumns}
      loading={loading}
      pagination={pagination}
      fetchMore={fetchMore}
    />
  );
};

export default UserStatusReasonsTable;
