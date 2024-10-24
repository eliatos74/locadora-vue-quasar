import axios from 'axios';
import { Parameters, PaginationResponse } from './../interfaces/Utils.intrface';
import { Publisher } from 'src/interfaces/Publishers.interface';

const PublisherApi = {
  async getPublishersList(
    request: Parameters
  ): Promise<PaginationResponse<Publisher>> {
    const response = await axios.get('publisher', { params: request });

    return response.data;
  },

  async getPublisherId(id: number) {
    const response = await axios.get(`publisher/${id}`);
    return response.data;
  },

  async createPublisher(publisher: Publisher) {
    const response = await axios.post('publisher', publisher);
    return response;
  },

  async updatePublisher(publisher: Publisher) {
    const response = await axios.put('publisher', publisher);
    return response.data;
  },

  async deletePublisher(id: number) {
    await axios.delete(`publisher/${id}`);
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

export { PublisherApi };
