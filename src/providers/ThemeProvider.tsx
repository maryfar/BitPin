import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../theme";

interface ThemeContextProps {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderComponentProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderComponentProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    const storedThemeMode = localStorage.getItem("themeMode");
    return (storedThemeMode === "dark" ? "dark" : "light") as "light" | "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const theme = getTheme(themeMode);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
