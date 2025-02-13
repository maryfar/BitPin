import React from "react";
import { AppBar, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "./providers/ThemeProvider";

const App: React.FC = () => {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <>
      <AppBar position="sticky">
        <div className="bg-[#02a67f] p-4 shadow-md">
          <IconButton onClick={toggleTheme} color="inherit">
            {themeMode === "dark" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </div>
      </AppBar>
    </>
  );
};

export default App;
