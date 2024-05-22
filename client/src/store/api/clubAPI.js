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


export const { useGetClubProfileQuery } = clubProfileApi;
