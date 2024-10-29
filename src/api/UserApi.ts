import { User } from './../interfaces/Users.interface';
import axios from 'axios';
import { UserList } from 'src/interfaces/Users.interface';
import { PaginationResponse, Parameters } from 'src/interfaces/Utils.intrface';

const UserApi = {
  async getUserList(
    request: Parameters
  ): Promise<PaginationResponse<UserList>> {
    const response = await axios.get('users', { params: request });
    return response.data;
  },
  async createBook(request: User) {
    await axios.post('users', request);
  },
  async getUserId(id: number) {
    const response = await axios.get(`/users/${id}`);
    return response;
  },
  async updateUser(request: User) {
    await axios.put('users', request);
  },
  async deleteUser(id: number) {
    await axios.delete(`users/${id}`);
  },
};

export { UserApi };
