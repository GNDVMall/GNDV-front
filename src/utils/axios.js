import axios from 'axios'

// Axios Config
export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v2', // 후에 URL 변경
  timeout: 1000,
  headers:{
    "X-Requested-With":"XMLHttpRequest",
    "Content-Type":"application/json",
    "Authorization":`Bearer ${localStorage.getItem('authToken')}`
  }
});

export default instance;