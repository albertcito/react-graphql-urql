import React from 'react';

import { UserToken } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn, DateTimeColumn } from 'util/columns';
import Table from 'ui/Tables/Table';
import { SearchFetchMore } from 'ui/Tables/interfaces';
import { SearchTableProperties } from 'ui/Tables/SearchTable';

interface UserTokenTableProperties extends Omit<SearchTableProperties, 'tableColumns' | 'placeholder'> {
  fetchMore: (parameters: SearchFetchMore) => void;
  getLink?: (user: UserToken) => string;
  onSelectLink?: (data: UserToken, index: number) => void;
  onSelect?: (data: UserToken, index: number) => void;
  onDelete?: (item: UserToken, index: number) => void;
}
const UserTokenTable: React.FC<UserTokenTableProperties> = ({
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
    new IDColumn<UserToken>({ indexID: 'id', orderBy: 'id' }),
    new StringColumn<UserToken>({
      indexID: 'type',
      title: 'Type',
      orderBy: 'type',
      getLink,
      onSelectLink,
    }),
    new DateTimeColumn<UserToken>({
      indexID: 'createdAt',
      title: 'Created',
      getLink,
      onSelectLink,
    }),
    new DateTimeColumn<UserToken>({
      indexID: 'expiredAt',
      title: 'Expired',
      getLink,
      onSelectLink,
    }),
    new DateTimeColumn<UserToken>({
      indexID: 'usedAt',
      title: 'Used',
      getLink,
      onSelectLink,
    }),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<UserToken>({ indexID: 'id', onSelect }));
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

export default UserTokenTable;
