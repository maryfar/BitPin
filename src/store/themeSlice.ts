// src/store/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

// Define the types
interface ThemeState {
  mode: "light" | "dark";
}

// Define the initial state
const initialState: ThemeState = {
  mode: "light", // default theme
};

// Create the slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setLightMode: (state) => {
      state.mode = "light";
    },
    setDarkMode: (state) => {
      state.mode = "dark";
    },
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// Export the actions
export const { setLightMode, setDarkMode, toggleTheme } = themeSlice.actions;

// Export the reducer to include in the store
export default themeSlice.reducer;
