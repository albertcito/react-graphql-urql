import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

import { SearchFetchMore } from '../interfaces';

export interface TableSearchURLParameters {
  page: number;
  limit: number;
  search?: string;
  order?: 'ASC'|'DESC';
  orderBy?: string;
}

export const defaultSearch = {
  page: 1,
  limit: 10,
};

function getURLParameters(query: string): TableSearchURLParameters {
  const { page, limit, search, order, orderBy } = queryString.parse(query, { parseNumbers: true });
  return {
    page: Number.isInteger(page) ? page as number : 1,
    limit: Number.isInteger(limit) ? limit as number : 10,
    search: search as string ?? undefined,
    order: order as 'ASC'|'DESC' ?? undefined,
    orderBy: orderBy as string ?? undefined,
  };
}

export const useTableSearch = () => {
  const location = useLocation();
  const history = useHistory();

  const [urlQuery, setInternalQuery] = useState<TableSearchURLParameters>(defaultSearch);
  const { search } = location;
  useEffect(() => {
    setInternalQuery(getURLParameters(search));
  }, [search]);

  const setUrlQuery = ({ order, search: search_, ...other }: SearchFetchMore) => {
    const searchString = (search_ && search_.trim().length > 0) ? search_ : undefined;
    history.push({
      pathname: location.pathname,
      search: `?${queryString.stringify({ search: searchString, ...other, ...order })}`,
    });
  };

  return {
    urlQuery,
    setUrlQuery,
  };
};
