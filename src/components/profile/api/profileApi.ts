import { IUpdateProfileResponse } from "../../../interfaces/Profile.interfaces";
import { apiSlice } from "../../../services/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<IUpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/auth/updateMe",
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApi;
