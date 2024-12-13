import { Country, LocationType } from "../components/auth";
import { IResponse } from "./Auth.interfaces";

export interface IBusinessAccount {
  name: string;
  logo: string;
  CEO: string;
  founder: string;
  founded: string;
  address: {
    country: Country;
    city: string;
  };
  location_type: LocationType;
  description: string;
  company_size: string;
  industry: string;
  website: string;
  headquarter: string;
  email: string;
  phone: string;
  id: number;
  created_at: string;
  updated_at: string;
}

//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces
export interface ICreateBusinessAccountResponse extends IResponse {
  business: IBusinessAccount;
}
