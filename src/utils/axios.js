import axios from "axios";
import { store } from "@/store/store";

axios.defaults.withCredentials = true;

const getAuthHeaders = () => {
  return {
    Authorization: `Bearer ${store.accessToken}`,
    "X-Refresh-Token": store.refreshToken,
    "X-Requested-With": "XMLHttpRequest",
  };
};

const instance = axios.create({
  baseURL: "http://52.79.76.65:80/api/v2",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const headers = getAuthHeaders();
    config.headers = {
      ...config.headers,
      ...headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.message === "Network Error" ||
      error.code === "ERR_NETWORK" ||
      error.response?.status === 404
    ) {
      const event = new CustomEvent("network-error");
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  }
);

const instanceMultipart = axios.create({
  baseURL: "http://52.79.76.65:80/api/v2",
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instanceMultipart.interceptors.request.use(
  (config) => {
    const headers = getAuthHeaders();
    config.headers = {
      ...config.headers,
      ...headers,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

export { instance, instanceMultipart };
