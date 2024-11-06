import axios from 'axios';

import { AuthLogin } from '../interfaces/Auth.interface';

const UserAuth = {
  async login(form: AuthLogin) {
    const response = await axios.post('auth/login', form);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('username', response.data.username);
  },

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  },
};

export { UserAuth };
