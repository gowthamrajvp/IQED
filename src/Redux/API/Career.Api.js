import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CareerApi = createApi({
  reducerPath: "CareerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://iqedbackend.vercel.app/career" }), // Adjust your base URL
  endpoints: (builder) => ({
    getAllSection: builder.query({
      query: () => `/sections/getall`,
    }),
  }),
});

export const { useGetAllSectionQuery } = CareerApi;
