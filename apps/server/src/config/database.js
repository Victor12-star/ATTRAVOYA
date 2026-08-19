/**
 * ==============================================================================
 * ATTRAVOYA SERVER - DATABASE CONFIG
 * ==============================================================================
 * Connection configurations for database client.
 */

import { env } from "./env.js";

export const databaseConfig = {
    url: env.databaseUrl,
    useMock: env.useMockDb
};