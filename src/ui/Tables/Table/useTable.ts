import { useTableSearch, TableSearchURLParameters } from '../SearchTable/useTableSearch';
import { SearchFetchMore } from '../interfaces';

export type TableURLParameters = Omit<TableSearchURLParameters, 'search'>;
export type SearchFetchMore2 = Omit<SearchFetchMore, 'search'>;

interface UseTableReturn {
  urlQuery: TableURLParameters;
  setUrlQuery: (values: SearchFetchMore) => void;
}
const useTable = (): UseTableReturn => {
  const { urlQuery, setUrlQuery } = useTableSearch();
  return {
    urlQuery,
    setUrlQuery,
  };
};

export default useTable;
