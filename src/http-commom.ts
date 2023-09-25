import axios from "axios";

const api = axios.create({
  baseURL: "http://165.232.129.126:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
