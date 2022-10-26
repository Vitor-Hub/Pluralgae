import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: "https://plural-ecommerce.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${token}`
  }
});