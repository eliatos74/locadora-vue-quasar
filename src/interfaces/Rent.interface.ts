export interface RentCreate {
  renterId: number;
  bookId: number;
  deadlin: string;
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
