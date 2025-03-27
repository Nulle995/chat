import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3001/",
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 440 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await API.get("/auth/token/refresh/");
        return API(originalRequest);
      } catch (e) {
        console.log("SSSS");
        return Promise.reject(e);
      }
    }
    if (error.response.status === 401 || error.response.status === 403) {
      return Promise.reject(error); //
    }

    return Promise.reject(error);
  }
);
