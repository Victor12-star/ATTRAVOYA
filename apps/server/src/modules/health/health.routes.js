/**
 * ==============================================================================
 * ATTRAVOYA MODULES - HEALTH CHECK ROUTER
 * ==============================================================================
 * Maps the router endpoint for server ping and heartbeat status checks.
 */

import { Router } from "express";
import { getHealthStatus } from "./health.controller.js";

export const healthRoutes = Router();

// GET /api/health
healthRoutes.get("/", getHealthStatus);

export default healthRoutes;