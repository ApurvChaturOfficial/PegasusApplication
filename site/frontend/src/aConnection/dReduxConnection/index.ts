import { configureStore } from "@reduxjs/toolkit";

import globalSlice from "@/bLove/bRedux/aGlobalSlice";
import apiConnection from "../cAPIConnection";


const reduxConnection = configureStore({
  reducer: {
    [globalSlice.name]: globalSlice.reducer,

    [apiConnection.reducerPath]: apiConnection.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiConnection.middleware)
})

export default reduxConnection;

export type RootState = ReturnType<typeof reduxConnection.getState>;
export type RootDispatch = typeof reduxConnection.dispatch;
