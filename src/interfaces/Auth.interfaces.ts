import {
  Country,
  EmploymentType,
  Languages,
  LocationType,
  Prefixes,
} from "../components/auth";

export interface IUserInfo {
  // Personal
  phone: Phone;
  address: Address;
  dateOfBirth: string;
  profilePicture: string;
  // Education
  eduction: IEducation;
  // Experience
  experience: IExperience;
  // Soft Skills
  softSkills: string[];
  languages: Languages[];
  // Resume
  resume: string;
}
export interface IExperience {
  jobTitle: string;
  employmentType: EmploymentType;
  companyName: string;
  location: Country;
  locationType: LocationType;
  stillWorking: boolean;
  startDate: string;
  endDate: string;
}
export interface IEducation {
  university: string;
  fieldOfStudy: string;
  gap: number;
  startDate: string;
  endDate: string;
  _id: string;
}
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  skills: string[];
  role: string;
  active: boolean;
  isActivated: boolean;
  experience: IExperience[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordChangedAt: string;
  address: Address;
  dateOfBirth: string;
  education: IEducation;
  phone: Phone;
  profilePicture: string;
  resume: string;
  languages: Languages[];
}

export interface Address {
  country: Country;
  city: string;
  _id: string;
}

export interface Phone {
  countryCode: Prefixes;
  number: string;
  _id: string;
}
export interface IError {
  details: number;
  data: {
    message: string;
    status: string;
  };
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
interface IResponse {
  success: boolean;
  message: string;
}
export interface ILoginResponse {
  success: boolean;
  user: User;
  accessToken: string;
}

export interface ISignupResponse extends IResponse {
  activationToken: string;
}
export interface IUserInfoResponse extends IResponse {
  user: User;
}
export type IActivateEmailResponse = IResponse;

export interface IForgetMyPasswordResponse {
  success: string;
  resetVerificationToken: string;
}
export interface IVerifyForgetPasswordResponse extends IResponse {
  passwordResetToken: string;
}
export type ISetNewPasswordResponse = IResponse;

export type IResendActivateCodeResponse = IResponse;
export type IResendForgetPasswordCodeResponse = IResponse;
