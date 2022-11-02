import api from "../http-commom";
import IGetProducts from "../types/products.type";

export const getOders = (id: string, token: string) => {
    return api.get<IGetProducts>(`/order/user/${id}`, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
}