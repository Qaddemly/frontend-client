import { Country, LocationType } from "../enums/index.enums";
import { IResponse } from "./Common.interfaces";

export interface IBusinessAccount {
  id: number;
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
  company_size: number;
  industry: string;
  website: string;
  headquarter: string;
  email: string;
  phone: string;
  reviewsRatingsQuantity: number;
  reviewsRatingsAverage: number;
  created_at: string;
  updated_at: string;
}

export interface IBusinesses {
  id: number;
  name: string;
  logo: string;
  role: string;
}

export interface IReview {
  account_first_name: string;
  account_last_name: string;
  account_profile_picture: string;
  review_description: string;
  review_rating: string;
  review_business_id: number;
  review_account_id: number;
  review_created_at: string;
  review_updated_at: string;
}

// export interface IJob {
//   job_id: number;
//   job_title: string;
//   job_description: string;
//   // may be location => country + city (ask backend)
//   job_location: string;
//   job_location_type: LocationType;
//   job_skills: string[];
//   job_salary: number;
//   job_employee_type: string;
//   job_keywords: string;
//   job_experience: string;
//   job_create_at: string;
//   business_id: number;
//   business_name: string;
//   business_logo: string;
//   business_industry: string;
// }

//////////////////////////////////////////////////////////////////////////////
// Api Response Interfaces
export interface ICreateBusinessAccountResponse extends IResponse {
  business: IBusinessAccount;
}

export interface IGetUserBusinessesResponse {
  status: string;
  businesses: IBusinesses[];
}

export interface IGetBusinessAccountInfoResponse {
  status: string;
  business: IBusinessAccount;
}

export interface IGetReviewsResponse {
  status: string;
  reviews: IReview[];
}

// export interface IGetJobsResponse {
//   status: string;
//   jobs: IJob[];
// }
