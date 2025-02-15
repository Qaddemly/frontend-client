import {
  IEducation,
  IExperience,
  ILanguages,
  ISkills,
  IUser,
} from "./Auth.interfaces";
import { IResume } from "./BusinessDashboard.interfaces";

export interface IUpdateExperienceInputs {
  jobTitle: string;
  companyName: string;
  location: string;
  locationType: string;
  employmentType: string;
  stillWorking: boolean;
  startDate: string;
  endDate: string;
}
export interface IUpdateVolunteeringInputs {
  organization: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string;
}
//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces
export interface IGetUserResponse {
  success: boolean;
  user: IUser;
}

export interface IUpdatePersonalResponse {
  success: boolean;
  updatedUser: IUser;
}
export interface IUpdateExperienceResponse {
  success: boolean;
  experience: IExperience;
}
export interface IUpdateEducationResponse {
  success: boolean;
  education: IEducation;
}

export interface IGetAllResumesResponse {
  success: boolean;
  resumes: IResume[];
}
export interface IAddResumeResponse {
  success: boolean;
  resume: IResume;
}

export interface IAddNewSkillResponse {
  success: boolean;
  skills: ISkills[];
}
export interface IAddNewLanguageResponse {
  success: boolean;
  skills: ILanguages[];
}

export interface ICertificate {
  id: number;
  title: string;
  issuing_organization: string;
  start_date: string;
  end_date: string;
  account_id: number;
  media: string;
}

export interface ICertificateResponse {
  success: boolean;
  certificate: ICertificate;
}

export interface IAccount {
  id: number;
}

export interface IProject {
  id: number;
  name: string;
  account: IAccount;
  description: string;
  skills: string[];
  start_date: string;
  end_date: string;
  still_working: boolean;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface IProjectResponse {
  success: boolean;
  project: IProject;
}
