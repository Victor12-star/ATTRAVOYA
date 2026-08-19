/**
 * ==============================================================================
 * ATTRAVOYA SERVER - CENTRAL SYSTEM LOGGER
 * ==============================================================================
 * Standardized logger displaying beautifully formatted system logs.
 */

export const logger = {
    info: (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[INFO]  [${timestamp}] - ${message}`);
    },
    warn: (message) => {
    const timestamp = new Date().toISOString();
    console.warn(`⚠️ [WARN]  [${timestamp}] - ${message}`);
    },
    error: (message, trace = "") => {
    const timestamp = new Date().toISOString();
    console.error(`❌ [ERROR] [${timestamp}] - ${message}`);
    if (trace) console.error(trace);
    }
};