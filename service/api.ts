import axios from 'axios'

export const LocalbackendUrl = "http://localhost:1337/api";
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const api = axios.create({
  baseURL:baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const token="";

api.interceptors.request.use(
  (config,) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log('error',error);
    return Promise.reject(error);
  }
);



export default api;