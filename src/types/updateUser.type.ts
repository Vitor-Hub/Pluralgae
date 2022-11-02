import { IUser } from "./user.type";

interface IUpdateUser extends IUser {
    password?: string;
}

export type {
    IUpdateUser
}