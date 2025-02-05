import { IBusinessAccount } from "./BusinessAccount.interfaces";
import { IMeta } from "./BusinessDashboard.interfaces";

// export interface IPostData {
//   title: string;
//   description: string;
//   location: string;
//   locationType: string;
//   salary: number;
//   employmentType: string;
//   experience: string;
//   business_id: number;
// }

export interface IJob {
  id: number;
  title: string;
  status: string;
  description: string;
  location: string;
  location_type: string;
  skills: string[];
  salary: number;
  employee_type: string;
  keywords: string[];
  experience: number;
  created_at: string;
  updated_at: string;
  business: IBusinessAccount;
  isSaved: boolean;
}

//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces
// export interface IPostResponse {}

export interface IGetAllJobsResponse {
  success: boolean;
  jobs: {
    data: IJob[];
    meta: IMeta;
  };
}
export interface IGetJobDetailsResponse {
  success: boolean;
  job: IJob;
}

export interface ISavedJobsResponse {
  success: boolean;
  savedJobs: {
    data: IJob[];
    meta: IMeta;
  };
}
