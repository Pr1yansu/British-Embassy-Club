import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getWalletApi = createApi({
    reducerPath: "getWalletAPI",
    baseQuery: fetchBaseQuery({
      baseUrl: "/api/v1/wallet",
      credentials: "include",
    }),
    endpoints: (builder) => ({
      getWallet: builder.query({
        query: (memberId) => `/get/${memberId}`,
      }),
    }),
  });

  export const { useGetWalletQuery } = getWalletApi;