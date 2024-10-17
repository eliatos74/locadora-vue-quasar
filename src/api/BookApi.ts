import { PaginationResponse, Parameters } from './../interfaces/Utils.intrface';
import { Publisher } from 'src/interfaces/Publishers.interface';
import axios from 'axios';

import { PublisherApi } from './PublisherApi';
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

  async getPublisherSelect() {
    const request: Parameters = {
      search: '',
      page: 0,
      size: 10000,
      sort: 'id',
      direction: 'ASC',
    };
    const response = await PublisherApi.getPublishersList(request);
    return response.content.map((publisher: Publisher) => ({
      id: publisher.id!,
      name: publisher.name,
    }));
  },
};

export { BookApi };
