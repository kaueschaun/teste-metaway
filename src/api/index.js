import axios from 'axios'
import endpoint from './config/endpoint';
import headers from './config/headers';


const api = (baseUrl, isPublic = false) => {

  const instance = axios.create({
    baseURL: endpoint.get(baseUrl),
    headers: headers(isPublic)
  });

  return instance;
};

export default api;