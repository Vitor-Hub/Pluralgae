import axios from "axios";

const api = axios.create({
  baseURL: "https://plural-api-fzhfn.ondigitalocean.app/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
