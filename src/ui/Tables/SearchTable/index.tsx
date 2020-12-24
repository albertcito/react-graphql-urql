/* eslint-disable unicorn/no-useless-undefined */
import React, { useState } from 'react';
import { Spin, Table, Input } from 'antd';
import { TablePaginationConfig, TableProps } from 'antd/lib/table';
import { Key, SorterResult } from 'antd/lib/table/interface';

import { Pagination } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import PaginationUI from 'ui/Pagination';
import { ColumnTableProperties } from 'util/columns/base/ColumnTableProperties';
import { OrderByArguments, SearchFetchMore } from '../interfaces';

export interface values {
  search?: string;
  order?: OrderByArguments['order'];
  orderBy?: string;
}

export interface SearchTableProperties {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: TableProps<any>['dataSource'];
  tableColumns: TableColumns,
  loading?: boolean;
  pagination: Pagination;
  values?: values;
  order?: OrderByArguments['order'];
  orderBy?: string;
  placeholder?: string;
  hideSearch?: boolean;
  fetchMore: (parameters: SearchFetchMore) => void;
}

const SearchTable: React.FC<SearchTableProperties> = ({
  dataSource,
  loading = false,
  values = {},
  placeholder,
  pagination,
  tableColumns,
  fetchMore,
  hideSearch,
}) => {
  const [search, setSearch] = useState(values.search);

  const onChangeTable = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, (Key | boolean)[] | null>,
    sorter: SorterResult<unknown> | SorterResult<unknown>[],
  ) => {
    if (Array.isArray(sorter)) { return; }
    if (!sorter.column) {
      fetchMore({
        page: pagination.page,
        limit: pagination.limit,
        search,
      });
    } else {
      const column = sorter.column as ColumnTableProperties;
      const newOrder = (sorter.order === 'ascend') ? 'ASC' : 'DESC';
      const columnOrder = column.orderBy
        ? {
          orderBy: column.orderBy,
          order: newOrder,
        } as OrderByArguments : undefined;
      fetchMore({
        page: 1,
        limit: pagination.limit,
        order: columnOrder,
        search,
      });
    }
  };

  const onSearch = (value: string) => {
    fetchMore({
      page: 1,
      limit: pagination.limit,
      search: value,
    });
  };

  const onPagination = (page: number, limit: number) => {
    const newOrder = (values.order && values.orderBy)
      ? { order: values.order, orderBy: values.orderBy }
      : undefined;
    fetchMore({ page, limit, search, order: newOrder });
  };

  return (
    <div className='table-view'>
      <Spin spinning={loading}>
        {!hideSearch && (
          <Input.Search
            placeholder={placeholder}
            onSearch={onSearch}
            enterButton
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        )}
        <PaginationUI
          pagination={pagination}
          onChange={onPagination}
          small
        />
        <Table
          columns={tableColumns.getColumns()}
          dataSource={dataSource}
          pagination={false}
          onChange={onChangeTable}
          rowKey={(user) => user.id}
        />
        <PaginationUI
          pagination={pagination}
          onChange={onPagination}
        />
      </Spin>
    </div>
  );
};

export default SearchTable;
