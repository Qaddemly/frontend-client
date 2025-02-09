import { IEducation } from "../interfaces/Auth.interfaces";
import {
  IAddResumeResponse,
  IGetAllResumesResponse,
  IGetUserResponse,
  IUpdateEducationResponse,
  IUpdateExperienceInputs,
  IUpdateExperienceResponse,
  IUpdatePersonalResponse,
} from "../interfaces/Profile.interfaces";
import { apiSlice } from "./apiSlice";

const BASE_USER_URL = "/user";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IGetUserResponse, void>({
      query: () => ({
        url: "/auth/getMe",
        method: "GET",
      }),
    }),
    updatePersonal: builder.mutation<
      IUpdatePersonalResponse,
      { data: FormData }
    >({
      query: ({ data }) => ({
        url: `${BASE_USER_URL}/updateBasicInfo`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateExperience: builder.mutation<
      IUpdateExperienceResponse,
      { data: IUpdateExperienceInputs; id: string }
    >({
      query: ({ data, id }) => ({
        url: `${BASE_USER_URL}/updateExperience/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    updateEducation: builder.mutation<
      IUpdateEducationResponse,
      { data: IEducation }
    >({
      query: ({ data }) => ({
        url: `${BASE_USER_URL}/updateEducation`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllResumes: builder.query<IGetAllResumesResponse, void>({
      query: () => ({
        url: `${BASE_USER_URL}/getAllResumes`,
        method: "GET",
      }),
    }),
    addResume: builder.mutation<IAddResumeResponse, { resumes: FormData }>({
      query: ({ resumes }) => ({
        url: `${BASE_USER_URL}/addResume`,
        method: "POST",
        body: resumes,
      }),
    }),
    deleteResume: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_USER_URL}/deleteResume/${id}`,
        method: "DELETE",
      }),
    }),
    addNewSkill: builder.mutation<void, void>({
      query: () => ({
        url: `${BASE_USER_URL}/addNewSkill`,
        method: "DELETE",
      }),
    }),
    deleteExperience: builder.mutation({
      query: ({ id }) => ({
        url: `${BASE_USER_URL}/deleteExperience/${id}`,
        method: "DELETE",
      }),
    }),
    addNewExperience: builder.mutation({
      query: (data) => ({
        url: `${BASE_USER_URL}/addNewExperience`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdatePersonalMutation,
  useUpdateExperienceMutation,
  useUpdateEducationMutation,
  useGetAllResumesQuery,
  useAddResumeMutation,
  useDeleteResumeMutation,
  useDeleteExperienceMutation,
  useAddNewExperienceMutation,
} = profileApi;
