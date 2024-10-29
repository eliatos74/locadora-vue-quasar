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

export interface Options {
  label: string;
  value: string;
}

export interface OptionsRole {
  role: 'ADMIN' | 'VISITOR';
}
