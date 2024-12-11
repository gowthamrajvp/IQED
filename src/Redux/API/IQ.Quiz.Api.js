import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customFetch = (input, init) => {
  return fetch(input, { ...init, mode: "no-cors" });
};


export const IQQuizApi = createApi({
  reducerPath: "IQQuizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://iqedbackend.vercel.app/IQ",
    prepareHeaders: headers,
    credentials: 'include',
    mode: 'cors',
    
  }),
  // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Credentials": true,
  // },
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
