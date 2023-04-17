import api from "../http-commom";
import { ISignIn } from "../types/auth.type";

export const signInService = (data: ISignIn) => {
  return api.post<ISignIn>("/auth/login", data);
};
