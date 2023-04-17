import api from "../http-commom";
import { IPostShipping } from "../types/shipping.type";

const Shipping = (data: IPostShipping) => {
  return api.post<IPostShipping>("/freight/shiping/calculate", data);
};

export default Shipping;
