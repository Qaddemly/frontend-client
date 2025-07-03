import { Country, EmploymentType, LocationType } from "../enums/index.enums";
import { IUser } from "./Auth.interfaces";
import { IBusinessAccount } from "./BusinessAccount.interfaces";
import { IResponse } from "./Common.interfaces";
import { IJob, IQuestion } from "./Job.interfaces";

export interface IHRs {
  id: string;
  role: string;
  created_at: string;
  updated_at: string;
  account: IUser;
}

export interface INewRole {
  account_email: string;
  role: string;
}

export interface IPostNewJobInputs {
  business_id: number;
  title: string;
  description: string;
  location: {
    country: Country;
    city: string;
  };
  location_type: LocationType;
  salary: number;
  employee_type: string;
  keywords: string[];
  experience: number;
  skills: string[];
  has_extra_link_application: boolean;
  extra_application_link: string;
  questions: IQuestion[];
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
  accountId: number;
}

export interface IJobApplication {
  id: number;

  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  skills: string[];
  languages: string[];
  phone: {
    country_code: number;
    number: number;
  };
  job_application_state: IJobApplicationState;
  created_at: string;
  updated_at: string;
}

export interface IJobApplicationState {
  job_application_id: number;
  job_id: number;
  state: string;
  is_archived: boolean;
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
