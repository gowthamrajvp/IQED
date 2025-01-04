import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const IQQuizApi = createApi({
  reducerPath: "IQQuizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/IQ",
    // baseUrl: "https://iqed-backend1-five.vercel.app/IQ",
    credentials: "include",
  }
),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createQuizSession: builder.mutation({
      query: () => ({
        url: "/createSession",
        method: "POST",
        body: { questionCount: 35 },
      }),
    }),
    getQuizSession: builder.mutation({
      query: () => ({
        url: "/getSession",
        method: "POST",
        body: { 
          sessionId:sessionStorage.getItem("IQSessionID"),
        },
      }),
    }),
    updateQuizSession: builder.mutation({
      query: ({ answeredQuestions, timeTaken }) => ({
        url: `/updateAnswers`,
        method: "PUT",
        body: { answeredQuestions, timeTaken , sessionId:sessionStorage.getItem("IQSessionID")},
      }),
    }),
    uploadFile: builder.mutation({
      query: (data) => ({
        url: "/SendEmail",
        method: "POST",
        body: data,
      }),
    }),
    verifyUser: builder.mutation({
      query: (credentials) => ({
        url: '/IQUsersVerify',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateIQ: builder.mutation({
      query: ({ userId, iqId }) => ({
        url: `/update-iq`,
        method: 'POST',
        body: {userId, iqId },
      }),
    }),
  }),
});

export const {
  useCreateQuizSessionMutation,
  useGetQuizSessionMutation,
  useUpdateQuizSessionMutation,
  useUploadFileMutation,
  useVerifyUserMutation,
  useUpdateIQMutation,
} = IQQuizApi;
