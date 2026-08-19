/**
 * ==============================================================================
 * ATTRAVOYA MIDDLEWARE - GLOBAL ERROR HANDLER
 * ==============================================================================
 * Intercepts any thrown error across our Express endpoints, filters out raw
 * server stack traces in production (for security), and returns standardized
 * JSON error packages.
 */

import { logger } from "../config/logger.js";
import { env } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "An unexpected system error occurred on the server.";
  
  // Log the detailed error internally on the server console for audit tracks
  logger.error(
    `[${req.method}] ${req.url} - Request-ID: ${req.id || "N/A"} - Status: ${statusCode} - Error: ${message}`,
    err.stack
  );

  // Return standard, consistent error response structure to web / mobile clients
  res.status(statusCode).json({
    success: false,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.url,
    requestId: req.id, // Helps developers track this error inside server log files
    message,
    // Only display detailed stack traces in local development
    stack: env.nodeEnv === "development" ? err.stack : undefined
  });
};