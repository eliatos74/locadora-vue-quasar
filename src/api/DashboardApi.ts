import axios from 'axios';
import { Parameters } from 'src/interfaces/Utils.intrface';

const DashboardkApi = {
  async getRentsRelationList() {
    const request: Parameters = {
      search: '',
      page: 0,
      size: 10000,
      sort: 'id',
      direction: 'ASC',
    };
    const response = await axios.get('rent/renters', { params: request });
    return response.data.content;
  },
};

export { DashboardkApi };
