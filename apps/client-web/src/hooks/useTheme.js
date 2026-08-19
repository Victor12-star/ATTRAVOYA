/**
 * ==============================================================================
 * ATTRAVOYA CUSTOM HOOKS - THEME CONNECTOR
 * ==============================================================================
 * Connects our pages directly to the ThemeContext, allowing any page to easily
 * trigger dark/light theme flips.
 */

import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider.jsx";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be enclosed within a ThemeProvider wrapper!");
  }
  return context;
};

export default useTheme;