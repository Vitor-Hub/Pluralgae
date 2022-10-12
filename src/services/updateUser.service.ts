import http from "../http-commom";
import { IUser } from "../types/user.type";

export const updateUserService = (data: IUser) => {
    return http.put<IUser>(`/user/${data.id}`, data);
}