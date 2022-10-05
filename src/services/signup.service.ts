import http from "../http-commom";
import {ISignUp} from "../types/signup.type";

export const signUpService = (data: ISignUp) => {
    return http.post<ISignUp>("/user/signup", data);
}