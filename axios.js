import axios from 'axios';

axios.defaults.baseURL = 'https://livraria-api.altislabtech.com.br/';

axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');
