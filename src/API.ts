import axios from "axios";
// import { apiUsersPath } from "./shared/types/enums";
// import { authService } from "./shared/services/api.service";

// const baseUrl = "http://owu.linkpc.net/carsAPI/v2";
const baseUrl = "http://localhost:8000";
// const baseUrl = "https://dummyjson.up.railway.app";

export enum apiBasePath {
  OWNLINKPC = "http://owu.linkpc.net/carsAPI/v2",
  LOCALHOST = "http://localhost:8000",
  RAILWAY = "https://dummyjson.up.railway.app",
  JSONPLACEHOLDER = "https://jsonplaceholder.typicode.com"
}

export const createFullUrl = (baseUrl: string, url: string) => {
  return `${baseUrl}${url}`;
};


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
//     console.log("error", error);
//     if (error.response && error.response.status === 401) {
//       originalRequest._retry = true;
//       try {
//         const response = await API.post(
//           apiUsersPath.REFRESHTOKEN,
//           localStorage.get("refreshToken")
//         );
//         localStorage.setItem("accessToken", response.data.access);
//         localStorage.setItem("refreshToken", response.data.refresh);
//       } catch (refreshError) {
//         console.log("refreshError");
//         console.log("Помилка оновлення токена:", refreshError);
//         window.location.href = "/auth";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export { API };
