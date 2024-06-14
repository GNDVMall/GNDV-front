// axios.js
import axios from 'axios';
import { store } from '@/store/store';

const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${store.accessToken}`,
    'x-refresh-token': store.refreshToken
  };
};

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v2',
  timeout: 5000,
});

instance.interceptors.request.use(config => {
  const headers = getAuthHeaders();
  if (headers.Authorization) {
    config.headers.Authorization = headers.Authorization;
  }
  if (headers['x-refresh-token']) {
    config.headers['x-refresh-token'] = headers['x-refresh-token'];
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const instanceMultipart = axios.create({
  baseURL: 'http://localhost:8080/api/v2',
  timeout: 5000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "multipart/form-data"
  }
});

instanceMultipart.interceptors.request.use(
  (config) => {
    const headers = getAuthHeaders();
    if (headers.Authorization) {
      config.headers.Authorization = headers.Authorization;
    }
    if (headers['x-refresh-token']) {
      config.headers['x-refresh-token'] = headers['x-refresh-token'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { instance, instanceMultipart };
