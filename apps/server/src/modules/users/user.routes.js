/**
 * ==============================================================================
 * ATTRAVOYA SERVER USERS - ROUTER
 * ==============================================================================
 * Exposes endpoints to check profiles and update travel choices.
 * Fully secured by our authenticate session guard.
 */

import { Router } from "express";
import { getProfile, updateProfile } from "./user.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validate } from "../../middleware/validate.js";
import { UserUpdateSchema } from "./user.schema.js";

export const userRoutes = Router();

// Protect ALL routes below this point using our secure authentication guard middleware
userRoutes.use(authenticate);

// 1. GET /api/users/profile
userRoutes.get("/profile", getProfile);

// 2. PUT /api/users/update (Validates fields against UserUpdateSchema before updating settings)
userRoutes.put("/update", validate(UserUpdateSchema), updateProfile);

export default userRoutes;