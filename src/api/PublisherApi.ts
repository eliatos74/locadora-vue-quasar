import axios from 'axios';
import { Parameters } from '../interfaces/Publishers.interface';

const PublisherApi = {
  async getPublishersList(request: Parameters) {
    const response = await axios.get('publisher', { params: request });
    const vetor = response.data.content;

    const publishers = [];

    for (let index = 0; index < vetor.length; index++) {
      const publisher = await this.getPublisherId(vetor[index].id);
      publishers.push(publisher);
    }

    return publishers;
  },
  async getPublisherId(id: number) {
    const response = await axios.get(`publisher/${id}`);
    return response.data;
  },
  createPublisher() {},
  updatePublisher() {},
  deletePublisher() {},
};

export { PublisherApi };
