import React from 'react';

import { OauthAccessToken } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn, DateTimeColumn } from 'util/columns';
import Table from 'ui/Tables/Table';
import { SearchFetchMore } from 'ui/Tables/interfaces';
import { SearchTableProperties } from 'ui/Tables/SearchTable';

type AuthAccess = OauthAccessToken;
interface AuthAccessTableProperties extends Omit<SearchTableProperties, 'tableColumns' | 'placeholder'> {
  fetchMore: (parameters: SearchFetchMore) => void;
  getLink?: (user: AuthAccess) => string;
  onSelectLink?: (data: AuthAccess, index: number) => void;
  onSelect?: (data: AuthAccess, index: number) => void;
  onDelete?: (item: AuthAccess, index: number) => void;
}
const AuthAccessTable: React.FC<AuthAccessTableProperties> = ({
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
    new IDColumn<AuthAccess>({ indexID: 'id', orderBy: 'id' }),
    new DateTimeColumn<AuthAccess>({
      indexID: 'createdAt',
      title: 'Created',
      getLink,
      onSelectLink,
    }),
    new DateTimeColumn<AuthAccess>({
      indexID: 'expiredAt',
      title: 'Expired',
      getLink,
      onSelectLink,
    }),
    new StringColumn<AuthAccess>({
      indexID: 'revoked',
      title: 'Revoked',
      getLink,
      onSelectLink,
    }),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<AuthAccess>({ indexID: 'id', onSelect }));
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

export default AuthAccessTable;
