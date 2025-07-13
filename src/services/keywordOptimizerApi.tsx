import { apiSlice } from "./apiSlice.ts";
import { IOptimizedKeywordsResponse } from "../interfaces/KeywordOptimizer.interfaces.ts";

const BASE_AI_FEATURE_URL = "/AI-Feature";

export const keywordOptimizerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    keywordOptimization: builder.mutation<
      IOptimizedKeywordsResponse,
      { resumeId: number; jobDescription: string }
    >({
      query: ({ resumeId, jobDescription }) => ({
        url: `${BASE_AI_FEATURE_URL}/keywordOptimization`,
        method: "POST",
        body: { resumeId, jobDescription },
      }),
    }),
    keywordOptimizationWithPdf: builder.mutation<
      IOptimizedKeywordsResponse,
      { data: FormData }
    >({
      query: ({ data }) => ({
        url: `${BASE_AI_FEATURE_URL}/keywordOptimizationPdf`,
        method: "POST",
        body: { data },
      }),
    }),
  }),
});

export const {
  useKeywordOptimizationMutation,
  useKeywordOptimizationWithPdfMutation,
} = keywordOptimizerApi;
