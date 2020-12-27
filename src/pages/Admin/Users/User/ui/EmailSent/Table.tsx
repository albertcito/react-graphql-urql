import React from 'react';

import { EmailLog } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn, DateTimeColumn } from 'util/columns';
import Table from 'ui/Tables/Table';
import { SearchFetchMore } from 'ui/Tables/interfaces';
import { SearchTableProperties } from 'ui/Tables/SearchTable';

interface EmailSentTableProperties extends Omit<SearchTableProperties, 'tableColumns' | 'placeholder'> {
  fetchMore: (parameters: SearchFetchMore) => void;
  getLink?: (user: EmailLog) => string;
  onSelectLink?: (data: EmailLog, index: number) => void;
  onSelect?: (data: EmailLog, index: number) => void;
  onDelete?: (item: EmailLog, index: number) => void;
}
const EmailSentTable: React.FC<EmailSentTableProperties> = ({
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
    new IDColumn<EmailLog>({ indexID: 'id', orderBy: 'id' }),
    new StringColumn<EmailLog>({
      indexID: 'from',
      title: 'From',
      getLink,
      onSelectLink,
    }),
    new StringColumn<EmailLog>({
      indexID: 'fromName',
      title: 'Name',
      getLink,
      onSelectLink,
    }),
    new DateTimeColumn<EmailLog>({
      indexID: 'sentAt',
      title: 'Sent at',
      getLink,
      onSelectLink,
    }),
    new StringColumn<EmailLog>({
      indexID: 'createdBy',
      title: 'By',
      getLink,
      onSelectLink,
    }),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<EmailLog>({ indexID: 'id', onSelect }));
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

export default EmailSentTable;
