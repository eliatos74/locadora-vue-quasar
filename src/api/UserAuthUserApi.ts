import axios from 'axios';

import { AuthLogin } from '../interfaces/Auth.interface';

const UserAuth = {
  async login(form: AuthLogin) {
    const response = await axios.post('auth/login', form);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
  },

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },
};

export { UserAuth };
