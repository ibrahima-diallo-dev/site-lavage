import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
);
