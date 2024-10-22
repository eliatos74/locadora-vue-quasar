import axios from 'axios';
import { Renter } from 'src/interfaces/Renters.interface';
import { PaginationResponse, Parameters } from 'src/interfaces/Utils.intrface';

const RenterApi = {
  async getRentersList(
    request: Parameters
  ): Promise<PaginationResponse<Renter>> {
    const response = await axios.get('renter', { params: request });

    return response.data;
  },

  async createRenter(request: Renter) {
    await axios.post('renter', request);
  },
  async getRenterId(id: number) {
    const response = await axios.get(`/renter/${id}`);
    return response;
  },
  async updateRenter(request: Renter) {
    await axios.put('renter', request);
  },
};

export { RenterApi };
