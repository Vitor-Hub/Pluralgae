import http from "../http-commom";
import {ISignIn} from "../types/auth.type";

export const signInService = (data: ISignIn) => {
    return http.post<ISignIn>("/auth/login", data);
}