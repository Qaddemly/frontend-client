import {
  Country,
  EmploymentType,
  Languages,
  LocationType,
  Prefixes,
} from "../components/auth";

export interface IUserInfo {
  phone: string;
  prefix: Prefixes;
  country: Country;
  city: string;
  dateOfBirth: string;
  image: FileList;
  university: string;
  fieldOfStudy: string;
  gpa: number;
  startEducationDate: string;
  endEducationDate: string;
  jobTitle: string;
  employmentType: EmploymentType;
  companyName: string;
  location: Country;
  locationType: LocationType;
  currentlyWork: boolean;
  startJobDate: string;
  endtJobDate: string;
  softSkills: string[];
  languages: Languages[];
  resume: string;
}
