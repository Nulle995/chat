import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});

API.interceptors.request.use(
  (respone) => {
    return respone;
  },
  async (err) => {
    const originalRequest = err.config;

    if (err.response.status === 440 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await API.get("auth/token/refresh/");
        return API(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    if (err.response.status === 401 || err.response.status === 403) {
      return Promise.reject(err); //
    }

    return Promise.reject(err);
  }
);
