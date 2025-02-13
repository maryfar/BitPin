import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./style.scss";
// import { Provider } from "react-redux";
// import { store } from "./store";
import RouterProvider from "./providers/RouterProvider";
import ReactQueryProvider from "./providers/ReactQuertProvider";
import ThemeProvider from "./providers/ThemeProvider";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <RouterProvider>
        <ThemeProvider>
          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </RouterProvider>
    </ReactQueryProvider>
  </React.StrictMode>
);
