export interface RentCreate {
  renterId: string;
  bookId: string;
  deadline: string;
}

export interface ParametersRent {
  search: string;
  status: string;
  page: number;
  size: number;
  sort: string;
  direction: 'ASC' | 'DESC';
}

export interface RentList {
  id: number;
  renterName: string;
  bookName: string;
  status: string;
  devolutionDate: string;
  deadLineDate: string;
  rentDate: string;
}
