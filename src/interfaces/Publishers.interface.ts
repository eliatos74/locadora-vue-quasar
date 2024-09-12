export interface Publisher {
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
