import { apiSlice } from "./apiSlice.ts";
import {
  IAddPersonalInfoResponse,
  IAddResumeTemplateResopnse,
  IGetAllResumeEducationResponse,
  IGetAllResumeTemplatesResponse,
  IGetResumeEducationResponse,
  IGetResumePersonalInfoResponse,
  IResumeEducation,
} from "../interfaces/ResumeBuilder.interfaces.ts";

const BASE_RESUME_URL = "/resumeTemplate";

export const resumeBuilderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ///////////////////////////////////////////// Resume Template //////////////////////////////////////////////
    addResumeTemplate: builder.mutation<IAddResumeTemplateResopnse, void>({
      query: () => ({
        url: `${BASE_RESUME_URL}`,
        method: "POST",
      }),
    }),
    getAllResumeTemplates: builder.query<IGetAllResumeTemplatesResponse, void>({
      query: () => ({
        url: `${BASE_RESUME_URL}`,
        method: "GET",
      }),
    }),
    deleteResumeTemplate: builder.mutation<void, { resumeTemplateId: string }>({
      query: ({ resumeTemplateId }) => ({
        url: `${BASE_RESUME_URL}/${resumeTemplateId}`,
        method: "DELETE",
      }),
    }),

    ///////////////////////////////////////////// Personal //////////////////////////////////////////////
    getResumePersonal: builder.query<
      IGetResumePersonalInfoResponse,
      { resumeId: string }
    >({
      query: ({ resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/PersonalInfo`,
        method: "GET",
      }),
    }),
    addResumePersonal: builder.mutation<
      IAddPersonalInfoResponse,
      { data: FormData; resumeId: string }
    >({
      query: ({ data, resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/PersonalInfo`,
        method: "POST",
        body: data,
      }),
    }),
    updateResumePersonal: builder.mutation<
      void,
      { data: FormData; resumeId: string; personalInfoId: string }
    >({
      query: ({ data, resumeId, personalInfoId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/PersonalInfo/${personalInfoId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteResumePersonal: builder.mutation<
      void,
      { resumeId: string; personalInfoId: string }
    >({
      query: ({ resumeId, personalInfoId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/PersonalInfo/${personalInfoId}`,
        method: "DELETE",
      }),
    }),
    ///////////////////////////////////////////// Education //////////////////////////////////////////////
    getAllResumeEducation: builder.query<
      IGetAllResumeEducationResponse,
      { resumeId: string }
    >({
      query: ({ resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/education`,
        method: "GET",
      }),
    }),
    getResumeEducation: builder.query<
      IGetResumeEducationResponse,
      { resumeId: string; educationId: string }
    >({
      query: ({ resumeId, educationId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/education/${educationId}`,
        method: "GET",
      }),
    }),
    addResumeEducation: builder.mutation<
      IGetResumeEducationResponse,
      { resumeId: string; data: IResumeEducation }
    >({
      query: ({ resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/education`,
        method: "POST",
      }),
    }),
    updateResumeEducation: builder.mutation<
      IGetResumeEducationResponse,
      { resumeId: string; data: IResumeEducation; educationId: string }
    >({
      query: ({ resumeId, educationId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/education/${educationId}`,
        method: "PUT",
      }),
    }),
    deleteResumeEducation: builder.mutation<
      void,
      { resumeId: string; data: IResumeEducation; educationId: string }
    >({
      query: ({ resumeId, educationId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/education/${educationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  ///////////////////////////////////////////// Resume Template //////////////////////////////////////////////
  useGetAllResumeTemplatesQuery,
  useAddResumeTemplateMutation,
  useDeleteResumeTemplateMutation,
  ///////////////////////////////////////////// Personal //////////////////////////////////////////////
  useGetResumePersonalQuery,
  useAddResumePersonalMutation,
  useUpdateResumePersonalMutation,
  useDeleteResumePersonalMutation,
  ///////////////////////////////////////////// Education //////////////////////////////////////////////
  useGetAllResumeEducationQuery,
  useGetResumeEducationQuery,
  useAddResumeEducationMutation,
  useUpdateResumeEducationMutation,
  useDeleteResumeEducationMutation,
} = resumeBuilderApi;
