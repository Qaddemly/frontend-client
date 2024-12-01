import {
  Country,
  EmploymentType,
  Languages,
  LocationType,
  Prefixes,
} from "../components/auth";

export interface IUserInfo {
  // Personal
  phone: {
    number: string;
    countryCode: Prefixes;
  };
  address: {
    country: Country;
    city: string;
  };
  dateOfBirth: string;
  profilePicture: string;
  // Education
  university: string;
  fieldOfStudy: string;
  gpa: number;
  startEducationDate: string;
  endEducationDate: string;
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
  startJobDate: string;
  endJobDate: string;
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
  phone: Phone;
  profilePicture: string;
  resume: string;
  languages: Languages[];
}

export interface Address {
  country: string;
  city: string;
  _id: string;
}

export interface Phone {
  countryCode: number;
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
export interface IEmailVerfiyInputs {
  code: string;
  activationToken: string;
}
export interface ILoginResponse {
  success: boolean;
  user: User;
  accessToken: string;
}

export interface ISignupResponse {
  success: boolean;
  message: string;
  activationToken: string;
}

export interface IActivateEmailResponse {
  success: string;
  message: string;
}
