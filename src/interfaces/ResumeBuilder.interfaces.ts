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
  education: IEducationInputs[];
  skills: ISkillsInputs[];
  experience: IExperienceInputs[];
  certificates: ICertificatesInputs[];
  projects: IProjectsInputs[];
}

///////////////////////////////////////////// Resume Template //////////////////////////////////////////////
export interface IResumeTemplate {
  id: number;
  name: string;
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
  resumeTemplate: IResumeTemplate;
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

///////////////////////////////////////////// Education //////////////////////////////////////////////
export interface IEducationInputs {
  id?: number;
  degree: string;
  school: string;
  city: string;
  country: string;
  end_year: number;
  end_month: number;
  start_year: number;
  start_month: number;
  start_date?: string;
  end_date?: string;
  description: string;
  school_link: string;
  is_current: boolean;
  [x: string]: string | number | boolean | undefined | IResumeTemplate;
}

export interface IResumeEducation extends IEducationInputs {
  resumeTemplate?: IResumeTemplate;
}

///////////////////////////////////////////// Experience //////////////////////////////////////////////
export interface IExperienceInputs {
  id?: number;
  job_title: string;
  company_name: string;
  city: string;
  country: string;
  start_date?: string;
  end_date?: string;
  description: string;
  is_current: boolean;
  [x: string]: string | number | boolean | undefined | IResumeTemplate;
}

export interface IResumeExperience extends IExperienceInputs {
  resumeTemplate: IResumeTemplate;
}
///////////////////////////////////////////// Skills //////////////////////////////////////////////
export interface ISkillsInputs {
  id?: number;
  name: string;
  information: string;
  level: string;
  [x: string]: string | number | boolean | undefined | IResumeTemplate;
}

export interface IResumeSkill extends ISkillsInputs {
  resumeTemplate: IResumeTemplate;
}
///////////////////////////////////////////// Certificates //////////////////////////////////////////////
export interface ICertificatesInputs {
  id?: number;
  certificate: string;
  certificate_url: string;
  additional_information: string;
  [x: string]: string | number | boolean | undefined | IResumeTemplate;
}

export interface IResumeCertificate extends ICertificatesInputs {
  resumeTemplate: IResumeTemplate;
}
///////////////////////////////////////////// Projects //////////////////////////////////////////////
export interface IProjectsInputs {
  id?: number;
  title: string;
  subtitle: string;
  project_link: string;
  start_date: string;
  end_date: string;
  description: string;
  is_current: boolean;
  [x: string]: string | number | boolean | undefined | IResumeTemplate;
}

export interface IResumeProjects extends IProjectsInputs {
  resumeTemplate: IResumeTemplate;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////// Experience Api Response //////////////////////////////////////////////
export interface IGetResumeExperiencesInfoResponse {
  success: boolean;
  data: IResumeExperience[];
}

export interface IGetResumeExperienceInfoResponse {
  success: boolean;
  data: IResumeExperience;
}

///////////////////////////////////////////// Skills Api Response //////////////////////////////////////////////
export interface IGetResumeSkillsInfoResponse {
  success: boolean;
  skillsContent: IResumeSkill[];
}

export interface IGetResumeSkillInfoResponse {
  success: boolean;
  skillContent: IResumeSkill;
}
///////////////////////////////////////////// Certificates Api Response //////////////////////////////////////////////
export interface IGetResumeCertificatesInfoResponse {
  success: boolean;
  certificatesContent: IResumeCertificate[];
}

export interface IGetResumeCertificateInfoResponse {
  success: boolean;
  certificateContent: IResumeCertificate;
}
///////////////////////////////////////////// Projects Api Response //////////////////////////////////////////////
export interface IGetResumeProjectsInfoResponse {
  success: boolean;
  projectsContent: IResumeProjects[];
}

export interface IGetResumeProjectInfoResponse {
  success: boolean;
  projectContent: IResumeProjects;
}
