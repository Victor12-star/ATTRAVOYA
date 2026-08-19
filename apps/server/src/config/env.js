/**
 * ==============================================================================
 * ATTRAVOYA SERVER - ENVIRONMENT CONFIG
 * ==============================================================================
 * This file reads environment variables from '.env' and validates that all
 * required parameters are present. If a variable is missing, the server crashes
 * immediately with an explanatory error, preventing silent failures.
 */

import dotenv from "dotenv";

// Load values from .env
dotenv.config();

const requiredEnv = ["JWT_SECRET"];

// Run validation checks
for (const envVar of requiredEnv) {
    if (!process.env[envVar]) {
    throw new Error(`❌ CRITICAL CONFIGURATION ERROR: Environment variable '${envVar}' is missing in your .env file!`);
    }
}

export const env = {
    port: parseInt(process.env.PORT || "3000", 10),
    nodeEnv: process.env.NODE_ENV || "development",
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    redisHost: process.env.REDIS_HOST || "localhost",
    redisPort: parseInt(process.env.REDIS_PORT || "6379", 10),
  useMockDb: process.env.USE_MOCK_DB === "true" // 'true' triggers our fallback memory seeder
};