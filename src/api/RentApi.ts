import axios from 'axios';
import { RentCreate, RentList } from 'src/interfaces/Rent.interface';
import { PaginationResponse, Parameters } from 'src/interfaces/Utils.intrface';

const RentApi = {
  async getRentsList(
    request: Parameters
  ): Promise<PaginationResponse<RentList>> {
    const response = await axios.get('rents', { params: request });
    return response.data;
  },
  async createRent(request: RentCreate) {
    await axios.post('rents', request);
  },
  async deliverRent(id: number) {
    await axios.put(`rents/${id}`);
  },
};

export { RentApi };
