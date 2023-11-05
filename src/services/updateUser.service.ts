import api from "../http-commom";
import { IUpdateUser } from "../types/updateUser.type";

export const updateUserService = (data: any, token: string | undefined) => {
  console.log("data: ", data);
  return api.put<IUpdateUser>(`/user/${data.id}`, data, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
