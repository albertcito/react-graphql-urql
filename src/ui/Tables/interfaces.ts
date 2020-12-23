export interface PaginationArguments {
  page: number;
  limit: number;
}
export interface OrderByArguments {
  orderBy: string;
  order: 'ASC' | 'DESC';
}

export interface SearchFetchMore extends PaginationArguments {
  search?: string;
  order?: OrderByArguments;
}
