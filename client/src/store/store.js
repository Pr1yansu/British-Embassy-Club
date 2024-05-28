import { configureStore } from "@reduxjs/toolkit";
import { clubProfileApi, clubTemporaryLogin } from "./api/clubAPI";
import {
  operatorForgetPasswordApi,
  operatorProfileApi,
  operatorImageApi,
  operatorUpdateProfileApi,
  operatorChangePasswordApi,
  operatorLogoutApi,
} from "./api/operatorAPI";
import { changeAdminOperatorPasswordApi,allProfileApi } from "./api/clubAPI";
import {
  addMemberApi,
  addMemberImageApi,
  getAllMembersApi,
  getMemberByIdApi,
  updateMemberApi,
  deleteMemberApi,
} from "./api/memberAPI";

const store = configureStore({
  reducer: {
    [clubProfileApi.reducerPath]: clubProfileApi.reducer,
    [clubTemporaryLogin.reducerPath]: clubTemporaryLogin.reducer,
    [operatorProfileApi.reducerPath]: operatorProfileApi.reducer,
    [allProfileApi.reducerPath]: allProfileApi.reducer,
    [operatorForgetPasswordApi.reducerPath]: operatorForgetPasswordApi.reducer,
    [operatorUpdateProfileApi.reducerPath]: operatorUpdateProfileApi.reducer,
    [operatorImageApi.reducerPath]: operatorImageApi.reducer,
    [operatorChangePasswordApi.reducerPath]: operatorChangePasswordApi.reducer,
    [operatorLogoutApi.reducerPath]: operatorLogoutApi.reducer,
    [addMemberApi.reducerPath]: addMemberApi.reducer,
    [addMemberImageApi.reducerPath]: addMemberImageApi.reducer,
    [getAllMembersApi.reducerPath]: getAllMembersApi.reducer,
    [getMemberByIdApi.reducerPath]: getMemberByIdApi.reducer,
    [updateMemberApi.reducerPath]: updateMemberApi.reducer,
    [deleteMemberApi.reducerPath]: deleteMemberApi.reducer,
    [changeAdminOperatorPasswordApi.reducerPath]: changeAdminOperatorPasswordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clubProfileApi.middleware)
      .concat(clubTemporaryLogin.middleware)
      .concat(operatorProfileApi.middleware)
      .concat(allProfileApi.middleware)
      .concat(operatorForgetPasswordApi.middleware)
      .concat(operatorImageApi.middleware)
      .concat(operatorUpdateProfileApi.middleware)
      .concat(operatorChangePasswordApi.middleware)
      .concat(operatorLogoutApi.middleware)
      .concat(addMemberApi.middleware)
      .concat(addMemberImageApi.middleware)
      .concat(getAllMembersApi.middleware)
      .concat(getMemberByIdApi.middleware)
      .concat(updateMemberApi.middleware)
      .concat(deleteMemberApi.middleware)
      .concat(changeAdminOperatorPasswordApi.middleware),
});

export default store;
