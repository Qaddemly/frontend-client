import { apiSlice } from "./apiSlice";
import { IGetAllNotificationsResponse } from "../interfaces/Notifications.interfaces.ts";

const BASE_NOTIFICATION_URL = "/notification";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query<IGetAllNotificationsResponse, void>({
      query: () => ({
        url: `${BASE_NOTIFICATION_URL}/getAllUserNotifications`,
        method: "GET",
      }),
    }),
    makeNotificationsSeen: builder.mutation({
      query: () => ({
        url: `${BASE_NOTIFICATION_URL}/seenNotifications`,
        method: "GET",
      }),
    }),
    makeNotificationRead: builder.mutation<void, { notificationId: string }>({
      query: ({ notificationId }) => ({
        url: `${BASE_NOTIFICATION_URL}/read/${notificationId}`,
        method: "PUT",
      }),
    }),
    deleteNotification: builder.mutation<void, { notificationId: string }>({
      query: ({ notificationId }) => ({
        url: `${BASE_NOTIFICATION_URL}/${notificationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useMakeNotificationsSeenMutation,
  useMakeNotificationReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
