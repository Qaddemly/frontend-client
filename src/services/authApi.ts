import {
  IActivateEmailResponse,
  IEmailVerfiyInputs,
  IForgetMyPassword,
  IForgetMyPasswordResponse,
  ILoginInputs,
  ILoginResponse,
  ISetNewPasswordInputs,
  ISignupInputs,
  ISignupResponse,
  IUser,
  IUserInfoResponse,
  IVerifyForgetPasswordInputs,
  IVerifyForgetPasswordResponse,
} from "../interfaces/Auth.interfaces";
import { IResponse } from "../interfaces/Common.interfaces";
import { apiSlice } from "./apiSlice";

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
    signup2: builder.mutation<ISignupResponse, IUser>({
      query: (data) => ({
        url: `${BASE_AUTH_URL}/completeRegistration`,
        method: "PUT",
        body: data,
      }),
    }),
    userInfo: builder.mutation<IUserInfoResponse, FormData>({
      query: (formData) => ({
        url: `${BASE_AUTH_URL}/completeRegistration`,
        method: "PUT",
        body: formData,
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
    forgetMyPassword: builder.mutation<
      IForgetMyPasswordResponse,
      IForgetMyPassword
    >({
      query: (data) => ({
        url: `${BASE_AUTH_URL}/forgetMyPassword`,
        method: "POST",
        body: data,
      }),
    }),
    verifyForgetPassword: builder.mutation<
      IVerifyForgetPasswordResponse,
      IVerifyForgetPasswordInputs
    >({
      query: ({ resetVerificationToken, code }) => ({
        url: `${BASE_AUTH_URL}/verifyForgetPassCode/${resetVerificationToken}`,
        method: "PUT",
        body: { code },
      }),
    }),
    setNewPassword: builder.mutation<IResponse, ISetNewPasswordInputs>({
      query: ({ passwordResetToken, newPassword, newPasswordConfirm }) => ({
        url: `${BASE_AUTH_URL}/resetMyPassword/${passwordResetToken}`,
        method: "POST",
        body: { newPassword, newPasswordConfirm },
      }),
    }),
    resendActivateCode: builder.mutation<
      IResponse,
      { activationToken: string }
    >({
      query: ({ activationToken }) => ({
        url: `${BASE_AUTH_URL}/resendActivateCode/${activationToken}`,
        method: "PUT",
      }),
    }),
    resendForgetPasswordCode: builder.mutation<
      IResponse,
      { resetVerificationToken: string }
    >({
      query: ({ resetVerificationToken }) => ({
        url: `${BASE_AUTH_URL}/resendForgetPassCode/${resetVerificationToken}`,
        method: "PUT",
      }),
    }),
    logout: builder.mutation<IResponse, void>({
      query: () => ({
        url: `${BASE_AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useUserInfoMutation,
  useActivateEmailMutation,
  useForgetMyPasswordMutation,
  useVerifyForgetPasswordMutation,
  useSetNewPasswordMutation,
  useResendActivateCodeMutation,
  useResendForgetPasswordCodeMutation,
  useLogoutMutation,
} = authApi;
