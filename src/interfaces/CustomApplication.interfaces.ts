export interface IApplicationData {
  personal?: ICustomPersonal;
  education?: ICustomEducation;
  experience?: ICustomExperience;
  skills?: string[];
  languages?: string[];
  resume?: File | null;
  answers?: string[];
}
export interface ICustomPersonal {
  firstName: string;
  lastName: string;
  email: string;
  phone: {
    countryCode: string;
    number: string;
  };
  dob: string;
}
export interface ICustomEducation {
  id: number;
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
  locationType: string;
  startDate: string;
  endDate?: string;
  stillWorking: boolean;
  employmentType: string;
}
