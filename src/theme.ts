// src/theme.ts

import { createTheme, ThemeOptions } from "@mui/material/styles";

const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,  
      sm: 600, 
      md: 960, 
      lg: 1280, 
      xl: 1920, 
    },
  },
  direction: "rtl",
};

const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#424242",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  direction: "rtl",
};

export const getTheme = (mode: "light" | "dark") => {
  return createTheme( mode === "dark" ? darkTheme : lightTheme);
};
