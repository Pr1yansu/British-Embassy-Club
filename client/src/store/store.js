import { configureStore } from "@reduxjs/toolkit";
import { clubProfileApi } from "./api/clubAPI";
import { operatorForgetPasswordApi, operatorProfileApi } from "./api/operatorAPI";

const store = configureStore({
  reducer: {
    [clubProfileApi.reducerPath]: clubProfileApi.reducer,
    [operatorProfileApi.reducerPath]: operatorProfileApi.reducer,
    [operatorForgetPasswordApi.reducerPath]: operatorForgetPasswordApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clubProfileApi.middleware)
      .concat(operatorProfileApi.middleware)
      .concat(operatorForgetPasswordApi.middleware),
});

export default store;
