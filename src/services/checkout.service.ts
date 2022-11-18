import api from "../http-commom";
import {IFinalPayment} from "../types/checkout.type";

export const checkoutService = (data: IFinalPayment) => {
    return api.post<IFinalPayment>("/order/checkout", data);
}