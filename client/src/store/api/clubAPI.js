import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const clubProfileApi = createApi({
  reducerPath: "clubProfileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/club/profile", credentials: "include",}),
  endpoints: (builder) => ({
    getClubProfile: builder.query({
      query: () => "/",
    }),
  }),
});

export const clubTemporaryLogin = createApi({
         reducerPath: "clubTemporaryLogin",
         baseQuery: fetchBaseQuery({
           baseUrl: "/api/v1/club",
           credentials: "include",
         }),
         endpoints: (builder) => ({
           temporaryLogin: builder.mutation({
             query: ({
               username,
               password
             }) => {
               return {
                 url: "/temporary-login",
                 method: "POST",
                 body: {
                   password,
                   username,
                 },
               };
             },
           }),
         }),
       });


export const { useGetClubProfileQuery } = clubProfileApi;
export const { useTemporaryLoginMutation } = clubTemporaryLogin;
