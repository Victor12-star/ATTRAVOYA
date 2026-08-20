/**
 * ==============================================================================
 * ATTRAVOYA SERVER TRIPS - ROUTER
 * ==============================================================================
 * Maps private endpoints to create trips, delete itineraries, and schedule events.
 * Fully secured by our session authenticate guard middleware.
 */

import { Router } from "express";
import { getTrips, createTrip, addActivity, deleteTrip } from "./trip.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { validate } from "../../middleware/validate.js";
import { TripCreateSchema, TripActivitySchema } from "./trip.schema.js";

export const tripRoutes = Router();

// Protect ALL routes below this point using our secure authentication guard middleware
tripRoutes.use(authenticate);

// 1. GET /api/trips (Lists traveler itineraries)
tripRoutes.get("/", getTrips);

// 2. POST /api/trips (Creates a new trip outline, validated by TripCreateSchema)
tripRoutes.post("/", validate(TripCreateSchema), createTrip);

// 3. POST /api/trips/:tripId/activity (Appends an activity event, validated by TripActivitySchema)
tripRoutes.post("/:tripId/activity", validate(TripActivitySchema), addActivity);

// 4. DELETE /api/trips/:tripId (Deletes an itinerary)
tripRoutes.delete("/:tripId", deleteTrip);

export default tripRoutes;