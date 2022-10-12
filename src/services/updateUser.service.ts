import http from "../http-commom";

interface IUpdateUser {
    access_token: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    email: string,
    id: string,
    phoneNumber: string,
    username: string
  }

export const updateUserService = (data: IUpdateUser) => {
    return http.put<IUpdateUser>(`/user/${data.id}`, data);
}