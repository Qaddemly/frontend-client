import { IGetUserResponse } from "../interfaces/Profile.interfaces";
import { apiSlice } from "./apiSlice";

/**
 * this api need to be refactored with new one on postman
 */

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IGetUserResponse, void>({
      query: () => ({
        url: "/auth/getMe",
        method: "GET",
      }),
    }),

    /**
     * this api is no longer work
     * this api need to be refactored with new one on postman
     */
    // updateProfile: builder.mutation<IUpdateProfileResponse, FormData>({
    //   query: (formData) => ({
    //     url: "/auth/updateMe",
    //     method: "PATCH",
    //     body: formData,
    //   }),
    // }),
  }),
});

export const { useGetUserQuery } = profileApi;
