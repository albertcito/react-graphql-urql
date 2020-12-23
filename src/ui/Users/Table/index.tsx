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

interface UsersTableProperties extends Omit<SearchTableProperties, 'tableColumns'> {
  getLink?: (user: User) => string;
  onSelectLink?: (data: User, index: number) => void;
  onSelect?: (data: User, index: number) => void;
  onDelete?: (item: User, index: number) => void;
}

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
  const searchPlaceholder = 'Search by name, email or ID';
  const tableColumns = new TableColumns([
    new IDColumn<User>({
      indexID: 'id',
      orderBy: 'user_id',
      defaultSortOrder: getDefaultSortOrder('user_id', initialOrderBy, initialOrder),
    }),
    new StringColumn<User>({
      indexID: 'fullName',
      title: 'Name',
      orderBy: 'first_name',
      defaultSortOrder: getDefaultSortOrder('first_name', initialOrderBy, initialOrder),
      getLink,
      onSelectLink,
    }),
    new StringColumn<User>({
      indexID: 'email',
      title: 'Email',
      orderBy: 'email',
      defaultSortOrder: getDefaultSortOrder('email', initialOrderBy, initialOrder),
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
        initialSearch={initialSearch}
        initialOrder={initialOrder}
        initialOrderBy={initialOrderBy}
        searchPlaceholder={searchPlaceholder}
        fetchMore={fetchMore}
      />
    </div>
  );
};

export default UsersTable;
