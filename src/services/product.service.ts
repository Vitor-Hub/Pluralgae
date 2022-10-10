import http from "../http-commom";
import IGetProducts from "../types/products.type";

export const getProducts = () => {
    return http.get<IGetProducts>("/products/list");
}