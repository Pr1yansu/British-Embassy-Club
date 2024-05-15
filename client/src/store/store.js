import { configureStore } from "@reduxjs/toolkit";
import { clubProfileApi } from "./api/clubAPI";
import { operatorProfileApi } from "./api/operatorAPI";

const store = configureStore({
  reducer: {
    [clubProfileApi.reducerPath]: clubProfileApi.reducer,
    [operatorProfileApi.reducerPath]: operatorProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clubProfileApi.middleware)
      .concat(operatorProfileApi.middleware),
});

export default store;
