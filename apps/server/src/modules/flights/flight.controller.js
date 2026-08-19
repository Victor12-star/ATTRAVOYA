/**
 * ==============================================================================
 * ATTRAVOYA SERVER FLIGHTS - CONTROLLER LAYER
 * ==============================================================================
 * Resolves Express request bodies and queries for flight comparisons.
 */

import { searchFlightOffers } from "./flight.service.js";
import { asyncHandler } from "../../lib/async-handler.js";

/**
 * GET /api/flights/search
 * Initiates the search parameters lookup
 */
export const searchFlights = asyncHandler(async (req, res) => {
    const params = {
    originCode: req.query.originCode,
    destinationCode: req.query.destinationCode,
    departureDate: req.query.departureDate,
    returnDate: req.query.returnDate,
    adults: parseInt(req.query.adults || "1", 10),
    children: parseInt(req.query.children || "0", 10),
    infants: parseInt(req.query.infants || "0", 10),
    cabinClass: req.query.cabinClass || "ECONOMY",
    };

    const offers = await searchFlightOffers(params);

    res.status(200).json({
    success: true,
    count: offers.length,
    flights: offers
    });
});