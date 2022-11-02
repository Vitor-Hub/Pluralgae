import api from "../http-commom";
import {ISignUp} from "../types/signup.type";

export const signUpService = (data: ISignUp) => {
    return api.post<ISignUp>("/user/signup", data);
}