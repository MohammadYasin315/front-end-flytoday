import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

console.log("🔄 Initializing Redux store...");

const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  console.log("🚀 Dispatching action:", action);
  const result = next(action);
  console.log("🗂 New state after dispatch:", storeAPI.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(loggerMiddleware),
});

console.log("✅ Redux store created");

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
