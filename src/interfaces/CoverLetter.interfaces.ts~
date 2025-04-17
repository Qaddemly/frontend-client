import { IResponse } from "./Common.interfaces.ts";
import { Links } from "./ResumeBuilder.interfaces.ts";

export type CoverLetterStatus =
  | "addCoverLetter"
  | "normal"
  | "add"
  | "edit"
  | "personal"
  | "body";

export interface ICoverLetterInfo {
  personal: ICoverLetterPersonalInputs;
}

///////////////////////////////////////////// Cover Letter Template //////////////////////////////////////////////
export interface ICoverLetterTemplate {
  id: number;
  name: string;
  account_id: number;
  date: string;
  body: string;
  recipientDetails: IRecipientDetails;
  personalDetails: ICoverLetterPersonalInfo;
  created_at: string;
  updated_at: string;
}

export interface IRecipientDetails {
  nameOfRecipient: string;
  companyName: string;
  Address: string;
}
///////////////////////////////////////////// Personal //////////////////////////////////////////////
export interface ICoverLetterPersonalInputs {
  id: number;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  body: string;
}
export interface ICoverLetterPersonalInfo {
  id: number;
  full_name: string;
  job_title: string;
  email: string;
  phone_number: string;
  address: string;
  personal_information: IPersonalInfo;
  picture: string;
  links: Links;
  coverLetter: ICoverLetterTemplate;
  created_at: string;
  updated_at: string;
}
export interface IPersonalInfo {
  date_of_birth: string;
  gender: string;
  id: string;
  nationality: string;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// Resume Template Api Response //////////////////////////////////////////////
export interface ICoverLetterResponse extends IResponse {
  coverLetter: ICoverLetterTemplate;
}

export interface IGetCoverLetterResponse {
  status: string;
  coverLetter: ICoverLetterTemplate;
}

export interface IGetCoverLettersResponse {
  status: string;
  coverLetters: ICoverLetterTemplate[];
}
///////////////////////////////////////////// Personal Response //////////////////////////////////////////////
export interface IGetPersonalCoverLetterResponse {
  status: string;
  personalDetails: ICoverLetterPersonalInfo;
}

export interface IPersonalCoverLetterResponse extends IResponse {
  personalDetails: ICoverLetterPersonalInfo;
}
