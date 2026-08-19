/**
 * ==============================================================================
 * ATTRAVOYA WEB PROVIDERS - TRAVELER SESSION AUTHENTICATION
 * ==============================================================================
 * Central state coordinator managing traveler sessions. On app boot, it queries
 * the backend profile endpoint to restore any active session automatically.
 * Exposes login, logout, and register handlers to child components.
 */

"use client";

import React, { createContext, useState, useEffect } from "react";
import { apiClient } from "../lib/api-client.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Verify active session on startup
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await apiClient.get("/users/profile");
        if (response.success && response.user) {
          setUser(response.user); // Restore session
        }
      } catch (e) {
        // No active token exists (expected for guests), ignore warning
        setUser(null);
      } finally {
        rootLoadingGuard();
      }
    };

    const rootLoadingGuard = () => {
      setLoading(false); // Done checking session
    };

    initializeAuth();
  }, []);

  /**
   * Submits credentials, fetches JWT, and stores user details
   */
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      if (response.success && response.user) {
        setUser(response.user);
        return response;
      }
    } catch (error) {
      setUser(null);
      throw error; // Let login forms display validation errors
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submits sign-up credentials
   */
  const register = async (email, password, fullName, homeCountry, homeCity) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/register", {
        email,
        password,
        fullName,
        homeCountry,
        homeCity
      });
      return response;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clears session cookie and resets client user state
   */
  const logout = async () => {
    setLoading(true);
    try {
      await apiClient.post("/auth/logout", {});
    } catch (e) {
      console.warn("Logout request failed on server:", e);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};