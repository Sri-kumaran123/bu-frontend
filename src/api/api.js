import axios from "axios";
import { ACCESS_TOKEN } from "../assets/constants";

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true,
    headers: {
        'Content-Type': 'application/json',
      },
});
api.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && error.response.status === 401) {
          localStorage.removeItem("jwt");
      }
      return Promise.reject(error);
  }
);



export default api;