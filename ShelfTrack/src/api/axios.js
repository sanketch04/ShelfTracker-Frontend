import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7061/api",
});

export default api;
