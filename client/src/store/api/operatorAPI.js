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

export const operatorAllProfileApi = createApi({
  reducerPath: "operatorAllProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/operator/profile-all",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllOperatorProfile: builder.query({
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

export const operatorImageApi = createApi({
  reducerPath: "operatorImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/operator",
    credentials: "include",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  endpoints: (builder) => ({
    addOperatorImage: builder.mutation({
      query: (formData) => ({
        url: "/add-operator-image",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const operatorUpdateProfileApi = createApi({
  reducerPath: "operatorUpdateProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/operator",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateOperatorProfile: builder.mutation({
      query: ({
        username,
        email,
        mobileNumber,
        address,
        idType,
        idNumber,
      }) => ({
        url: "/update",
        method: "PUT",
        body: { username, email, mobileNumber, address, idType, idNumber },
      }),
    }),
  }),
});

export const operatorChangePasswordApi = createApi({
  reducerPath: "operatorChangePasswordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/operator",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: "/change-password",
        method: "PATCH",
        body: { oldPassword, newPassword, confirmPassword },
      }),
    }),
  }),
});

export const operatorLogoutApi = createApi({
  reducerPath: "operatorLogoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

// export const operatorDeleteApi = createApi({
//   reducerPath: "operatorDeleteApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "/api/v1/operator",
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
//     deleteOperator: builder.mutation({
//       query: (id) => ({
//         url: `/${id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

export const { useGetOperatorProfileQuery } = operatorProfileApi;
export const { useGetAllOperatorProfileQuery } = operatorAllProfileApi;
export const { useSendResetLinkMutation } = operatorForgetPasswordApi;
export const { useAddOperatorImageMutation } = operatorImageApi;
export const { useUpdateOperatorProfileMutation } = operatorUpdateProfileApi;
export const { useChangePasswordMutation } = operatorChangePasswordApi;
export const { useLogoutMutation } = operatorLogoutApi;
