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
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/edit/${id}`,
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
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/jobApplication/getAllJobApplications/job/${id}`,
        method: "GET",
      }),
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
  useUpdateJobApplicationStatusMutation,
} = businessDashboardApi;
