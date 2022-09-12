import axios from "axios";
export default axios.create({
  baseURL: "https://plural-ecommerce.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});