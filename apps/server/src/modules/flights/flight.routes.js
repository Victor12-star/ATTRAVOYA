/**
 * ==============================================================================
 * ATTRAVOYA SERVER FLIGHTS - ROUTER
 * ==============================================================================
 * Maps GET /api/flights/search requests.
 */

import { Router } from "express";
import { searchFlights } from "./flight.controller.js";

export const flightRoutes = Router();

// GET /api/flights/search
flightRoutes.get("/search", searchFlights);

export default flightRoutes;