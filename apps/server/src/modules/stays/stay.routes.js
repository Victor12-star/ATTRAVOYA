/**
 * ==============================================================================
 * ATTRAVOYA SERVER STAYS - ROUTER
 * ==============================================================================
 * Maps GET /api/stays/search requests.
 */

import { Router } from "express";
import { searchStays } from "./stay.controller.js";

export const stayRoutes = Router();

// GET /api/stays/search
stayRoutes.get("/search", searchStays);

export default stayRoutes;