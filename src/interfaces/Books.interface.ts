export interface Book {
  id: number;
  name: string;
  author: string;
  totalQuantity: number;
  availableQuantity: number;
  inUseQuantity: number;
}

export interface Parameters {
  search: string;
  page: number;
  size: number;
  sort: string;
  direction: 'ASC' | 'DESC';
}
