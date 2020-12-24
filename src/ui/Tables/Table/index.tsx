import React from 'react';

import { OrderByArguments } from '../interfaces';
import SearchTable, { SearchTableProperties } from '../SearchTable';

interface TableProperties extends Omit<SearchTableProperties, 'placeholder' | 'hideSearch' | 'values'> {
  values?: {
    order?: OrderByArguments['order'];
    orderBy?: string;
  }
}

const Table: React.FC<TableProperties> = (props) => <SearchTable {...props} hideSearch />;

export default Table;
