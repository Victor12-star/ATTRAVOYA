/**
 * ==============================================================================
 * ATTRAVOYA SERVER - REDIS CACHE CONFIG
 * ==============================================================================
 * Configures Redis details for rate limiting, sessions, and BullMQ queues.
 */

import { env } from "./env.js";

export const redisConfig = {
  host: env.redisHost,
  port: env.redisPort,
  maxRetriesPerRequest: null, // Critical requirement for BullMQ workers
  enableReadyCheck: true
};