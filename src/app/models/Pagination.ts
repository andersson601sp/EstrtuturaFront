export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  filtro: string;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
