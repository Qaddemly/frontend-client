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
