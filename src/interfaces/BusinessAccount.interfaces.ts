import { Country, LocationType } from "../enums/index.enums";
import { IPhone } from "./Auth.interfaces";
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
  phone: IPhone[];
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
  account_id: number;
  account_first_name: string;
  account_last_name: string;
  account_profile_picture: string;
  description: string;
  review_rating: string;
  review_business_id: number;
  review_created_at: string;
  review_updated_at: string;
}

export interface IAddReview {
  business_id: number;
  rating: number;
  description: string;
  account_id: number;
}
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
  ifFollowedByLoggedInUser: IIfFollowedByLoggedInUser;
}

export interface IIfFollowedByLoggedInUser {
  account_id: number;
  business_id: number;
}

export interface IGetReviewsResponse {
  status: string;
  reviews: IReview[];
}

export interface IAddReviewResponse {
  status: string;
  review: {
    id: number;
    description: string;
    rating: number;
    created_at: string;
    updated_at: string;
    business_id: number;
    account_id: number;
  };
}
