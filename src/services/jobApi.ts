import { IResponse } from "../interfaces/Common.interfaces";
import {
  IGetAllJobsResponse,
  IGetArchivedJobApplicationsResponse,
  IGetJobApplicationsResponse,
  IGetJobDetailsResponse,
  IGetJobQuestionsResponse,
  IGetRecommendedJobs,
  ISavedJobsResponse,
} from "../interfaces/Job.interfaces";
import { apiSlice } from "./apiSlice";

const BASE_JOB_URL = "/job";
const BASE_AI_FEATURE_URL = "/AI-Feature";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query<
      IGetAllJobsResponse,
      {
        search?: string;
        page?: number;
        limit?: number;
        locationType?: string;
        employmentType?: string[];
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
          params.append("filter.employee_type[in]", employmentType.join(","));
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
    applyToJob: builder.mutation<IResponse, { data: FormData; jobId: string }>({
      query: ({ jobId, data }) => ({
        url: `${BASE_JOB_URL}/${jobId}/jobApplication`,
        method: "POST",
        body: data,
      }),
    }),
    getJobQuestions: builder.query<IGetJobQuestionsResponse, { jobId: string }>(
      {
        query: ({ jobId }) => ({
          url: `${BASE_JOB_URL}/${jobId}/questions`,
          method: "GET",
        }),
      },
    ),
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
    getOneJobApplication: builder.query<
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
    //////////////////////////////////////////// Matching Score (AI Feature) /////////////////////////////////////////
    matchScore: builder.query<
      { score: { similarity_score: number; message: string } },
      { jobId: number }
    >({
      query: ({ jobId }) => ({
        url: `${BASE_AI_FEATURE_URL}/matchScore/${jobId}`,
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
  useGetJobQuestionsQuery,
  useArchiveJobApplicationMutation,
  useGetRecommendedJobsQuery,
  useGetOneJobApplicationQuery,
  useGetArchivedJobApplicationQuery,
  //////////////////////////////////////////// Matching Score (AI Feature) /////////////////////////////////////////
  useLazyMatchScoreQuery,
} = jobApi;
