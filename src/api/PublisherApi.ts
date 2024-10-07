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
    console.log(publisher);
    const response = await axios.put('publisher', publisher);
    return response.data;
  },

  async deletePublisher(id: number) {
    await axios.delete(`publisher/${id}`);
  },
};

export { PublisherApi };
