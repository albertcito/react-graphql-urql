import React from 'react';

import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, StringColumn, DeleteColumn, OnSelectColumn } from 'util/columns';
import SearchTable, { SearchTableProperties } from '../../Tables/SearchTable';
import getDefaultSortOrder from './getDefaultSortOrder';

export interface User {
  id: number;
  email: string;
  fullName: string;
}

interface UsersTableProperties extends Omit<SearchTableProperties, 'tableColumns' | 'placeholder'> {
  getLink?: (user: User) => string;
  onSelectLink?: (data: User, index: number) => void;
  onSelect?: (data: User, index: number) => void;
  onDelete?: (item: User, index: number) => void;
}

const UsersTable: React.FC<UsersTableProperties> = ({
  dataSource,
  loading = false,
  values = {},
  pagination,
  fetchMore,
  getLink,
  onSelectLink,
  onSelect,
  onDelete,
}) => {
  const tableColumns = new TableColumns([
    new IDColumn<User>({
      indexID: 'id',
      orderBy: 'user_id',
      sortOrder: getDefaultSortOrder('user_id', values.orderBy, values.order),
    }),
    new StringColumn<User>({
      indexID: 'fullName',
      title: 'Name',
      orderBy: 'first_name',
      sortOrder: getDefaultSortOrder('first_name', values.orderBy, values.order),
      getLink,
      onSelectLink,
    }),
    new StringColumn<User>({
      indexID: 'email',
      title: 'Email',
      orderBy: 'email',
      sortOrder: getDefaultSortOrder('email', values.orderBy, values.order),
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

  return (
    <div className='table-view'>
      <SearchTable
        dataSource={dataSource}
        tableColumns={tableColumns}
        loading={loading}
        pagination={pagination}
        values={values}
        placeholder='Search by name, email or ID'
        fetchMore={fetchMore}
      />
    </div>
  );
};

export default UsersTable;
