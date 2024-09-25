export interface Publisher {
  id?: number;
  name: string;
  email: string;
  telephone: string;
  site: string;
}

export interface Parameters {
  search: string;
  page: number;
  size: number;
  sort: string;
  direction: 'ASC' | 'DESC';
}

export interface PaginationResponse<T> {
  content: Array<T>;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
