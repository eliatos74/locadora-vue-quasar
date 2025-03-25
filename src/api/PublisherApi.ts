import axios from 'axios';
import { Parameters, PaginationResponse } from './../interfaces/Utils.intrface';
import { Publisher } from 'src/interfaces/Publishers.interface';

const PublisherApi = {
  async getPublishersList(
    request: Parameters
  ): Promise<PaginationResponse<Publisher>> {
    const response = await axios.get('publishers', { params: request });

    return response.data;
  },

  async getPublisherId(id: number) {
    const response = await axios.get(`publishers/${id}`);
    return response.data;
  },

  async createPublisher(publisher: Publisher) {
    const response = await axios.post('publishers', publisher);
    return response;
  },

  async updatePublisher(publisher: Publisher) {
    const response = await axios.put('publishers', publisher);
    return response.data;
  },

  async deletePublisher(id: number) {
    await axios.delete(`publishers/${id}`);
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
