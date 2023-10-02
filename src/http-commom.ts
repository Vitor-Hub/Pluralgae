import axios from "axios";

const api = axios.create({
  baseURL: "https://pluralgae.com.br/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
