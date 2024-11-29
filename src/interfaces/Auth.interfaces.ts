import {
  Country,
  EmploymentType,
  Languages,
  LocationType,
  Prefixes,
} from "../components/auth";

export interface IUserInfo {
  // Personal
  phone: string;
  prefix: Prefixes;
  country: Country;
  city: string;
  dateOfBirth: string;
  image: string;
  // Education
  university: string;
  fieldOfStudy: string;
  gpa: number;
  startEducationDate: string;
  endEducationDate: string;
  // Experience
  jobTitle: string;
  employmentType: EmploymentType;
  companyName: string;
  location: Country;
  locationType: LocationType;
  currentlyWork: boolean;
  startJobDate: string;
  endtJobDate: string;
  // Soft Skills
  softSkills: string[];
  languages: Languages[];
  // Resume
  resume: string;
}
