import { configureStore } from "@reduxjs/toolkit";
import {
  operatorForgetPasswordApi,
  operatorProfileApi,
  operatorImageApi,
  operatorUpdateProfileApi,
  operatorChangePasswordApi,
  operatorLogoutApi,
} from "./api/operatorAPI";
import { changeAdminOperatorPasswordApi,allProfileApi,clubProfileApi, clubTemporaryLogin, changeAdminPasswordApi } from "./api/clubAPI";
import {
  addMemberApi,
  addMemberImageApi,
  getAllMembersApi,
  getMemberByIdApi,
  updateMemberApi,
  deleteMemberApi,
} from "./api/memberAPI";

import {getWalletApi} from "./api/walletAPI";

const store = configureStore({
  reducer: {
    [clubProfileApi.reducerPath]: clubProfileApi.reducer,
    [clubTemporaryLogin.reducerPath]: clubTemporaryLogin.reducer,
    [changeAdminPasswordApi.reducerPath]: changeAdminPasswordApi.reducer,
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
    [getWalletApi.reducerPath]: getWalletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clubProfileApi.middleware)
      .concat(clubTemporaryLogin.middleware)
      .concat(changeAdminPasswordApi.middleware)
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
      .concat(changeAdminOperatorPasswordApi.middleware)
      .concat(getWalletApi.middleware),
});

export default store;
