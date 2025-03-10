import { IResponse } from "./Common.interfaces.ts";

export type FormMode = "add" | "edit";

export type ResumeStatus =
  | "start"
  | "normal"
  | "add"
  | "edit"
  | "personal"
  | "aboutme"
  | "education"
  | "skills"
  | "workExperience"
  | "certifications"
  | "projects"
  | "volunteering"
  | "languages"
  | "hobbies"
  | "references"
  | "achievements"
  | "publications"
  | "technicalProficiencies"
  | "training"
  | "portfolio"
  | "custom";

export interface IResumeInfo {
  personal: {
    id: number;
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    aboutMe: string;
  };
  education: {
    id: number;
    degree: string;
    school: string;
    country: string;
    city: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: {
    id: number;
    skill: string;
    description: string;
    level: string;
  }[];
}

///////////////////////////////////////////// Resume Template //////////////////////////////////////////////
export interface IResumeTemplate {
  id: number;
  name: string; // this not come from back but we need it in front
  profile: string;
  account_id: number;
  created_at: string;
  updated_at: string;
}

///////////////////////////////////////////// Resume Template Api Response //////////////////////////////////////////////
export interface IGetAllResumeTemplatesResponse {
  status: string;
  data: IResumeTemplate[];
}

export interface IAddResumeTemplateResopnse {
  status: string;
  data: IResumeTemplate;
}

///////////////////////////////////////////// Personal //////////////////////////////////////////////
export interface PersonaInfoContent {
  id: number;
  full_name: string;
  job_title: string;
  email: string;
  phone_number: string;
  address: string;
  personal_information: PersonalInformation;
  picture: string;
  links: Links;
  created_at: string;
  updated_at: string;
  resumeTemplate: ResumeTemplate;
}

export interface PersonalInformation {
  date_of_birth: string;
  gender: string;
  id: string;
  nationality: string;
}

export interface Links {
  gitHub: string;
  faceBook: string;
  website: string;
}

export interface ResumeTemplate {
  id: number;
  account_id: number;
  created_at: string;
  updated_at: string;
}

///////////////////////////////////////////// Education //////////////////////////////////////////////
export interface Root {
  success: boolean;
  educationContent: IResumeEducation;
}

export interface IResumeEducation {
  id: number;
  degree: string;
  school: string;
  school_link: string;
  city: string;
  country: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  created_at: string;
  updated_at: string;
  resumeTemplate: ResumeTemplate;
}

///////////////////////////////////////////// Personal Api Response //////////////////////////////////////////////
export interface IGetResumePersonalInfoResponse {
  success: boolean;
  personaInfoContent: PersonaInfoContent;
}

export interface IAddPersonalInfoResponse extends IResponse {
  personaInfoContent: PersonaInfoContent;
}

///////////////////////////////////////////// Education Api Response //////////////////////////////////////////////
export interface IGetAllResumeEducationResponse {
  success: boolean;
  educationsContent: IResumeEducation[];
}

export interface IGetResumeEducationResponse {
  success: boolean;
  educationContent: IResumeEducation;
}
