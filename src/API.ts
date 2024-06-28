import axios from "axios";

const baseUrl = "https://dummyjson.com";

const API = axios.create({
  baseURL: `${baseUrl}`
});

export { API };
