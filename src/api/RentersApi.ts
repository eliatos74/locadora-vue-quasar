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
};

export { RenterApi };
