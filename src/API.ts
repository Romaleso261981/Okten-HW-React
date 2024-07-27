import axios from "axios";
import { TokenRefresh } from "./models/TokenRefresh";

// const baseUrl = "https://dummyjson.com";
const baseUrl = "http://localhost:8000";
// const baseUrl = "https://remontonlineback.up.railway.app";

const API = axios.create({
  baseURL: `${baseUrl}`
});

API.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(async (response) => {
  if (response.status === 401) {
    const localrefreshToken = localStorage.getItem("refreshToken");
    if (localrefreshToken) {
      const response = await API.post<TokenRefresh>("/auth/refresh", {
        refreshToken: localrefreshToken
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } else {
      window.location.href = "/login";
    }
  }
  return response;
});

export { API };
