import axios from 'axios';
import { RentList } from 'src/interfaces/Rent.interface';
import { PaginationResponse, Parameters } from 'src/interfaces/Utils.intrface';

const RentApi = {
  async getRentsList(
    request: Parameters
  ): Promise<PaginationResponse<RentList>> {
    const response = await axios.get('rent', { params: request });
    return response.data;
  },
};

export { RentApi };
