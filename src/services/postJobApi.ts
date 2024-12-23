import { IPostData } from "../interfaces/Post.interfaces";
import { apiSlice } from "./apiSlice";
export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    post: builder.mutation<IPostResponse, IPostData>({
      query: (data) => ({
        url: "/job/postJob",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostMutation } = postApi;
