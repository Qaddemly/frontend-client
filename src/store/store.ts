import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import userReducer from "../components/auth/UserSlice";
import businessAccountReducer from "../components/business account/BusinessAccountSlice";
import notificationReducer from "../components/notifications/notificationSlice.ts";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
    businessAccount: businessAccountReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
