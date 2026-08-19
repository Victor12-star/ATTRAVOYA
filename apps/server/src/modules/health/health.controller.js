/**
 * ==============================================================================
 * ATTRAVOYA MODULES - HEALTH CHECK CONTROLLER
 * ==============================================================================
 * Processes heartbeat status checks, returning standard 200 OK along with
 * server uptime metrics to show that the system is fully healthy.
 */

import { asyncHandler } from "../../lib/async-handler.js";

export const getHealthStatus = asyncHandler(async (req, res) => {
    res.status(200).json({
    success: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(), // Displays server execution duration in seconds
    service: "attravoya-api-server"
    });
});