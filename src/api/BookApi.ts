import { PaginationResponse, Parameters } from './../interfaces/Utils.intrface';
import axios from 'axios';

import { Book } from 'src/interfaces/Books.interface';

const BookApi = {
  async getBooksList(request: Parameters): Promise<PaginationResponse<Book>> {
    const response = await axios.get('book', { params: request });
    return response.data;
  },

  async createBook(request: Book) {
    await axios.post('book', request);
  },
  async getBookId(id: number) {
    const response = await axios.get(`/book/${id}`);
    return response;
  },
  async updateBook(request: Book) {
    await axios.put('book', request);
  },

  async deleteBook(id: number) {
    await axios.delete(`book/${id}`);
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
