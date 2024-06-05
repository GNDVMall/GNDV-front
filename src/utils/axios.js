import axios from 'axios'

// Axios Config
export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v2', // 후에 URL 변경
  timeout: 1000,
  headers:{
    "X-Requested-With":"XMLHttpRequest",
    "Content-Type":"application/json",
    "Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcyMTE3NTA1NiwiZW1haWwiOiIxMTExQG5hdmVyLmNvbSJ9.7yfTWmPjooQE7keZCGqnmMLizjTRS6rTEDmy9VUD5xSGarfmt6WZs4EOLXhXSbJ7Gsu_7W5SYwq__l2ggWhW8A"
  }
});