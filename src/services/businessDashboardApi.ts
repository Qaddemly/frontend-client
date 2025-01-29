import {
  IGetListOfHrRolesResponse,
  INewRole,
  IUpdateBusinessAccountResponse,
} from "../interfaces/BusinessDashboard.interfaces";
import { IResponse } from "../interfaces/Common.interfaces";
import { apiSlice } from "./apiSlice";

const BASE_BUSINESS_URL = "/business";

export const businessDashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListOfHrRoles: builder.query<IGetListOfHrRolesResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_BUSINESS_URL}/myBusiness/dashboard/hr/all/${id}`,
        method: "GET",
      }),
    }),
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
        body: account_email,
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
  }),
});

export const {
  useGetListOfHrRolesQuery,
  useUpdateBusinessAccountMutation,
  useAddNewRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
} = businessDashboardApi;
