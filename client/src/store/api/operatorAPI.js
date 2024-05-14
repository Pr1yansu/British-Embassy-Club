import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const operatorProfileApi = createApi({
  reducerPath: "operatorProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/operator/profile",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getOperatorProfile: builder.query({
      query: () => "/",
    }),
  }),
});


export const { useGetOperatorProfileQuery } = operatorProfileApi;

