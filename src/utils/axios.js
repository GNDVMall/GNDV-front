import axios from 'axios'

// Axios Config
export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v2', // 후에 URL 변경
  timeout: 1000,
  headers:{
    "X-Requested-With":"XMLHttpRequest",
    "Content-Type":"application/json",
    "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMTI3NDYxOSwiZW1haWwiOiIxMTExQG5hdmVyLmNvbSJ9.CoSNgOTIhqdWKNhhJEN-namMiRpM4mHO5AQlbDl_bWPmypULpKPgS74MxYZO6JtBU8hYkmoCEEwYw150wo1ZCg"
  }
});

export default instance;