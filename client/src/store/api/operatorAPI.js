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

export const operatorForgetPasswordApi = createApi({
         reducerPath: "operatorForgetPasswordApi",
         baseQuery: fetchBaseQuery({
           baseUrl: "/api/v1/operator",
           credentials: "include",
         }),
         endpoints: (builder) => ({
           sendResetLink: builder.mutation({
             query: (username) => ({
               url: "/forgot-password",
               method: "PUT",
               body: { username },
             }),
           }),
         }),
       });


export const { useGetOperatorProfileQuery } = operatorProfileApi;
export const { useSendResetLinkMutation } = operatorForgetPasswordApi;

