import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.36.143:3333',
});

export default api;
