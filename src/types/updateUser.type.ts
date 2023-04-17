import { IUser } from "./user.type";

interface IUpdateUser {
  password?: string;
  access_token: string;
  username: string;
  email: string;
  phoneNumber: string;
  street: string;
  number: string;
  district: string;
  zipCode: string;
  city: string;
  state: string;
  id: string;
  birthdate: string;
  document: string;
}

export type { IUpdateUser };
