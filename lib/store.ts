import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "@/lib/userSlice";

export const store = () => {
  return configureStore({
    reducer: {
      user: UserReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
