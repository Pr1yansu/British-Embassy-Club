import { configureStore } from "@reduxjs/toolkit";
import { clubProfileApi } from "./api/clubAPI";
import {
  operatorForgetPasswordApi,
  operatorProfileApi,
  operatorImageApi,
  operatorUpdateProfileApi,
  operatorChangePasswordApi,
  operatorLogoutApi,
} from "./api/operatorAPI";
import { addMemberApi } from "./api/memberAPI";
import {
  addMemberImageApi,
  getAllMembersApi,
  getMemberByIdApi,
} from "./api/memberAPI";

const store = configureStore({
  reducer: {
    [clubProfileApi.reducerPath]: clubProfileApi.reducer,
    [operatorProfileApi.reducerPath]: operatorProfileApi.reducer,
    [operatorForgetPasswordApi.reducerPath]: operatorForgetPasswordApi.reducer,
    [operatorUpdateProfileApi.reducerPath]: operatorUpdateProfileApi.reducer,
    [operatorImageApi.reducerPath]: operatorImageApi.reducer,
    [operatorChangePasswordApi.reducerPath]: operatorChangePasswordApi.reducer,
    [operatorLogoutApi.reducerPath]: operatorLogoutApi.reducer,
    [addMemberApi.reducerPath]: addMemberApi.reducer,
    [addMemberImageApi.reducerPath]: addMemberImageApi.reducer,
    [getAllMembersApi.reducerPath]: getAllMembersApi.reducer,
    [getMemberByIdApi.reducerPath]: getMemberByIdApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clubProfileApi.middleware)
      .concat(operatorProfileApi.middleware)
      .concat(operatorForgetPasswordApi.middleware)
      .concat(operatorImageApi.middleware)
      .concat(operatorUpdateProfileApi.middleware)
      .concat(operatorChangePasswordApi.middleware)
      .concat(operatorLogoutApi.middleware)
      .concat(addMemberApi.middleware)
      .concat(addMemberImageApi.middleware)
      .concat(getAllMembersApi.middleware)
      .concat(getMemberByIdApi.middleware),
});

export default store;
