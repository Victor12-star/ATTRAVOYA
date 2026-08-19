/**
 * ==============================================================================
 * ATTRAVOYA SERVER AUTH - ROUTER
 * ==============================================================================
 * Exposes the Express POST endpoints for registering and logging into sessions.
 * Integrates our strict validate() middleware with Zod to block invalid data.
 */

import { Router } from "express";
import { register, login, logout } from "./auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { RegisterSchema, LoginSchema } from "./auth.schema.js";

export const authRoutes = Router();

// 1. POST /api/auth/register (Trims and validates fields against RegisterSchema before calling register)
authRoutes.post("/register", validate(RegisterSchema), register);

// 2. POST /api/auth/login (Validates against LoginSchema)
authRoutes.post("/login", validate(LoginSchema), login);

// 3. POST /api/auth/logout (Clears session)
authRoutes.post("/logout", logout);

export default authRoutes;