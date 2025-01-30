import { IBusinessAccount } from "./BusinessAccount.interfaces";
import { IResponse } from "./Common.interfaces";

export interface IHRs {
  account_id: string;
  account_email: string;
  account_first_name: string;
  account_last_name: string;
  account_profile_picture: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface INewRole {
  account_email: string;
  role: string;
}

//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces

export interface IGetListOfHrRolesResponse {
  status: string;
  HRs: IHRs[];
}

export interface IUpdateBusinessAccountResponse extends IResponse {
  business: IBusinessAccount;
}
