import { IUser } from "./Auth.interfaces";

export interface IGetUserResponse {
  success: string;
  user: IUser;
}

/**
 * this api is no longer work
 * this api need to be refactored with new one on postman
 */
// export type IUpdateProfileResponse = IGetUserResponse;
