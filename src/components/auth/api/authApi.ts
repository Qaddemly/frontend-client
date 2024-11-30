import { Languages } from "..";
import { ILoginInputs } from "../../../pages/Login";
import { apiSlice } from "../../../services/apiSlice";

export interface SuccessLoginResponse {
  success: boolean;
  user: User;
  accessToken: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  skills: string[];
  role: string;
  active: boolean;
  isActivated: boolean;
  experience: Experience[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordChangedAt: string;
  address: Address;
  dateOfBirth: string;
  phone: Phone;
  profilePicture: string;
  resume: string;
  languages: Languages[];
}

export interface Experience {
  jobTitle: string;
  employmentType: string;
  companyName: string;
  location: string;
  locationType: string;
  stillWorking: boolean;
  startDate: string;
  _id: string;
}

export interface Address {
  country: string;
  city: string;
  _id: string;
}

export interface Phone {
  countryCode: number;
  number: string;
  _id: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<SuccessLoginResponse, ILoginInputs>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
