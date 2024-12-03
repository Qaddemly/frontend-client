import {
  IActivateEmailResponse,
  IEmailVerfiyInputs,
  IForgetMyPassword,
  IForgetMyPasswordResponse,
  ILoginInputs,
  ILoginResponse,
  ILogoutResponse,
  IResendActivateCodeResponse,
  IResendForgetPasswordCodeResponse,
  ISetNewPasswordInputs,
  ISetNewPasswordResponse,
  ISignupInputs,
  ISignupResponse,
  IUserInfoResponse,
  IVerifyForgetPasswordInputs,
  IVerifyForgetPasswordResponse,
} from "../interfaces/Auth.interfaces";
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
    signUpWithGoogle: builder.mutation<void, void>({
      query: () => ({
        url: `${BASE_AUTH_URL}/googleAuth`,
        method: "GET",
      }),
    }),
    signUp: builder.mutation<ISignupResponse, ISignupInputs>({
      query: (data) => ({
        url: `${BASE_AUTH_URL}/signUp`,
        method: "POST",
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
    setNewPassword: builder.mutation<
      ISetNewPasswordResponse,
      ISetNewPasswordInputs
    >({
      query: ({ passwordResetToken, newPassword, newPasswordConfirm }) => ({
        url: `${BASE_AUTH_URL}/resetMyPassword/${passwordResetToken}`,
        method: "POST",
        body: { newPassword, newPasswordConfirm },
      }),
    }),
    resendActivateCode: builder.mutation<
      IResendActivateCodeResponse,
      { activationToken: string }
    >({
      query: ({ activationToken }) => ({
        url: `${BASE_AUTH_URL}/resendActivateCode/${activationToken}`,
        method: "PUT",
      }),
    }),
    resendForgetPasswordCode: builder.mutation<
      IResendForgetPasswordCodeResponse,
      { resetVerificationToken: string }
    >({
      query: ({ resetVerificationToken }) => ({
        url: `${BASE_AUTH_URL}/resendForgetPassCode/${resetVerificationToken}`,
        method: "PUT",
      }),
    }),
    logout: builder.mutation<ILogoutResponse, void>({
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
  useSignUpWithGoogleMutation,
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
