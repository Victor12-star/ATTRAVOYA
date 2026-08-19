/**
 * ==============================================================================
 * ATTRAVOYA SERVER AUTH - CONTROLLER LAYER
 * ==============================================================================
 * Processes Express request payloads for traveler sign-ups and logins, and
 * writes encrypted JWT session cookies with secure anti-hijack flags (HttpOnly).
 */

import { registerUser, loginUser } from "./auth.service.js";
import { asyncHandler } from "../../lib/async-handler.js";
import { env } from "../../config/env.js";

/**
 * POST /api/auth/register
 * Creates a brand new traveler account
 */
export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  
  res.status(201).json({
    success: true,
    message: "Traveler account registered successfully! Please log in.",
    user: result
  });
});

/**
 * POST /api/auth/login
 * Validates credentials and sets HttpOnly cookie session
 */
export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  // Write JWT inside a secure HttpOnly cookie.
  // This shields the token from cross-site scripting (XSS) scripts.
  res.cookie("access_token", result.accessToken, {
    httpOnly: true, // Blocks JavaScript access
    secure: env.nodeEnv === "production", // Forces transmission over HTTPS only in production
    sameSite: "strict", // Blocks Cross-Site Request Forgery (CSRF)
    maxAge: 24 * 60 * 60 * 1000 // 24 hours lifespan
  });

  res.status(200).json({
    success: true,
    message: "Logged in successfully. Welcome back to AttraVoya!",
    accessToken: result.accessToken,
    user: result.user
  });
});

/**
 * POST /api/auth/logout
 * Clears the session cookie safely
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "strict"
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully. Have a safe journey!"
  });
});