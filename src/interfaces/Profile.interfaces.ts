import { IExperience, IUser } from "./Auth.interfaces";

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
//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces
export interface IGetUserResponse {
  success: boolean;
  user: IUser;
}

export interface IUpdateExperienceResponse {
  success: boolean;
  experience: IExperience;
}
