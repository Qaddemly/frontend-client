export interface IResumeInfo {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    aboutMe: string;
  };
  education: {
    degree: string;
    school: string;
    country: string;
    city: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: {
    skill: string;
    description: string;
    level: string;
  }[];
}
