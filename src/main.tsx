import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./provider/ThemeProvider.tsx";

// BrowserRouterを追加
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
