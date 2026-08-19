/**
 * ==============================================================================
 * ATTRAVOYA SERVER STAYS - CONTROLLER LAYER
 * ==============================================================================
 * Resolves Express request bodies and queries for hotel comparisons.
 */

import { searchStayOffers } from "./stay.service.js";
import { asyncHandler } from "../../lib/async-handler.js";

/**
 * GET /api/stays/search
 * Initiates the search parameters lookup
 */
export const searchStays = asyncHandler(async (req, res) => {
    const params = {
    destinationSlug: req.query.destinationSlug,
    checkInDate: req.query.checkInDate,
    checkOutDate: req.query.checkOutDate,
    guestsCount: parseInt(req.query.guestsCount || "1", 10),
    };

    const offers = await searchStayOffers(params);

    res.status(200).json({
    success: true,
    count: offers.length,
    stays: offers
    });
});