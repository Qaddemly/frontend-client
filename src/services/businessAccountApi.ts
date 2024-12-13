import {
  IBusinessAccount,
  ICreateBusinessAccountResponse,
} from "../interfaces/BusinessAccount.interface";
import { apiSlice } from "./apiSlice";

const BASE_BUSINESS_URL = "/business";

export const businessAccountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBusinessAccount: builder.mutation<
      ICreateBusinessAccountResponse,
      IBusinessAccount
    >({
      query: (data) => ({
        url: `${BASE_BUSINESS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateBusinessAccountMutation } = businessAccountApi;
