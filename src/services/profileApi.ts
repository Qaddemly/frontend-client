import {
  IGetUserResponse,
  IUpdateProfileResponse,
} from "../interfaces/Profile.interfaces";
import { apiSlice } from "./apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<IUpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/auth/updateMe",
        method: "PATCH",
        body: formData,
      }),
    }),
    getUser: builder.query<IGetUserResponse, void>({
      query: () => ({
        url: "/auth/getMe",
        method: "GET",
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useGetUserQuery } = profileApi;
