import axios from 'axios';
import { RentsRelation } from 'src/interfaces/Dashboard.interface';
import { PaginationResponse, Parameters } from 'src/interfaces/Utils.intrface';

const DashboardkApi = {
  async getRentsRelationList(
    request: Parameters
  ): Promise<PaginationResponse<RentsRelation>> {
    const response = await axios.get('rent/renters', { params: request });
    return response.data;
  },
};

export { DashboardkApi };
