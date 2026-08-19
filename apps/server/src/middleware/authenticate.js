/**
 * ==============================================================================
 * ATTRAVOYA MIDDLEWARE - SESSION AUTHENTICATION GUARD
 * ==============================================================================
 * This security middleware intercepts requests targeting protected traveler sections.
 * It checks for our secure HttpOnly session cookie ("access_token") or a standard
 * HTTP Authorization Bearer token header. If found and cryptographically valid,
 * it attaches the decrypted session payload directly onto "req.user" and allows the
 * request to continue. If missing or invalid, it throws a "401 Unauthorized" error.
 */

import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authenticate = (req, res, next) => {
  // 1. Attempt to extract the token from cookies or authorization headers
  let token = null;

  if (req.cookies && req.cookies.access_token) {
    token = req.cookies.access_token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. If no token is provided, block access immediately
  if (!token) {
    const error = new Error("Authentication token is missing. Please log in to your account.");
    error.statusCode = 401;
    return next(error);
  }

  try {
    // 3. Cryptographically verify and decode the token
    const decoded = jwt.verify(token, env.jwtSecret);
    
    // 4. Attach the safe traveler data to the request object so downstream controllers can use it
    req.user = decoded;
    
    next(); // Valid session! Let the traveler proceed
  } catch (err) {
    const error = new Error("Your login session has expired or is invalid. Please log in again.");
    error.statusCode = 401;
    return next(error);
  }
};

export default authenticate;