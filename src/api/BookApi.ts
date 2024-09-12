import axios from 'axios';

import { Parameters } from '../interfaces/Books.interface';

const BookApi = {
  async getBooksList(request: Parameters) {
    const response = await axios.get('book', { params: request });
    return response.data.content;
  },
  getBookId() {},
  createBook() {},
  updateBook() {},
  deleteBook() {},
};

export { BookApi };
