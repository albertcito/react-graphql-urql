import React from 'react';

import TableColumns from 'util/columns/base/TableColumns';
import { IDColumn, DeleteColumn, TextColumn, OnSelectColumn } from 'util/columns';
import getLangColumns from 'util/columns/Langs/LangsColumn';
import SearchTable, { SearchTableProperties } from '../../Tables/SearchTable';
import getDefaultSortOrder from 'ui/Users/Table/getDefaultSortOrder';

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

interface TranslationsTableProperties extends Omit<SearchTableProperties, 'tableColumns'> {
  langs: LangProperties[];
  langID: string;
  getLink?: (translation: Translation) => string;
  onSelect?: (data: Translation, index: number) => void;
  onSelectLink?: (data: Translation, index: number) => void;
  onDelete?: (item: Translation, index: number) => void;
}

const TranslationsTable: React.FC<TranslationsTableProperties> = ({
  dataSource,
  langs,
  langID,
  loading = false,
  pagination,
  values = {},
  placeholder,
  fetchMore,
  getLink,
  onSelect,
  onSelectLink,
  onDelete,
}) => {
  const tableColumns = new TableColumns([
    new IDColumn<Translation>({
      indexID: 'id',
      orderBy: 'id',
      sortOrder: getDefaultSortOrder('id', values.orderBy, values.order),
    }),
    new TextColumn<Translation>({ indexID: 'text', title: 'Text', getLink, onSelectLink }),
    ...getLangColumns('texts', langs, langID),
  ]);
  if (onSelect) {
    tableColumns.append(new OnSelectColumn<Translation>({ indexID: 'id', onSelect }));
  }
  if (onDelete) {
    tableColumns.append(new DeleteColumn({ onDelete }));
  }

  return (
    <div className='table-view'>
      <SearchTable
        dataSource={dataSource}
        tableColumns={tableColumns}
        values={values}
        loading={loading}
        pagination={pagination}
        placeholder={placeholder}
        fetchMore={fetchMore}
      />
    </div>
  );
};

export default TranslationsTable;
