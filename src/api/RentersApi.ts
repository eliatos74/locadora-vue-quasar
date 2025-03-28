import axios from 'axios';
import { Renter } from 'src/interfaces/Renters.interface';
import { PaginationResponse, Parameters } from 'src/interfaces/Utils.intrface';

const RenterApi = {
  async getRentersList(
    request: Parameters
  ): Promise<PaginationResponse<Renter>> {
    const response = await axios.get('renters', { params: request });

    return response.data;
  },

  async createRenter(request: Renter) {
    await axios.post('renters', request);
  },
  async getRenterId(id: number) {
    const response = await axios.get(`/renters/${id}`);
    return response;
  },
  async updateRenter(request: Renter) {
    await axios.put('renters', request);
  },
  async deleteRenter(id: number) {
    await axios.delete(`renters/${id}`);
  },
  async getRentersSelect() {
    const request: Parameters = {
      search: '',
      page: 0,
      size: 10000,
      sort: 'id',
      direction: 'ASC',
    };
    const response = await this.getRentersList(request);
    return response.content.map((renter: Renter) => ({
      id: renter.id!,
      name: renter.name,
    }));
  },
};

export { RenterApi };
