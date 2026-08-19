/**
 * ==============================================================================
 * ATTRAVOYA CUSTOM HOOKS - LOCAL STORAGE PERSISTENCE
 * ==============================================================================
 * A custom React hook that synchronizes a state variable with the browser's
 * LocalStorage. Helps us remember things like the user's recent searches,
 * theme settings, and traveler choices across browser refreshes!
 */

import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // 1. Initialize state. Try reading from LocalStorage first, fallback to initialValue if empty
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue; // Server-side rendering guard
    
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (e) {
      console.warn(`LocalStorage read failed for key '${key}':`, e);
      return initialValue;
    }
  });

  // 2. Set up listener to write updates to LocalStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`LocalStorage write failed for key '${key}':`, e);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;