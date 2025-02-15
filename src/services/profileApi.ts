import { IEducation } from "../interfaces/Auth.interfaces";
import {
  IAddNewLanguageResponse,
  IAddNewSkillResponse,
  IAddNewVolunteeringResponse,
  IAddResumeResponse,
  ICertificateResponse,
  IGetAllResumesResponse,
  IGetUserResponse,
  IProjectResponse,
  IUpdateEducationResponse,
  IUpdateExperienceInputs,
  IUpdateExperienceResponse,
  IUpdatePersonalResponse,
  IGetVolunteeringsResponse,
  IUpdateVolunteeringResponse,
  IVolunteeringInputs,
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
    addNewSkill: builder.mutation<IAddNewSkillResponse, { skills: string[] }>({
      query: (data) => ({
        url: `${BASE_USER_URL}/addNewSkill`,
        method: "POST",
        body: data,
      }),
    }),
    addNewLanguage: builder.mutation<
      IAddNewLanguageResponse,
      { languages: string[] }
    >({
      query: (data) => ({
        url: `${BASE_USER_URL}/addNewLanguage`,
        method: "POST",
        body: data,
      }),
    }),
    deleteSkill: builder.mutation<void, { skillsId: number[] }>({
      query: (data) => ({
        url: `${BASE_USER_URL}/deleteSkill`,
        method: "DELETE",
        body: data,
      }),
    }),
    deleteLanguage: builder.mutation<void, { languagesId: number[] }>({
      query: (data) => ({
        url: `${BASE_USER_URL}/deleteLanguage`,
        method: "DELETE",
        body: data,
      }),
    }),
    addNewVolunteering: builder.mutation<
      IAddNewVolunteeringResponse,
      { data: IVolunteeringInputs }
    >({
      query: ({ data }) => ({
        url: `${BASE_USER_URL}/volunteering`,
        method: "POST",
        body: data,
      }),
    }),
    getAllVolunteerings: builder.query<IGetVolunteeringsResponse, void>({
      query: () => ({
        url: `${BASE_USER_URL}/myVolunteerings`,
        method: "GET",
      }),
    }),
    deleteVolunteering: builder.mutation({
      query: ({ id }) => ({
        url: `${BASE_USER_URL}/volunteering/${id}`,
        method: "DELETE",
      }),
    }),
    updateVolunteering: builder.mutation<
      IUpdateVolunteeringResponse,
      { data: IVolunteeringInputs; id: string }
    >({
      query: ({ data, id }) => ({
        url: `${BASE_USER_URL}/volunteering/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    createCertificate: builder.mutation<
      ICertificateResponse,
      { certificates: FormData }
    >({
      query: ({ certificates }) => ({
        url: `${BASE_USER_URL}/createCertificate`,
        method: "POST",
        body: certificates,
      }),
    }),
    updateCertificate: builder.mutation<
      ICertificateResponse,
      { data: FormData; id: string }
    >({
      query: ({ data, id }) => ({
        url: `${BASE_USER_URL}/updateCertificate/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCertificate: builder.mutation<void, { id: string }>({
      query: (id) => ({
        url: `${BASE_USER_URL}/deleteCertificate/${id}`,
        method: "DELETE",
      }),
    }),
    addProject: builder.mutation<IProjectResponse, { projects: FormData }>({
      query: ({ projects }) => ({
        url: `${BASE_USER_URL}/project`,
        method: "POST",
        body: projects,
      }),
    }),
    getAllProjects: builder.query<IProjectResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_USER_URL}/project/${id}`,
        method: "GET",
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${BASE_USER_URL}/project/${id}`,
        method: "DELETE",
      }),
    }),
    updateProject: builder.mutation<IProjectResponse, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_USER_URL}/project/${id}`,
        method: "PUT",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdatePersonalMutation,
  useUpdateExperienceMutation,
  useUpdateEducationMutation,
  useAddNewVolunteeringMutation,
  useGetAllResumesQuery,
  useGetAllVolunteeringsQuery,
  useAddResumeMutation,
  useDeleteResumeMutation,
  useDeleteExperienceMutation,
  useDeleteVolunteeringMutation,
  useAddNewExperienceMutation,
  useAddNewSkillMutation,
  useAddNewLanguageMutation,
  useDeleteSkillMutation,
  useDeleteLanguageMutation,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
} = profileApi;
