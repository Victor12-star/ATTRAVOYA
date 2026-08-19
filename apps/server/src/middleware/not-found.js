/**
 * ==============================================================================
 * ATTRAVOYA MIDDLEWARE - 404 PAGE NOT FOUND
 * ==============================================================================
 * Triggers automatically when a client requests an API path that doesn't exist
 * on the server, returning a structured 404 error instead of standard HTML pages.
 */

export const notFound = (req, res, next) => {
  const error = new Error(`🔍 Path '${req.originalUrl}' does not exist on this server.`);
  error.statusCode = 404;
  next(error); // Passes the error down to the global error-handler middleware
};