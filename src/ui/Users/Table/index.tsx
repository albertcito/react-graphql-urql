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
  initialValues = {},
  pagination,
  fetchMore,
  getLink,
  onSelectLink,
  onSelect,
  onDelete,
}) => {
  const placeholder = 'Search by name, email or ID';
  const tableColumns = new TableColumns([
    new IDColumn<User>({
      indexID: 'id',
      orderBy: 'user_id',
      defaultSortOrder: getDefaultSortOrder('user_id', initialValues.orderBy, initialValues.order),
    }),
    new StringColumn<User>({
      indexID: 'fullName',
      title: 'Name',
      orderBy: 'first_name',
      defaultSortOrder: getDefaultSortOrder('first_name', initialValues.orderBy, initialValues.order),
      getLink,
      onSelectLink,
    }),
    new StringColumn<User>({
      indexID: 'email',
      title: 'Email',
      orderBy: 'email',
      defaultSortOrder: getDefaultSortOrder('email', initialValues.orderBy, initialValues.order),
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
        initialValues={initialValues}
        placeholder={placeholder}
        fetchMore={fetchMore}
      />
    </div>
  );
};

export default UsersTable;
