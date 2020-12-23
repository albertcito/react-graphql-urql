import React, { useState } from 'react';
import { Spin, Table, Input } from 'antd';
import { TablePaginationConfig, TableProps } from 'antd/lib/table';
import { Key, SorterResult } from 'antd/lib/table/interface';

import { Pagination } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import PaginationUI from 'ui/Pagination';
import { ColumnTableProperties } from 'util/columns/base/ColumnTableProperties';
import { OrderByArguments, SearchFetchMore } from './interfaces';

export interface SearchTableProperties {
  dataSource: TableProps<unknown>['dataSource'];
  tableColumns: TableColumns,
  loading?: boolean;
  pagination: Pagination;
  initialSearch?: string;
  initialOrder?: OrderByArguments['order'];
  initialOrderBy?: string;
  searchPlaceholder?: string;
  fetchMore: (parameters: SearchFetchMore) => void;
}

const SearchTable: React.FC<SearchTableProperties> = ({
  dataSource,
  loading = false,
  initialSearch,
  initialOrder,
  initialOrderBy,
  searchPlaceholder,
  pagination,
  tableColumns,
  fetchMore,
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [order, setOrder] = useState(initialOrder);
  const [orderBy, setOrderBy] = useState(initialOrderBy);

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
      setOrder(newOrder);
      setOrderBy(column.orderBy);
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
    const newOrder = (order && orderBy) ? { order, orderBy } : undefined;
    fetchMore({ page, limit, search, order: newOrder });
  };

  return (
    <Spin spinning={loading}>
      <Input.Search
        placeholder={searchPlaceholder}
        onSearch={onSearch}
        enterButton
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
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
  );
};

export default SearchTable;
