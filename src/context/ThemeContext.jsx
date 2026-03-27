import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  /**
   * Determine le theme initial :
   * 1. Valeur stockée en localStorage
   * 2. Préférence système (prefers-color-scheme)
   * 3. Sombre par défaut
   */
  const getInitialTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Applique l'attribut data-theme sur <html> et persiste en localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
