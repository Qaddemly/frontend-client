export interface IApplicationData {
  personal?: ICustomPersonal;
  education?: ICustomEducation;
  experience?: ICustomExperience[];
  skills?: string[];
  languages?: string[];
}
export interface ICustomPersonal {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
}
interface ICustomEducation {
  university: string;
  fieldOfStudy: string;
  gpa: string;
  startDate: string;
  endDate?: string;
  // currentlyStudying: boolean;
}
export interface ICustomExperience {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  city: string;
  locationType: string;
  startDate: string;
  endDate?: string;
  // currentlyWorking: boolean;
}
