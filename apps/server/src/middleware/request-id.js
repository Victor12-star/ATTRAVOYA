/**
 * ==============================================================================
 * ATTRAVOYA MIDDLEWARE - REQUEST IDENTIFIER
 * ==============================================================================
 * Appends a unique, cryptographic UUID string to every incoming request.
 * Helps developers tie multiple log statements together to debug complex
 * transactions.
 */

import { v4 as uuidv4 } from "uuid";

export const requestId = (req, res, next) => {
  // Read existing ID or generate a brand new cryptographically secure UUID
  const id = req.headers["x-request-id"] || uuidv4();
  
  // Bind ID to request context and outgoing response headers
  req.id = id;
  res.setHeader("x-request-id", id);
  
  next();
};