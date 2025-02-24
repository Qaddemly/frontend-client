export interface ICompany {
  business_id: number;
  name: string;
  logo: string;
  description: string;
  location: {
    country: string;
    city: string;
  };
  country: string;
  city: string;
  location_type: string;
  reviews: number;
  employee_type: string;
  experience: number;
  created_at: string;
  updated_at: string;
  isSaved: boolean;
}

export interface IGetAllCompanysResponse {
  success: boolean;
  companys: ICompany[];
}

export interface ICompanys {
  data:ICompany[];
  meta:;
}

