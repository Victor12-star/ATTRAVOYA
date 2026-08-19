/**
 * ==============================================================================
 * ATTRAVOYA MIDDLEWARE - DDoS RATE LIMITER
 * ==============================================================================
 * Limits requests from a single IP address to 100 requests per minute.
 * Protects our API from brute-force login attempts and DDoS scraping bots.
 */

import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 100, // Limit each IP to 100 requests per minute
  standardHeaders: true, // Return standard rate limit info in headers
    legacyHeaders: false,
    message: {
    success: false,
    statusCode: 429,
    message: "🚫 Too many requests from your IP. Please slow down and try again in 1 minute."
    }
});