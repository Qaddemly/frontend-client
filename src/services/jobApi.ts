import { IapiFounded } from "../interfaces/Job.interfaces";
import { apiSlice } from "./apiSlice";
const BASE_JOB_URL = "/job";

export const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    jobWithFound: builder.query<IapiFounded, { id: number }>({
      query: ({ id }) => ({
        url: `${BASE_JOB_URL}/oneJob/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useJobWithFoundQuery } = jobApi;

// import { IPostData } from "../interfaces/Job.interfaces";
// import { apiSlice } from "./apiSlice";

// const BASE_JOB_URL = "job";
// export const postApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // void must be IPostResponse
//     post: builder.mutation<void, IPostData>({
//       query: (data) => ({
//         url: `${BASE_JOB_URL}/postJob`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { usePostMutation } = postApi;
