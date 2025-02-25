import {
  IAddReview,
  IAddReviewResponse,
  ICreateBusinessAccountResponse,
  IGetAllBusinessesResponse,
  IGetBusinessAccountInfoResponse,
  // IGetJobsResponse,
  IGetReviewsResponse,
  IGetUserBusinessesResponse,
} from "../interfaces/BusinessAccount.interfaces";
import { IResponse } from "../interfaces/Common.interfaces";
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
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/profile/${id}`,
        method: "GET",
      }),
    }),

    getAllBusinesses: builder.query<
      IGetAllBusinessesResponse,
      {
        search?: string;
        page?: number;
        limit?: number;
        locationType?: string;
        Country?: string;
        Industry?: string;
        AverageRating?: number;
      }
    >({
      query: ({
        search,
        page,
        limit,
        locationType,
        Country,
        Industry,
        AverageRating,
      }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (locationType?.length) {
          params.append("filter.location_type", locationType);
        }
        if (Country?.length) {
          params.append("filter.address.country", Country);
        }
        if (Industry?.length) {
          params.append("filter.industry", Industry);
        }
        if (AverageRating) {
          params.append(
            "filter.reviewsRatingsAverage[eq]",
            AverageRating.toString(),
          );
        }

        return {
          url: `${BASE_BUSINESS_URL}/searchAndFilter${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
    }),
    getFiveReviews: builder.query<IGetReviewsResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/profile/reviewsFive/${id}`,
        method: "GET",
      }),
    }),
    // getSixJobs: builder.query<IGetJobsResponse, { id: number }>({
    //   query: ({ id }) => ({
    //     url: `${BASE_BUSINESS_URL}/profile/jobsSix/${id}`,
    //     method: "GET",
    //   }),
    // }),
    getBusinessReviews: builder.query<IGetReviewsResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/profile/reviews/${id}`,
        method: "GET",
      }),
    }),
    // getAllJobs: builder.query<IGetJobsResponse, { id: number }>({
    //   query: ({ id }) => ({
    //     url: `${BASE_BUSINESS_URL}/profile/jobs/${id}`,
    //     method: "GET",
    //   }),
    // }),
    followBusiness: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/account/followBusiness/${id}`,
        method: "POST",
      }),
    }),
    unfollowBusiness: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/account/unfollowBusiness/${id}`,
        method: "DELETE",
      }),
    }),
    addReview: builder.mutation<IAddReviewResponse, { data: IAddReview }>({
      query: ({ data }) => ({
        url: `/review`,
        method: "POST",
        body: data,
      }),
    }),
    updateReview: builder.mutation<
      void,
      { data: { rating?: number; description?: string }; id: string }
    >({
      query: ({ data, id }) => ({
        url: `/review/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteReview: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBusinessAccountMutation,
  useGetUserBusinessesQuery,
  useGetBusinessAccountInfoQuery,
  useLazyGetAllBusinessesQuery,
  useGetFiveReviewsQuery,
  // useGetSixJobsQuery,
  useGetBusinessReviewsQuery,
  // useLazyGetAllJobsQuery,
  useFollowBusinessMutation,
  useUnfollowBusinessMutation,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = businessAccountApi;
