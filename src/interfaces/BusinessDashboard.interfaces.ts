import { Country, EmploymentType, LocationType } from "../enums/index.enums";
import { IUser } from "./Auth.interfaces";
import { IBusinessAccount } from "./BusinessAccount.interfaces";
import { IResponse } from "./Common.interfaces";
import { IJob } from "./Job.interfaces";

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

export interface IPostNewJobInputs {
  business_id: number;
  title: string;
  description: string;
  location: string;
  location_type: string;
  salary: number;
  employee_type: string;
  keywords: string[];
  experience: string;
  skills: string[];
}

export interface IUpdateJobInputs {
  title: string;
  description: string;
  location: Country;
  locationType: LocationType;
  salary: number;
  employmentType: EmploymentType;
  keywords: string[];
  skills: string[];
  experience: string;
}

export interface IMeta {
  itemsPerPage: number;
  totalItems: number;
  perviousPage: number;
  currentPage: number;
  totalPages: number;
  sortBy: string[];
  search: string;
  searchBy: string[];
}

export interface IResume {
  id: number;
  url: string;
  name: string;
  size: number;
  account: IUser;
  accountId: number;
}

export interface IJobApplication {
  id: number;
  created_at: string;
  updated_at: string;
  job: IJob;
  resume: IResume;
}

//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces

export interface IGetListOfHrRolesResponse {
  status: string;
  HRs: IHRs[];
}

export interface IPostNewJobResponse extends IResponse {
  job: IJob;
}

export interface IUpdateBusinessAccountResponse extends IResponse {
  business: IBusinessAccount;
}

export interface IUpdateJobResponse {
  success: boolean;
  id: number;
  title: string;
  description: string;
  location: Country;
  location_type: LocationType;
  skills: string[];
  salary: number;
  employee_type: EmploymentType;
  keywords: string[];
  experience: number;
  created_at: string;
  updated_at: string;
  business_id: number;
}

export interface IGetJobApplicationsResponse {
  success: boolean;
  jobApplications: {
    data: IJobApplication[];
    meta: IMeta;
  };
}
