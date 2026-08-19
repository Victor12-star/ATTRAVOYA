/**
 * ==============================================================================
 * ATTRAVOYA SERVER UTILS - ASYNC HANDLER WRAPPER
 * ==============================================================================
 * In Express, uncaught errors inside asynchronous controllers can freeze the
 * process. This utility acts as a wrapper that automatically catches any rejected
 * promises and forwards them straight to our global error-handler middleware,
 * removing the need for repeating try/catch blocks!
 */

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;