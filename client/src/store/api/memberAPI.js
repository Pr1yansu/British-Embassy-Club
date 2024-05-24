import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addMemberApi = createApi({
  reducerPath: "addMemberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/member",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addMember: builder.mutation({
      query: ({
        name,
        email,
        mobileNumber,
        address,
        expiryDate,
        bloodGroup,
        organization,
        idType,
        idNumber,
      }) => ({
        url: "/add-member",
        method: "POST",
        body: {
          name,
          mobileNumber,
          address,
          expiryDate,
          bloodGroup,
          organization,
          idType,
          email,
          idNumber,
        },
      }),
    }),
  }),
});

export const addMemberImageApi = createApi({
  reducerPath: "addMemberImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/member",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addMemberImage: builder.mutation({
      query: (image) => ({
        url: `/add-member-image`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: { image },
      }),
    }),
  }),
});

export const deleteMemberApi = createApi({
  reducerPath: "deleteMemberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/member",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    deleteMember: builder.mutation({
      query: (memberId) => ({
        url: `/delete-member/${memberId}`,
        method: "DELETE",
        body: { memberId },
      }),
    }),
  }),
});

export const updateMemberApi = createApi({
         reducerPath: "updateMemberApi",
         baseQuery: fetchBaseQuery({
           baseUrl: "/api/v1/member",
           credentials: "include",
         }),
         endpoints: (builder) => ({
           updateMember: builder.mutation({
             query: ({
               memberId,
               mobileNumber,
               bloodGroup,
               organization,
               address,
               email,
               expiryDate,
               timeStamp,
               idNumber,
               idType,
               username,
             }) => {
               return {
                 url: `/update-member/${memberId}`,
                 method: "PUT",
                 body: {
                   memberId,
                   mobileNumber,
                   bloodGroup,
                   organization,
                   address,
                   email,
                   expiryDate,
                   timeStamp,
                   idNumber,
                   idType,
                   username,
                 },
               };
             },
           }),
         }),
});

export const getAllMembersApi = createApi({
  reducerPath: "getAllMembersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/member",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: ({page=1,limit=10,search=""}) => `/get-all-members?page=${page}&limit=${limit}&search=${search}`,
    }),
  }),
});

export const getMemberByIdApi = createApi({
  reducerPath: "getMemberByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/member",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMemberById: builder.query({
      query: (memberId) => `/get-member/${memberId}`,
    }),
  }),
});

export const { useAddMemberMutation } = addMemberApi;
export const { useDeleteMemberMutation } = deleteMemberApi;
export const { useUpdateMemberMutation } = updateMemberApi;
export const { useGetAllMembersQuery } = getAllMembersApi;
export const { useAddMemberImageMutation } = addMemberImageApi;
export const { useGetMemberByIdQuery } = getMemberByIdApi;
