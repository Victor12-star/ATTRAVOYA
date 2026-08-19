/**
 * ==============================================================================
 * ATTRAVOYA SERVER - CORS MIDDLEWARE CONFIG
 * ==============================================================================
 * Defines Cross-Origin Resource Sharing rules. Allows our Next.js frontend
 * and Expo mobile clients to securely request data while shielding our API from
 * malicious external sites.
 */

import { env } from "./env.js";

export const corsConfig = {
  // Allow credentials (enables httpOnly refresh cookies to pass securely)
    credentials: true,
    
  // Custom filter checking who is requesting our data
    origin: (origin, callback) => {
    // In local development, allow requests with no origin (like mobile simulator apps or curl)
    if (!origin || env.nodeEnv === "development") {
        return callback(null, true);
    }
    
    // In production, define an authorized origins white-list
    const allowedOrigins = [
        "https://attravoya.com",
        "https://www.attravoya.com"
    ];
    
    if (allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        callback(new Error("🚫 Security Alert: CORS policy blocked this unauthorized domain access!"));
    }
    }
};