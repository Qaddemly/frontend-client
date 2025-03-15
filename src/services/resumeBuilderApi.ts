import { apiSlice } from "./apiSlice.ts";
import {
  IAddPersonalInfoResponse,
  IAddResumeTemplateResopnse,
  ICertificatesInputs,
  IEducationInputs,
  IExperienceInputs,
  IGetAllResumeEducationResponse,
  IGetAllResumeTemplatesResponse,
  IGetResumeCertificateInfoResponse,
  IGetResumeCertificatesInfoResponse,
  IGetResumeEducationResponse,
  IGetResumeExperienceInfoResponse,
  IGetResumeExperiencesInfoResponse,
  IGetResumePersonalInfoResponse,
  IGetResumeProjectInfoResponse,
  IGetResumeProjectsInfoResponse,
  IGetResumeSkillInfoResponse,
  IGetResumeSkillsInfoResponse,
  IProjectsInputs,
  ISkillsInputs,
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
    ///////////////////////////////////////////// Profile //////////////////////////////////////////////
    addOrEditAboutme: builder.mutation<
      void,
      { resumeId: string; data: { profile: string } }
    >({
      query: ({ resumeId, data }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/profile`,
        method: "PUT",
        body: data,
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
      {
        resumeId: string;
        data: IEducationInputs;
      }
    >({
      query: ({ data, resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/education`,
        method: "POST",
        body: data,
      }),
    }),
    updateResumeEducation: builder.mutation<
      IGetResumeEducationResponse,
      { resumeId: string; data: IEducationInputs; educationId: string }
    >({
      query: ({ data, resumeId, educationId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/education/${educationId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteResumeEducation: builder.mutation<
      void,
      { resumeId: string; educationId: string }
    >({
      query: ({ resumeId, educationId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/education/${educationId}`,
        method: "DELETE",
      }),
    }),
    ///////////////////////////////////////////// Experience //////////////////////////////////////////////
    getAllResumeExperience: builder.query<
      IGetResumeExperiencesInfoResponse,
      { resumeId: string }
    >({
      query: ({ resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/experience`,
        method: "GET",
      }),
    }),
    getResumeExperience: builder.query<
      IGetResumeExperienceInfoResponse,
      { resumeId: string; experienceId: string }
    >({
      query: ({ resumeId, experienceId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/experience/${experienceId}`,
        method: "GET",
      }),
    }),
    addResumeExperience: builder.mutation<
      IGetResumeExperienceInfoResponse,
      {
        resumeId: string;
        data: IExperienceInputs;
      }
    >({
      query: ({ data, resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/experience`,
        method: "POST",
        body: data,
      }),
    }),
    updateResumeExperience: builder.mutation<
      IGetResumeExperienceInfoResponse,
      { resumeId: string; data: IExperienceInputs; experienceId: string }
    >({
      query: ({ data, resumeId, experienceId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/experience/${experienceId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteResumeExperience: builder.mutation<
      void,
      { resumeId: string; experienceId: string }
    >({
      query: ({ resumeId, experienceId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/experience/${experienceId}`,
        method: "DELETE",
      }),
    }),
    ///////////////////////////////////////////// Skills //////////////////////////////////////////////

    getAllResumeSkills: builder.query<
      IGetResumeSkillsInfoResponse,
      { resumeId: string }
    >({
      query: ({ resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/skill`,
        method: "GET",
      }),
    }),
    getResumeSkill: builder.query<
      IGetResumeSkillInfoResponse,
      { resumeId: string; skillId: string }
    >({
      query: ({ resumeId, skillId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/skill/${skillId}`,
        method: "GET",
      }),
    }),
    addResumeSkill: builder.mutation<
      IGetResumeSkillInfoResponse,
      {
        resumeId: string;
        data: ISkillsInputs;
      }
    >({
      query: ({ data, resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/skill`,
        method: "POST",
        body: data,
      }),
    }),
    updateResumeSkill: builder.mutation<
      IGetResumeSkillInfoResponse,
      { resumeId: string; data: ISkillsInputs; skillId: string }
    >({
      query: ({ data, resumeId, skillId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/skill/${skillId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteResumeSkill: builder.mutation<
      void,
      { resumeId: string; skillId: string }
    >({
      query: ({ resumeId, skillId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/skill/${skillId}`,
        method: "DELETE",
      }),
    }),
    ///////////////////////////////////////////// Certificates //////////////////////////////////////////////
    getAllResumeCertificates: builder.query<
      IGetResumeCertificatesInfoResponse,
      { resumeId: string }
    >({
      query: ({ resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/certificate`,
        method: "GET",
      }),
    }),
    getResumeCertificate: builder.query<
      IGetResumeCertificateInfoResponse,
      { resumeId: string; certificateId: string }
    >({
      query: ({ resumeId, certificateId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/certificate/${certificateId}`,
        method: "GET",
      }),
    }),
    addResumeCertificate: builder.mutation<
      IGetResumeCertificateInfoResponse,
      {
        resumeId: string;
        data: ICertificatesInputs;
      }
    >({
      query: ({ data, resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/certificate`,
        method: "POST",
        body: data,
      }),
    }),
    updateResumeCertificate: builder.mutation<
      IGetResumeCertificateInfoResponse,
      { resumeId: string; data: ICertificatesInputs; certificateId: string }
    >({
      query: ({ data, resumeId, certificateId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/certificate/${certificateId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteResumeCertificate: builder.mutation<
      void,
      { resumeId: string; certificateId: string }
    >({
      query: ({ resumeId, certificateId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/certificate/${certificateId}`,
        method: "DELETE",
      }),
    }),
    ///////////////////////////////////////////// Projects //////////////////////////////////////////////
    getAllResumeProjects: builder.query<
      IGetResumeProjectsInfoResponse,
      { resumeId: string }
    >({
      query: ({ resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/project`,
        method: "GET",
      }),
    }),
    getResumeProject: builder.query<
      IGetResumeProjectInfoResponse,
      { resumeId: string; projectId: string }
    >({
      query: ({ resumeId, projectId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/project/${projectId}`,
        method: "GET",
      }),
    }),
    addResumeProject: builder.mutation<
      IGetResumeProjectInfoResponse,
      {
        resumeId: string;
        data: IProjectsInputs;
      }
    >({
      query: ({ data, resumeId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/project`,
        method: "POST",
        body: data,
      }),
    }),
    updateResumeProject: builder.mutation<
      IGetResumeProjectInfoResponse,
      { resumeId: string; data: IProjectsInputs; projectId: string }
    >({
      query: ({ data, resumeId, projectId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/project/${projectId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteResumeProject: builder.mutation<
      void,
      { resumeId: string; projectId: string }
    >({
      query: ({ resumeId, projectId }) => ({
        url: `${BASE_RESUME_URL}/${resumeId}/project/${projectId}`,
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
  ///////////////////////////////////////////// Profile //////////////////////////////////////////////
  useAddOrEditAboutmeMutation,
  ///////////////////////////////////////////// Education //////////////////////////////////////////////
  useGetAllResumeEducationQuery,
  useGetResumeEducationQuery,
  useAddResumeEducationMutation,
  useUpdateResumeEducationMutation,
  useDeleteResumeEducationMutation,
  ///////////////////////////////////////////// Experience //////////////////////////////////////////////
  useGetAllResumeExperienceQuery,
  useGetResumeExperienceQuery,
  useAddResumeExperienceMutation,
  useUpdateResumeExperienceMutation,
  useDeleteResumeExperienceMutation,
  ///////////////////////////////////////////// Skills //////////////////////////////////////////////
  useGetAllResumeSkillsQuery,
  useGetResumeSkillQuery,
  useAddResumeSkillMutation,
  useUpdateResumeSkillMutation,
  useDeleteResumeSkillMutation,
  ///////////////////////////////////////////// Certificates //////////////////////////////////////////////
  useGetAllResumeCertificatesQuery,
  useGetResumeCertificateQuery,
  useAddResumeCertificateMutation,
  useUpdateResumeCertificateMutation,
  useDeleteResumeCertificateMutation,
  ///////////////////////////////////////////// Projects //////////////////////////////////////////////
  useGetAllResumeProjectsQuery,
  useGetResumeProjectQuery,
  useAddResumeProjectMutation,
  useUpdateResumeProjectMutation,
  useDeleteResumeProjectMutation,
} = resumeBuilderApi;
