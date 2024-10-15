export interface Book {
  id?: number;
  name: string;
  author: string;
  totalQuantity?: number;
  launchDate: string;
  publisherId?: number | string;
}

export interface BookEdit {
  id?: number;
  name: string;
  author: string;
  totalQuantity?: number;
  launchDate: string;
  publisherName: string;
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
