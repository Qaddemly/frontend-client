import {
  IGetAllJobsResponse,
  IGetJobDetailsResponse,
  ISavedJobsResponse,
} from "../interfaces/Job.interfaces";
import { apiSlice } from "./apiSlice";

const BASE_JOB_URL = "/job";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<
      IGetAllJobsResponse,
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search, page, limit }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());

        return {
          url: `${BASE_JOB_URL}/getAllJobs${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
    }),
    getJobDetails: builder.query<IGetJobDetailsResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_JOB_URL}/oneJob/${id}`,
        method: "GET",
      }),
    }),

    // getSavedJobs: builder.query<ISavedJobsResponse, void>({
    //   query: () => ({
    //     url: `${BASE_JOB_URL}/allUserSavedJobs`,
    //     method: "GET",
    //   }),
    // }),

    getAllSavedJobs: builder.query<
      ISavedJobsResponse,
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search, page, limit }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());

        return {
          url: `${BASE_JOB_URL}/getAllSavedJobs${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetJobDetailsQuery,
  useGetAllJobsQuery,
  useGetAllSavedJobsQuery,
} = jobApi;

// const BASE_JOB_URL = "job";
// export const postApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // void must be IPostResponse
//     post: builder.mutation<void, IPostData>({
//       query: (data) => ({
//         url: `${BASE_JOB_URL}/postJob`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { usePostMutation } = postApi;
