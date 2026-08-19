/**
 * ==============================================================================
 * ATTRAVOYA CUSTOM HOOKS - AUTH CONNECTOR
 * ==============================================================================
 * Connects our pages directly to the AuthContext, allowing any page to easily
 * trigger logins, logouts, or read the traveler's username.
 */

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be enclosed within an AuthProvider wrapper!");
  }
  return context;
};

export default useAuth;