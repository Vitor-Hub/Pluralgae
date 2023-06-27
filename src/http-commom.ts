import axios from "axios";

const api = axios.create({
  baseURL: "http://161.35.132.93:8080/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
