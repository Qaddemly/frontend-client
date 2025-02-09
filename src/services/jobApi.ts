import { IResponse } from "../interfaces/Common.interfaces";
import {
  IApplyToJobResponse,
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
          url: `${BASE_JOB_URL}/allUserSavedJobs${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
    }),
    saveJob: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_JOB_URL}/saveJob/${id}`,
        method: "POST",
      }),
    }),
    unSaveJob: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_JOB_URL}/unSaveJob/${id}`,
        method: "DELETE",
      }),
    }),
    applyToJob: builder.mutation<
      IApplyToJobResponse,
      { id: string; resume_id: number }
    >({
      query: ({ resume_id, id }) => ({
        url: `${BASE_JOB_URL}/applyToJob/${id}`,
        method: "POST",
        body: { resume_id },
      }),
    }),
  }),
});

export const {
  useGetJobDetailsQuery,
  useGetAllJobsQuery,
  useGetAllSavedJobsQuery,
  useSaveJobMutation,
  useUnSaveJobMutation,
} = jobApi;
