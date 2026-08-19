/**
 * ==============================================================================
 * ATTRAVOYA API ROUTES - ROOT MASTER INDEX
 * ==============================================================================
 * Gathers individual feature route files and maps them under standard clean
 * paths (like /api/health, /api/auth, /api/destinations) so they are exposed
 * neatly from the server.
 */

import { Router } from "express";

// Import custom endpoint sub-routes
import { healthRoutes } from "../modules/health/health.routes.js";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { userRoutes } from "../modules/users/user.routes.js";
import { destinationRoutes } from "../modules/destinations/destination.routes.js";

export const apiRouter = Router();

// SECTION 1: SYSTEM ENDPOINTS
apiRouter.use("/health", healthRoutes);

// SECTION 2: ACCESS ENDPOINTS
apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", userRoutes);

// SECTION 3: GUIDE ENDPOINTS
apiRouter.use("/destinations", destinationRoutes);

export default apiRouter;