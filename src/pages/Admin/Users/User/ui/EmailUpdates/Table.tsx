import React from 'react';

import { EmailUpdate } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn, DateTimeColumn } from 'util/columns';
import Table from 'ui/Tables/Table';
import { SearchFetchMore } from 'ui/Tables/interfaces';
import { SearchTableProperties } from 'ui/Tables/SearchTable';

interface EmailUpdatesTableProperties extends Omit<SearchTableProperties, 'tableColumns' | 'placeholder'> {
  fetchMore: (parameters: SearchFetchMore) => void;
  getLink?: (user: EmailUpdate) => string;
  onSelectLink?: (data: EmailUpdate, index: number) => void;
  onSelect?: (data: EmailUpdate, index: number) => void;
  onDelete?: (item: EmailUpdate, index: number) => void;
}
const EmailUpdatesTable: React.FC<EmailUpdatesTableProperties> = ({
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
    new IDColumn<EmailUpdate>({ indexID: 'id', orderBy: 'id' }),
    new StringColumn<EmailUpdate>({
      indexID: 'emailNew',
      title: 'New ',
      getLink,
      onSelectLink,
    }),
    new StringColumn<EmailUpdate>({
      indexID: 'emailOld',
      title: 'Old',
      getLink,
      onSelectLink,
    }),
    new DateTimeColumn<EmailUpdate>({
      indexID: 'createdAt',
      title: 'Created at',
      getLink,
      onSelectLink,
    }),
    new StringColumn<EmailUpdate>({
      indexID: 'createdBy',
      title: 'By',
      getLink,
      onSelectLink,
    }),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<EmailUpdate>({ indexID: 'id', onSelect }));
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

export default EmailUpdatesTable;
