import {
  Country,
  EmploymentType,
  Languages,
  LocationType,
  Prefixes,
} from "../enums/index.enums";
import { IReview } from "./BusinessAccount.interfaces";
import { IJobApplication } from "./BusinessDashboard.interfaces";
import { IResponse } from "./Common.interfaces";
import { IJob } from "./Job.interfaces";

export interface IUserInfo {
  // Personal
  phone: IPhone;
  address: IAddress;
  dateOfBirth: string;
  profilePicture: string;
  // Education
  education: IEducation;
  // Experience
  experience: IExperience;
  // Soft Skills
  softSkills: ISkills[];
  languages: ILanguages[];
  // Resume
  resume: string; // need interface
}
export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  date_of_birth: string;
  profile_picture: string;
  resume: string[]; // need interface
  skills: ISkills[];
  password_changed_at: string;
  is_activated: boolean;
  created_at: string;
  updated_at: string;
  address: IAddress;
  phone: IPhone;
  experiences: IExperience[];
  education: IEducation;
  languages: ILanguages[];
  reviews: IReview[];
  follow_businesses: string[]; // need interface
  business_roles: IBusinessRoles[];
  job_applications: IJobApplication[]; // need interafce
  saved_job: IJob[];
}
export interface IExperience {
  id: number;
  job_title: string;
  employment_type: EmploymentType;
  company_name: string;
  location: Country;
  location_type: LocationType;
  still_working: boolean;
  start_date: string;
  end_date: string;
}
export interface IEducation {
  account_id: number;
  university: string;
  field_of_study: string;
  gpa: number;
  start_date: string;
  end_date: string;
}
export interface IAddress {
  country: Country;
  city: string;
}

export interface IPhone {
  country_code: Prefixes;
  number: number;
}
export interface IBusinessRoles {
  id: number;
  role: string;
  created_at: string;
  updated_at: string;
}
export interface ISkills {
  id: number;
  name: string;
}
export interface ILanguages {
  id: number;
  name: Languages;
}

//////////////////////////////////////////////////////////////////////////////
// Api Request Interfaces
export interface ILoginInputs {
  email: string;
  password: string;
}
export interface ISignupInputsStep1 {
  email: string;
}
export interface ISignupInputsStep2 {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface ISignupInputs extends ISignupInputsStep1, ISignupInputsStep2 {}
export interface IEmailVerfiyInputs {
  code: string;
  activationToken: string;
}
export interface IForgetMyPassword {
  email: string;
}
export interface IVerifyForgetPasswordInputs {
  code: string;
  resetVerificationToken: string;
}
export interface ISetNewPassword {
  newPassword: string;
  newPasswordConfirm: string;
}
export interface ISetNewPasswordInputs extends ISetNewPassword {
  passwordResetToken: string;
}
//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces
export interface ILoginResponse {
  success: boolean;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface ISignupResponse extends IResponse {
  activationToken: string;
}
export interface IUserInfoResponse extends IResponse {
  user: IUser;
}
export type IActivateEmailResponse = IResponse;

export interface IForgetMyPasswordResponse {
  success: string;
  resetVerificationToken: string;
}
export interface IVerifyForgetPasswordResponse extends IResponse {
  passwordResetToken: string;
}
