import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "./features/accountsSlice";
import blastReducer from "./features/blastSlice";
import authReducer from "./features/authSlice";
import headerReducer from "./features/headerSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      accounts: accountsReducer,
      blast: blastReducer,
      auth: authReducer,
      header: headerReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
