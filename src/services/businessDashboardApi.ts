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
  }),
});

export const {
  useGetListOfHrRolesQuery,
  useUpdateBusinessAccountMutation,
  useAddNewRoleMutation,
} = businessDashboardApi;
