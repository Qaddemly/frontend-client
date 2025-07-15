import { apiSlice } from "./apiSlice.ts";
import {
  IPersonalCoverLetterResponse,
  ICoverLetterResponse,
  ICoverLetterTemplate,
  IGetCoverLetterResponse,
  IGetCoverLettersResponse,
  IGetPersonalCoverLetterResponse,
} from "../interfaces/CoverLetter.interfaces.ts";

const BASE_COVER_LETTER_URL = "/coverLetter";
const BASE_AI_FEATURE_URL = "/AI-Feature";

export const coverLetterBuilderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ///////////////////////////////////////////// AI ChatBot //////////////////////////////////////////////
    sendMessageToBot: builder.mutation<{ answer: string }, { message: string }>(
      {
        query: (body) => ({
          url: `/AI-Feature/chatBot`,
          method: "POST",
          body,
        }),
      },
    ),
    ///////////////////////////////////////////// Cover Letter Template //////////////////////////////////////////////
    getCoverLetter: builder.query<IGetCoverLetterResponse, { id: string }>({
      query: (id) => ({
        url: `${BASE_COVER_LETTER_URL}/${id}`,
        method: "GET",
      }),
    }),
    getCoverLetters: builder.query<IGetCoverLettersResponse, void>({
      query: () => ({
        url: `${BASE_COVER_LETTER_URL}`,
        method: "GET",
      }),
    }),
    addCoverLetter: builder.mutation<
      ICoverLetterResponse,
      { data: { name: string } }
    >({
      query: ({ data }) => ({
        url: `${BASE_COVER_LETTER_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    updateCoverLetter: builder.mutation<
      ICoverLetterResponse,
      { coverLetter: ICoverLetterTemplate; id: string }
    >({
      query: ({ id, coverLetter }) => ({
        url: `${BASE_COVER_LETTER_URL}/${id}`,
        method: "PUT",
        body: coverLetter,
      }),
    }),
    deleteCoverLetter: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_COVER_LETTER_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    ///////////////////////////////////////////// Personal //////////////////////////////////////////////
    getPersonalCoverLetter: builder.query<
      IGetPersonalCoverLetterResponse,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${BASE_COVER_LETTER_URL}/${id}/PersonalDetails`,
        method: "GET",
      }),
    }),
    addPersonalCoverLetter: builder.mutation<
      IPersonalCoverLetterResponse,
      { coverLetter: FormData; id: string }
    >({
      query: ({ coverLetter, id }) => ({
        url: `${BASE_COVER_LETTER_URL}/${id}/PersonalDetails`,
        method: "POST",
        body: coverLetter,
      }),
    }),
    updatePersonalCoverLetter: builder.mutation<
      IPersonalCoverLetterResponse,
      { coverLetter: FormData; id: string }
    >({
      query: ({ coverLetter, id }) => ({
        url: `${BASE_COVER_LETTER_URL}/${id}/PersonalDetails`,
        method: "PUT",
        body: coverLetter,
      }),
    }),
    deletePersonalCoverLetter: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `${BASE_COVER_LETTER_URL}/${id}/PersonalDetails`,
        method: "DELETE",
      }),
    }),
    ///////////////////////////////////////////// Cover Letter Builder Enhancement (AI Feature) //////////////////////////////////////////////
    generateOrEnhanceCoverLetterBody: builder.mutation<
      { coverLetterBody: string },
      { existingBody: string; jobDescription: string }
    >({
      query: ({ existingBody, jobDescription }) => ({
        url: `${BASE_AI_FEATURE_URL}/coverLetterBuilder`,
        method: "POST",
        body: { existingBody, jobDescription },
      }),
    }),
  }),
});

export const {
  useSendMessageToBotMutation,
  useGetCoverLetterQuery,
  useGetCoverLettersQuery,
  useAddCoverLetterMutation,
  useUpdateCoverLetterMutation,
  useDeleteCoverLetterMutation,
  useGetPersonalCoverLetterQuery,
  useAddPersonalCoverLetterMutation,
  useUpdatePersonalCoverLetterMutation,
  useDeletePersonalCoverLetterMutation,
  ///////////////////////////////////////////// Cover Letter Builder Enhancement (AI Feature) //////////////////////////////////////////////
  useGenerateOrEnhanceCoverLetterBodyMutation,
} = coverLetterBuilderApi;
