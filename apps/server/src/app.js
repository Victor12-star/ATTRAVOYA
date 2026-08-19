/**
 * ==============================================================================
 * ATTRAVOYA SERVER - APP CORE
 * ==============================================================================
 * This file configures the Express application. It integrates all security
 * middlewares (Helmet, CORS, Rate Limiters, Cookie Parser, custom request-id,
 * page-not-found filters, and global error handlers).
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { corsConfig } from "./config/cors.js";
import { logger } from "./config/logger.js";

// Import core route mapper
import { apiRouter } from "./routes/index.js";

// Import customized middlewares
import { errorHandler } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";
import { requestId } from "./middleware/request-id.js";
import { rateLimiter } from "./middleware/rate-limit.js";
import { securityHeaders } from "./middleware/security-headers.js";

const app = express();

logger.info("🔧 Injecting global security and parser middlewares...");

// SECTION 1: SECURITY SHIELDS
app.use(requestId);              // Appends a unique ID to every request for trace audit loops
app.use(helmet());               // Sets critical secure HTTP headers
app.use(securityHeaders);        // Custom security headers (Content Security Policy)
app.use(cors(corsConfig));       // Cross-Origin rules
app.use(rateLimiter);            // Anti-DDoS rate limiter

// SECTION 2: DATA PARSERS
app.use(express.json());         // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());         // Parses incoming HttpOnly cookies

// SECTION 3: API ROUTING MAP
app.use("/api", apiRouter);      // Maps all API modules under the prefix "/api"

// SECTION 4: ERROR & FALLBACK HANDLERS
app.use(notFound);               // Fallback router for 404 Page-Not-Found pages
app.use(errorHandler);           // Global error interceptor returning safe structured JSONs

export default app;
export { app };