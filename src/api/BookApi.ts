import { PaginationResponse, Parameters } from './../interfaces/Utils.intrface';
import axios from 'axios';

import { Book } from 'src/interfaces/Books.interface';

const BookApi = {
  async getBooksList(request: Parameters): Promise<PaginationResponse<Book>> {
    const response = await axios.get('books', { params: request });
    return response.data;
  },

  async createBook(request: Book) {
    await axios.post('books', request);
  },
  async getBookId(id: number) {
    const response = await axios.get(`/books/${id}`);
    return response;
  },
  async updateBook(request: Book) {
    await axios.put('books', request);
  },

  async deleteBook(id: number) {
    await axios.delete(`books/${id}`);
  },
  async getBooksSelect() {
    const request: Parameters = {
      search: '',
      page: 0,
      size: 10000,
      sort: 'id',
      direction: 'ASC',
    };
    const response = await this.getBooksList(request);
    return response.content.map((book: Book) => ({
      id: book.id!,
      name: book.name,
    }));
  },
};

export { BookApi };
