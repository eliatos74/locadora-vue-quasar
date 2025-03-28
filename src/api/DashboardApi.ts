import axios from 'axios';
import { MostRentend } from 'src/interfaces/Dashboard.interface';
import { RentList } from 'src/interfaces/Rent.interface';
import { Parameters } from 'src/interfaces/Utils.intrface';

const request: Parameters = {
  search: '',
  page: 0,
  size: 10000,
  sort: 'id',
  direction: 'ASC',
};

const DashboardApi = {
  async getRentsRelationList() {
    const response = await axios.get('rents/renters', { params: request });
    return response.data.content;
  },

  async getRefundInformation() {
    const response = await axios.get('rents', { params: request });
    const data = response.data.content;

    const counters = {
      valueDeliver: 0,
      valueDeliverDelay: 0,
    };
    data.map((rent: RentList) => {
      if (rent.status === 'DELIVERED') {
        counters.valueDeliver++;
      }
      if (rent.status === 'DELIVERED_WITH_DELAY') {
        counters.valueDeliverDelay++;
      }
    });
    return counters;
  },
  async getMostRentedBooks() {
    const count = 3;
    const data: MostRentend[] = [];

    for (let i = 0; i < count; i++) {
      const response = await axios.get(`rents/most-rented/${i + 1}`);
      data.push(response.data);
    }

    return data;
  },
};

export { DashboardApi };
