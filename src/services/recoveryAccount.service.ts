import api from "../http-commom";
import IUserRecovery from "../types/recovery.type";

export const recoveryAccountService = (data: IUserRecovery) => {
  return api.patch<IUserRecovery>("/user/recover", data);
};
