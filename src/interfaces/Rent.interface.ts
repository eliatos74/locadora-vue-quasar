export interface RentCreate {
  renterId: string;
  bookId: string;
  deadline: string;
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
