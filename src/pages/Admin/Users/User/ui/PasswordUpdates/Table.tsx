import React from 'react';

import { PasswordUpdate } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn, DateTimeColumn } from 'util/columns';
import Table from 'ui/Tables/Table';
import { SearchFetchMore } from 'ui/Tables/interfaces';
import { SearchTableProperties } from 'ui/Tables/SearchTable';

interface PasswordUpdatesTableProperties extends Omit<SearchTableProperties, 'tableColumns' | 'placeholder'> {
  fetchMore: (parameters: SearchFetchMore) => void;
  getLink?: (user: PasswordUpdate) => string;
  onSelectLink?: (data: PasswordUpdate, index: number) => void;
  onSelect?: (data: PasswordUpdate, index: number) => void;
  onDelete?: (item: PasswordUpdate, index: number) => void;
}
const PasswordUpdatesTable: React.FC<PasswordUpdatesTableProperties> = ({
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
    new IDColumn<PasswordUpdate>({ indexID: 'id', orderBy: 'id' }),
    new DateTimeColumn<PasswordUpdate>({
      indexID: 'createdAt',
      title: 'Created at',
      getLink,
      onSelectLink,
    }),
    new StringColumn<PasswordUpdate>({
      indexID: 'createdBy',
      title: 'By',
      getLink,
      onSelectLink,
    }),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<PasswordUpdate>({ indexID: 'id', onSelect }));
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

export default PasswordUpdatesTable;
