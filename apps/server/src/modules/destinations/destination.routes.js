/**
 * ==============================================================================
 * ATTRAVOYA SERVER DESTINATIONS - ROUTER
 * ==============================================================================
 * Exposes the public endpoints for search autocompletes and deep guide profiles.
 * Public exploration does not require the session authenticate guard.
 */

import { Router } from "express";
import { getCatalog, search, getGuide } from "./destination.controller.js";

export const destinationRoutes = Router();

// 1. GET /api/destinations (Returns summary catalog of cities)
destinationRoutes.get("/", getCatalog);

// 2. GET /api/destinations/search?query=par (Resolves search suggestions)
destinationRoutes.get("/search", search);

// 3. GET /api/destinations/paris (Returns full travel portfolio guide)
destinationRoutes.get("/:slug", getGuide);

export default destinationRoutes;