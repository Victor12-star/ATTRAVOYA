/**
 * ==============================================================================
 * ATTRAVOYA SERVER - BOOTSTRAPPER
 * ==============================================================================
 * Launches the HTTP server and binds to the designated port (default 3000).
 * Registers process listener hooks to shutdown gracefully in case of crashes.
 */

import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

const server = app.listen(env.port, "0.0.0.0", () => {
  logger.info(`=============================================================`);
  logger.info(`🚀 AttraVoya secure Express server is running on port: ${env.port}`);
  logger.info(`⚙️  Active Environment Mode: [${env.nodeEnv}]`);
  logger.info(`🔒 Security Active: Helmet, DDoS Rate Limits, CORS, CSP`);
  logger.info(`=============================================================`);
});

// SECTION 1: GRACEFUL SHUTDOWN HANDLERS
// Closes database pools and finishes active requests before terminating processes
const handleGracefulShutdown = (signal) => {
  logger.warn(`Received signal '${signal}'. Initiating graceful server termination...`);
  
  server.close(() => {
    logger.info("HTTP server closed successfully. Process terminated.");
    process.exit(0);
  });
  
  // Force crash after 10 seconds if closing hangs
  setTimeout(() => {
    logger.error("Forced termination. Graceful shutdown timeout expired.");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => handleGracefulShutdown("SIGTERM"));
process.on("SIGINT", () => handleGracefulShutdown("SIGINT"));

// SECTION 2: CRASH RECOVERY LOGGERS
process.on("unhandledRejection", (reason) => {
  logger.error("🚨 UNHANDLED PROMISE REJECTION DETECTED:", reason.stack || reason);
});

process.on("uncaughtException", (error) => {
  logger.error("🚨 UNCAUGHT EXCEPTION DETECTED:", error.stack || error);
  // Force exit to let process orchestrators (like pm2 / kubernetes) restart fresh instances
  process.exit(1);
});