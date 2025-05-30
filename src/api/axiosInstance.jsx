import axios from 'axios';

//baseUrl for apis
const axiosInstance = axios.create({
  baseURL: 'https://api.fullontravel.com/api/',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
