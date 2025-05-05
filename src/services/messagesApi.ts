import { apiSlice } from "./apiSlice.ts";
import {
  ICreateChatResponse,
  IGetAllChatsResponse,
  IGetAllMessagesResponse,
} from "../interfaces/Messages.interfaces.ts";

const BASE_MESSAGES_URL = "/chat";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllChatsOfUser: builder.query<IGetAllChatsResponse, void>({
      query: () => ({
        url: `${BASE_MESSAGES_URL}/user/getAllUserChats`,
        method: "GET",
      }),
    }),
    getAllChatsOfBusiness: builder.query<
      IGetAllChatsResponse,
      { businessId: string }
    >({
      query: ({ businessId }) => ({
        url: `${BASE_MESSAGES_URL}/business/getAllBusinessChats/${businessId}`,
        method: "GET",
      }),
    }),
    getAllMessagesOfUser: builder.query<
      IGetAllMessagesResponse,
      { chatId: string; page: string }
    >({
      query: ({ chatId, page }) => ({
        url: `${BASE_MESSAGES_URL}/user/getAllMessages/${chatId}?page=${page}`,
        method: "GET",
      }),
    }),
    getAllMessagesOfBusiness: builder.query<
      IGetAllMessagesResponse,
      { businessId: string; chatId: string }
    >({
      query: ({ businessId, chatId }) => ({
        url: `${BASE_MESSAGES_URL}/business/getAllMessages/${businessId}/${chatId}`,
        method: "GET",
      }),
    }),
    createNewChat: builder.mutation<
      ICreateChatResponse,
      { data: { businessId: number; accountId: number } }
    >({
      query: ({ data }) => ({
        url: `${BASE_MESSAGES_URL}/user/createChat`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllChatsOfUserQuery,
  useGetAllChatsOfBusinessQuery,
  useGetAllMessagesOfUserQuery,
  useGetAllMessagesOfBusinessQuery,
  useCreateNewChatMutation,
} = messagesApi;
