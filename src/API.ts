import axios from "axios";
// import { authService } from "./shared/services/api.service";

const baseUrl = "http://owu.linkpc.net/carsAPI/v2";
// const baseUrl = "http://localhost:8000";
// const baseUrl = "https://dummyjson.up.railway.app";

const API = axios.create({
  baseURL: `${baseUrl}`
});

API.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (
    accessToken &&
    config.url !== "/users" &&
    config.url !== "/auth" &&
    config.url !== "/auth/refresh"
  ) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// API.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         authService.refreshAccessTocken();
//       } catch (refreshError) {
//         console.log("Помилка оновлення токена:", refreshError);
//         window.location.href = "/auth";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { API };
