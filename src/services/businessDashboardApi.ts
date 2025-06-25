import {
  IGetJobApplicationsResponse,
  IGetListOfHrRolesResponse,
  INewRole,
  IPostNewJobInputs,
  IPostNewJobResponse,
  IUpdateBusinessAccountResponse,
  IUpdateJobInputs,
  IUpdateJobResponse,
} from "../interfaces/BusinessDashboard.interfaces";
import { IResponse } from "../interfaces/Common.interfaces";
import { IGetallJobsOfBusinessResponse } from "../interfaces/Job.interfaces";
import { apiSlice } from "./apiSlice";

const BASE_BUSINESS_URL = "/business";
const BASE_JOB_URL = "/job";

export const businessDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //////////////////////////// Dashboard Settings ////////////////////////////////////
    updateBusinessAccount: builder.mutation<
      IUpdateBusinessAccountResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/settings/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    //////////////////////////// Dashboard Candidates ////////////////////////////////////
    getListOfHrRoles: builder.query<IGetListOfHrRolesResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/hr/all/${id}`,
        method: "GET",
      }),
    }),
    addNewRole: builder.mutation<IResponse, { id: string; newRole: INewRole }>({
      query: ({ newRole, id }) => ({
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/hr/${id}`,
        method: "POST",
        body: newRole,
      }),
    }),
    deleteRole: builder.mutation<
      IResponse,
      { id: string; account_email: string }
    >({
      query: ({ account_email, id }) => ({
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/hr/${id}`,
        method: "DELETE",
        body: { account_email },
      }),
    }),
    updateRole: builder.mutation<
      IResponse,
      { id: string; account_email: string; role: string }
    >({
      query: ({ account_email, role, id }) => ({
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/hr/${id}`,
        method: "PUT",
        body: { account_email, role },
      }),
    }),
    //////////////////////////// Dashboard Jobs ////////////////////////////////////
    postNewJob: builder.mutation<IPostNewJobResponse, IPostNewJobInputs>({
      query: (data) => ({
        url: `${BASE_JOB_URL}/postJob`,
        method: "POST",
        body: data,
      }),
    }),
    makeJobClosed: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_JOB_URL}/makeJobClosed/${id}`,
        method: "PUT",
      }),
    }),
    makeJobArchived: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_JOB_URL}/makeJobArchived/${id}`,
        method: "PUT",
      }),
    }),
    makeJobOpened: builder.mutation<IResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_JOB_URL}/makeJobOpened/${id}`,
        method: "PUT",
      }),
    }),
    updateJob: builder.mutation<
      IUpdateJobResponse,
      { id: string; data: IUpdateJobInputs }
    >({
      query: ({ id, data }) => ({
        url: `${BASE_JOB_URL}/updateJob/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getJobApplications: builder.query<
      IGetJobApplicationsResponse,
      {
        id: string;
        page?: number;
        limit?: number;
        sortBy?: "DESC" | "ASC";
        filterByState?: string;
      }
    >({
      query: ({ id, page, limit, sortBy, filterByState }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (sortBy) params.append("sortBy=created_at", sortBy);
        if (filterByState)
          params.append("filter.job_application_state.state", filterByState);

        return {
          url: `${BASE_BUSINESS_URL}/dashboard/job/${id}/jobApplications${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
    }),
    getAllJobsOfBusiness: builder.query<
      IGetallJobsOfBusinessResponse,
      { id: string; search?: string; page?: number; limit?: number }
    >({
      query: ({ id, search, page, limit }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        return {
          url: `/business/profile/getAllJobs/${id}${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
    }),
    getAllArchivedJobsOfBusiness: builder.query<
      IGetallJobsOfBusinessResponse,
      { id: string; search?: string; page?: number; limit?: number }
    >({
      query: ({ id, search, page, limit }) => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        return {
          url: `/business/myBusiness/dashboard/AllArchivedJobs/${id}${params.toString() ? `?${params.toString()}` : ""}`,
          method: "GET",
        };
      },
    }),
    //////////////////////////// Dashboard Jobs Tracker ////////////////////////////////////
    updateJobApplicationStatus: builder.mutation<
      IResponse,
      { jobId: string; applicationId: string; status: string }
    >({
      query: ({ jobId, applicationId, status }) => ({
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/job/${jobId}/applications/${applicationId}`,
        method: "PUT",
        body: { status: status },
      }),
    }),
  }),
});

export const {
  useGetListOfHrRolesQuery,
  useUpdateBusinessAccountMutation,
  useAddNewRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
  usePostNewJobMutation,
  useMakeJobArchivedMutation,
  useMakeJobClosedMutation,
  useMakeJobOpenedMutation,
  useUpdateJobMutation,
  useGetJobApplicationsQuery,
  useLazyGetJobApplicationsQuery,
  useLazyGetAllJobsOfBusinessQuery,
  useGetAllJobsOfBusinessQuery,
  useGetAllArchivedJobsOfBusinessQuery,
  useLazyGetAllArchivedJobsOfBusinessQuery,
  useUpdateJobApplicationStatusMutation,
} = businessDashboardApi;
