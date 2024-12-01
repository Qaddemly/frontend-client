import {
  IActivateEmailResponse,
  IEmailVerfiyInputs,
  ILoginResponse,
  ISignupResponse,
} from "../../../interfaces/Auth.interfaces";
import { ILoginInputs } from "../../../pages/Login";
import { ISignupInputs } from "../../../pages/Signup";
import { apiSlice } from "../../../services/apiSlice";

const BASE_AUTH_URL = "/auth";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginInputs>({
      query: (data) => ({
        url: `${BASE_AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation<ISignupResponse, ISignupInputs>({
      query: (data) => ({
        url: `${BASE_AUTH_URL}/signUp`,
        method: "POST",
        body: data,
      }),
    }),
    activateEmail: builder.mutation<IActivateEmailResponse, IEmailVerfiyInputs>(
      {
        query: ({ code, activationToken }) => ({
          url: `${BASE_AUTH_URL}/activateEmail/${activationToken}`,
          method: "PUT",
          body: { code },
        }),
      },
    ),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignUpMutation, useActivateEmailMutation } =
  authApi;
