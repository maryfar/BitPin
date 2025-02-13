// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";  // Import the theme reducer

export const store = configureStore({
  reducer: {
    theme: themeReducer,  // Add the theme reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;  // Type for the root state
export type AppDispatch = typeof store.dispatch;  // Type for dispatch
