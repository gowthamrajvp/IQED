import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 
export const iqScoresApi = createApi({
  reducerPath: 'iqScoresApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://iqedbackend.vercel.app/iq-scores' }),
  endpoints: (builder) => ({
    getScores: builder.query({
      query: () => '/get-scores',
    }),
    addScore: builder.mutation({
      query: (newScore) => ({
        url: '/add-score',
        method: 'POST',
        body: newScore,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});
 
export const { useGetScoresQuery, useAddScoreMutation } = iqScoresApi;