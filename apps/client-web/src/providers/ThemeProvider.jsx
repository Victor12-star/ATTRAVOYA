/**
 * ==============================================================================
 * ATTRAVOYA WEB PROVIDERS - ACCESSIBLE LIGHT & DARK MODE THEME
 * ==============================================================================
 * Connects a React Context Provider to toggle Light and Dark modes.
 * Writes a "dark" tag directly to the root HTML document element, enabling
 * Tailwind's dark: class extensions automatically.
 */

"use client";

import React, { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Save traveler preference inside local storage (defaults to light mode)
  const [theme, setTheme] = useLocalStorage("attravoya-theme", "light");

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Toggle class based on state changes
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};