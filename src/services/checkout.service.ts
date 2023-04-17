import api from "../http-commom";
import { IFinalPayment } from "../types/checkout.type";

export const checkoutService = (
  data: IFinalPayment,
  token: string | undefined
) => {
  return api.post<IFinalPayment>("/order/checkout", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
