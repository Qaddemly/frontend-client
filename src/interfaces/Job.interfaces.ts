export interface IPostData {
  title: string;
  description: string;
  location: string;
  locationType: string;
  salary: number;
  employmentType: string;
  experience: string;
  business_id: number;
}

interface Address {
  country: string;
  city: string | null;
}
//IBusinessAccount
interface Business {
  id: number;
  name: string;
  logo: string;
  CEO: string;
  founder: string;
  founded: string;
  location_type: string;
  description: string;
  company_size: number;
  industry: string;
  website: string;
  headquarter: string;
  email: string;
  created_at: string;
  updated_at: string;
  address: Address;
}

export interface IJob {
  id: number;
  title: string;
  description: string;
  location: string;
  location_type: string;
  skills: string[];
  salary: number;
  employee_type: string;
  keywords: string[];
  experience: number;
  created_at: string;
  updated_at: string;
  business: Business;
}

export interface IapiFounded {
  success: boolean;
  job: IJob;
}

//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces
// export interface IPostResponse {}
