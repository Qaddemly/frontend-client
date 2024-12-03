import { User } from "./Auth.interfaces";

export interface IUpdateProfileResponse {
  success: string;
  user: User;
}

export type IGetUserResponse = IUpdateProfileResponse;
