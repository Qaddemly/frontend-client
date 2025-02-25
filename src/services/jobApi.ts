import { IResponse } from "../interfaces/Common.interfaces";
import {
  IApplyToJobResponse,
  IGetAllJobsResponse,
  IGetArchivedJobApplicationsResponse,
  IGetJobApplicationsResponse,
  IGetJobDetailsResponse,
  IGetRecommendedJobs,
  ISavedJobsResponse,
} from "../interfaces/Job.interfaces";
import { apiSlice } from "./apiSlice";

const BASE_JOB_URL = "/job";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<
      IGetAllJobsResponse,
      {
        search?: string;
        page?: number;
        limit?: number;
        locationType?: string;
        employmentType?: string;
        salary?: number;
      }
    >({
      query: ({
        search,
        page,
        limit,
        locationType,
        employmentType,
        salary,
      }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());

        if (locationType?.length) {
          params.append("filter.location_type[in]", locationType);
        }

        if (employmentType?.length) {
          params.append("filter.employee_type[in]", employmentType);
        }

        if (salary) {
          params.append("filter.salary[gt]", salary.toString());
        }

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
          url: `user/${BASE_JOB_URL}/mySavedJobs${params.toString() ? `?${params.toString()}` : ""}`,
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
    getUserJobApplications: builder.query<
      IGetJobApplicationsResponse,
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search, page, limit }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());

        return {
          url: `user/jobApplication/myAllJobApplications${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
    }),
    archiveJobApplication: builder.mutation<
      void,
      { id: string; archive: boolean }
    >({
      query: ({ archive, id }) => ({
        url: `user/jobApplication/archived/${id}?archive=${archive}`,
        method: "PUT",
      }),
    }),
    getOneJobDetails: builder.query<
      IGetJobApplicationsResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `user/jobApplication/${id}`,
        method: "GET",
      }),
    }),
    getArchivedJobApplication: builder.query<
      IGetArchivedJobApplicationsResponse,
      void
    >({
      query: () => ({
        url: "user/jobApplication/archived/all",
        method: "GET",
      }),
    }),
    getRecommendedJobs: builder.query<IGetRecommendedJobs, void>({
      query: () => ({
        url: `${BASE_JOB_URL}/recommendedJobsForUser`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetJobDetailsQuery,
  useGetAllJobsQuery,
  useLazyGetAllJobsQuery,
  useGetAllSavedJobsQuery,
  useGetUserJobApplicationsQuery,
  useSaveJobMutation,
  useUnSaveJobMutation,
  useApplyToJobMutation,
  useArchiveJobApplicationMutation,
  useGetRecommendedJobsQuery,
  useGetOneJobDetailsQuery,
  useGetArchivedJobApplicationQuery,
} = jobApi;
