import api from "../http-commom";
import { IRegisterProducts } from "../types/registerProduct.type";

export const registerProductService = (
  data: IRegisterProducts,
  token: string | undefined
) => {
  return api.post<IRegisterProducts>("products", data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
