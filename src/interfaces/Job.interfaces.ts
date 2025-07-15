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
  has_extra_link_application: boolean;
  extra_application_link: string;
  applicationsCount: number;
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

export interface IGetJobApplicationsResponse {
  success: boolean;
  jobApplications: {
    data: IJobApplication[];
    meta: IMeta;
  };
}
export interface IGetJobApplicationResponse {
  success: boolean;
  jobApplications: {
    data: IJobApplication;
    meta: IMeta;
  };
}

export interface IGetJobQuestionsResponse extends IResponse {
  questions: {
    questions: IQuestion[];
    jobId: string;
  };
}

export interface IQuestion {
  _id?: string;
  questionText: string;
  questionType: "short_answer" | "multiple_choice" | "long_answer";
  isRequired: boolean;
  options: string[];
}

export interface IAnswer {
  question: IQuestion;
  answer: string;
}

export interface IGetArchivedJobApplicationsResponse {
  success: boolean;
  jobApplications: IJobApplication[];
}
export interface IGetRecommendedJobs {
  success: boolean;
  recommendedJobs: IJob[];
}

export interface Phone {
  country_code: number;
  number: number;
}

export interface JobApplicationState {
  job_application_id: number;
  state: string;
}

export interface JobApplication {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  skills: string[];
  languages: string[];
  created_at: string;
  updated_at: string;
  phone: Phone;
  job_application_state: JobApplicationState;
}

export interface ArchivedJobApplication {
  job_application_id: number;
  is_archived: boolean;
  created_at: string;
  job_application: JobApplication;
}

export interface ArchivedJobApplicationsResponse {
  success: boolean;
  archivedJobApplications: ArchivedJobApplication[];
}
