import { configureStore } from "@reduxjs/toolkit";

import { allApi } from "../../entities/allApi.jsx";

export const store = configureStore({
  reducer: {
    [allApi.reducerPath]: allApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allApi.middleware),
});
