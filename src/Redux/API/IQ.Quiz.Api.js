import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const IQQuizApi = createApi({
  reducerPath: "IQQuizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://iqedbackend.vercel.app/IQ",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createQuizSession: builder.mutation({
      query: () => ({
        url: "/createSession",
        method: "POST",
        body: { questionCount: 35 },
      }),
    }),
    getQuizSession: builder.query({
      query: () => `/getSession`,
    }),
    updateQuizSession: builder.mutation({
      query: ({ answeredQuestions, timeTaken }) => ({
        url: `/updateAnswers`,
        method: "PUT",
        body: { answeredQuestions, timeTaken },
      }),
    }),
    uploadFile: builder.mutation({
      query: (data) => {
        return {
          url: "/SendEmail",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionQuery,
  useUpdateQuizSessionMutation,
  useUploadFileMutation,
} = IQQuizApi;
