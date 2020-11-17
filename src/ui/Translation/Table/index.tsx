import React, { useState } from 'react';
import { Spin, Table, Input } from 'antd';
import { TablePaginationConfig } from 'antd/lib/table';
import { Key, SorterResult } from 'antd/lib/table/interface';

import { Pagination } from 'graphql/generated';
import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, DeleteColumn, TextColumn, OnSelectColumn } from 'util/columns';
import PaginationUI from 'ui/Pagination';
import { ColumnTableProperties } from 'util/columns/base/ColumnTableProperties';
import getLangColumns from 'util/columns/Langs/LangsColumn';

interface Translation {
  id: number;
  code?: string;
  isBlocked?: boolean;
  text: {
    text: string;
    langID: string;
    originalLangID: string;
  }
  texts: {
    langID: string;
    originalLangID: string;
  }[]
}

interface LangProperties {
  langID: string;
}

interface PaginationArguments {
  page: number;
  limit: number;
}
interface OrderByArguments {
  orderBy: string;
  order: 'ASC' | 'DESC';
}

interface TranslationFetchMore extends PaginationArguments {
  search?: string;
  order?: OrderByArguments;
  langID?: string;
}

interface TranslationsTableProperties {
  translations: Translation[];
  langs: LangProperties[];
  langID: string;
  loading?: boolean;
  pagination: Pagination;
  fetchMore: (parameters: TranslationFetchMore) => void;
  getLink?: (translation: Translation) => string;
  onSelect?: (data: Translation, index: number) => void;
  onSelectLink?: (data: Translation, index: number) => void;
  onDelete?: (item: Translation, index: number) => void;
}

const TranslationsTable: React.FC<TranslationsTableProperties> = ({
  translations,
  langs,
  langID,
  loading = false,
  pagination,
  fetchMore,
  getLink,
  onSelect,
  onSelectLink,
  onDelete,
}) => {
  const [search, setSearch] = useState('');

  const tableColumns = new TableColumns([
    new IDColumn<Translation>({ indexID: 'id', orderBy: 'translation.translation_id' }),
    new TextColumn<Translation>({ indexID: 'text', title: 'Text', getLink, onSelectLink }),
    ...getLangColumns('texts', langs, langID),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<Translation>({ indexID: 'id', onSelect }));
  }
  if (onDelete) {
    tableColumns.append(new DeleteColumn({ onDelete }));
  }
  const columns = tableColumns.getColumns();

  const onChangeTable = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, Key[] | null>,
    sorter: SorterResult<Translation> | SorterResult<Translation>[],
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
      const order = (sorter.order === 'ascend') ? 'ASC' : 'DESC';
      const columnOrder = column.orderBy
        ? {
          orderBy: column.orderBy,
          order,
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

  return (
    <div className='table-view'>
      <Spin spinning={loading}>
        <Input.Search
          placeholder='Search by Text or ID'
          onSearch={onSearch}
          enterButton
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <PaginationUI
          pagination={pagination}
          onChange={(page, limit) => fetchMore({ page, limit })}
          small
        />
        <Table
          columns={columns}
          dataSource={translations}
          pagination={false}
          onChange={onChangeTable}
          rowKey={(translation) => translation.id}
        />
        <PaginationUI
          pagination={pagination}
          onChange={(page, limit) => fetchMore({ page, limit, search })}
        />
      </Spin>
    </div>
  );
};

export default TranslationsTable;
