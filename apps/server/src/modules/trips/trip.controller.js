/**
 * ==============================================================================
 * ATTRAVOYA SERVER TRIPS - CONTROLLER LAYER
 * ==============================================================================
 * Resolves Express requests for creating, viewing, and managing traveler
 * custom daily travel schedules and budgets.
 */

import { getUserTripsList, createUserTrip, addUserTripActivity, deleteUserTrip } from "./trip.service.js";
import { asyncHandler } from "../../lib/async-handler.js";

/**
 * GET /api/trips
 * Fetches all itineraries associated with the authenticated traveler
 */
export const getTrips = asyncHandler(async (req, res) => {
    const list = await getUserTripsList(req.user.id);
    
    res.status(200).json({
    success: true,
    count: list.length,
    trips: list
    });
});

/**
 * POST /api/trips
 * Creates a brand new travel calendar outline
 */
export const createTrip = asyncHandler(async (req, res) => {
    const trip = await createUserTrip(req.user.id, req.body);
    
    res.status(201).json({
    success: true,
    message: "New itinerary outline created successfully!",
    trip
    });
});

/**
 * POST /api/trips/:tripId/activity
 * Appends a daily scheduled event inside an active itinerary
 */
export const addActivity = asyncHandler(async (req, res) => {
    const { tripId } = req.params;
    const updatedTrip = await addUserTripActivity(tripId, req.body);
    
    res.status(201).json({
    success: true,
    message: "New activity appended successfully!",
    trip: updatedTrip
    });
});

/**
 * DELETE /api/trips/:tripId
 * Deletes a traveler's custom trip
 */
export const deleteTrip = asyncHandler(async (req, res) => {
    const { tripId } = req.params;
    const isDeleted = await deleteUserTrip(tripId, req.user.id);
    
    if (isDeleted) {
    res.status(200).json({
        success: true,
        message: "Itinerary deleted successfully!"
    });
    } else {
    res.status(404).json({
        success: false,
        message: "Itinerary record not found or unauthorized access."
    });
    }
});