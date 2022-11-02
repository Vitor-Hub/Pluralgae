import api from "../http-commom";
import IGetProducts from "../types/products.type";

export const getProducts = () => {
    return api.get<IGetProducts>("/products/list");
}