import { IUser } from "./Auth.interfaces";
import { IBusinessAccount } from "./BusinessAccount.interfaces";
import {
  IJobApplication,
  IMeta,
  IResume,
} from "./BusinessDashboard.interfaces";
import { IResponse } from "./Common.interfaces";

export interface IJob {
  id: number;
  title: string;
  status: string;
  description: string;
  location: {
    country: string;
    city: string;
  };
  country: string;
  city: string;
  location_type: string;
  skills: string[];
  salary: number;
  currency: string;
  employee_type: string;
  keywords: string[];
  experience: number;
  created_at: string;
  updated_at: string;
  business: IBusinessAccount;
  business_id: number;
  resume: IResume;
  account: IUser;
  isSaved: boolean;
}
export interface IGetArchivedJobApplication {
  id: number;
  created_at: string;
  updated_at: string;
  job_id: number;
  resume_id: number;
  account_id: number;
  is_archived: boolean;
  job_application_id: number;
}

//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces

export interface IGetAllJobsResponse {
  success: boolean;
  jobs: {
    data: IJob[];
    meta: IMeta;
  };
}
export interface IGetallJobsOfBusinessResponse {
  success: string;
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
    data: {
      id: string;
      created_at: string;
      updated_at: string;
      job: IJob;
    }[];
    meta: IMeta;
  };
}

export interface IApplyToJobResponse extends IResponse {
  id: number;
  created_at: string;
  updated_at: string;
  jobApplication: {
    job: IJob;
    business: IBusinessAccount;
    resume: IResume;
  };
}
export interface IGetJobApplicationsResponse {
  success: boolean;
  jobApplications: {
    data: IJobApplication[];
    meta: IMeta;
  };
}

export interface IGetArchivedJobApplicationsResponse {
  success: boolean;
  jobApplications: IJobApplication[];
}
export interface IGetRecommendedJobs {
  success: boolean;
  recommendedJobs: IJob[];
}
