export interface Book {
  name: string;
  author: string;
  totalQuantity?: number;
  launchDate: string;
  publisherId?: number;
}

export interface ParametersBook {
  search: string;
  availableQuantity: string;
  launchDate: string;
  page: number;
  size: number;
  sort: string;
  direction: 'ASC' | 'DESC';
}
