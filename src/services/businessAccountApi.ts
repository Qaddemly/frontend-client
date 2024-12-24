import {
  ICreateBusinessAccountResponse,
  IGetBusinessAccountInfoResponse,
  IGetJobsResponse,
  IGetReviewsResponse,
  IGetUserBusinessesResponse,
  IUpdateBusinessAccountResponse,
} from "../interfaces/BusinessAccount.interfaces";
import { apiSlice } from "./apiSlice";

const BASE_BUSINESS_URL = "/business";

export const businessAccountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBusinessAccount: builder.mutation<
      ICreateBusinessAccountResponse,
      FormData
    >({
      query: (data) => ({
        url: `${BASE_BUSINESS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getUserBusinesses: builder.query<IGetUserBusinessesResponse, void>({
      query: () => ({
        url: `${BASE_BUSINESS_URL}/userBusinesses`,
        method: "GET",
      }),
    }),
    getBusinessAccountInfo: builder.query<
      IGetBusinessAccountInfoResponse,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/profile/${id}`,
        method: "GET",
      }),
    }),
    updateBusinessAccount: builder.mutation<
      IUpdateBusinessAccountResponse,
      { id: number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/edit/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getFiveReviews: builder.query<IGetReviewsResponse, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/profile/reviewsFive/${id}`,
        method: "GET",
      }),
    }),
    getSixJobs: builder.query<IGetJobsResponse, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/profile/jobsSix/${id}`,
        method: "GET",
      }),
    }),
    getAllReviews: builder.query<IGetReviewsResponse, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/profile/reviews/${id}`,
        method: "GET",
      }),
    }),
    getAllJobs: builder.query<IGetJobsResponse, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/profile/jobs/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBusinessAccountMutation,
  useGetUserBusinessesQuery,
  useGetBusinessAccountInfoQuery,
  useUpdateBusinessAccountMutation,
  useGetFiveReviewsQuery,
  useGetSixJobsQuery,
  useLazyGetAllReviewsQuery,
  useLazyGetAllJobsQuery,
} = businessAccountApi;
