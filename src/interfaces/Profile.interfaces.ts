import { User } from "./Auth.interfaces";

export interface IGetUserResponse {
  success: string;
  user: User;
}

/**
 * this api is no longer work
 * this api need to be refactored with new one on postman
 */
// export type IUpdateProfileResponse = IGetUserResponse;
