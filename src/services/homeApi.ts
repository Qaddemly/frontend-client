import { IGetStats } from "../interfaces/Common.interfaces";
import { apiSlice } from "./apiSlice";

const BASE_JOB_URL = "/stats";
const homeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNumberOfActiveJobs: builder.query<IGetStats, void>({
      query: () => ({
        url: `${BASE_JOB_URL}/getNumberOfActiveJobs`,
        method: "GET",
      }),
    }),
    getNumberOfNewPostedJobs: builder.query<IGetStats, void>({
      query: () => ({
        url: `${BASE_JOB_URL}/getNumberOfNewPostedJobs`,
        method: "GET",
      }),
    }),
    getNumberOfUsers: builder.query<IGetStats, void>({
      query: () => ({
        url: `${BASE_JOB_URL}/getNumberOfUsers`,
        method: "GET",
      }),
    }),
    getNumberOfBusinesses: builder.query<IGetStats, void>({
      query: () => ({
        url: `${BASE_JOB_URL}/getNumberOfBusinesses`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetNumberOfActiveJobsQuery,
  useGetNumberOfUsersQuery,
  useGetNumberOfNewPostedJobsQuery,
  useGetNumberOfBusinessesQuery,
} = homeApi;
