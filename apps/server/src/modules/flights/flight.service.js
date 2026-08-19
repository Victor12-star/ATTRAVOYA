/**
 * ==============================================================================
 * ATTRAVOYA SERVER FLIGHTS - SERVICE LAYER
 * ==============================================================================
 * Connects our controllers to our active flight providers (mock engine).
 * Ranks flight results to highlight Cheapest, Fastest, and Best options.
 */

import { MockFlightProvider } from "./providers/mock-flight-provider.js";
import { logger } from "../../config/logger.js";

const provider = new MockFlightProvider();

/**
 * Searches flight offers and filters them according to passenger query preferences
 */
export const searchFlightOffers = async (searchParams) => {
    logger.info(`🔍 Fetching flight offers: ${searchParams.originCode} ➔ ${searchParams.destinationCode}`);
    
    try {
    const rawOffers = await provider.searchFlights(searchParams);
    
    // Sort and rank results dynamically
    const sortedByPrice = [...rawOffers].sort((a, b) => a.priceTotal - b.priceTotal);
    const sortedByDuration = [...rawOffers].sort((a, b) => {
        const getMin = (str) => {
        const [h, m] = str.replace("h", "").replace("m", "").split(" ");
        return parseInt(h) * 60 + parseInt(m);
        };
        return getMin(a.duration) - getMin(b.duration);
    });

    // Label Cheapest and Fastest flags programmatically
    const finalizedOffers = rawOffers.map((offer) => {
        const isCheapest = offer.id === sortedByPrice[0].id;
        const isFastest = offer.id === sortedByDuration[0].id;
        
        let classification = offer.classification;
        if (isCheapest) classification = "CHEAPEST";
        if (isFastest) classification = "FASTEST";

        return {
        ...offer,
        classification
        };
    });

    return finalizedOffers;
    } catch (err) {
    logger.error("Flight provider search failed, returning blank:", err.message);
    return [];
    }
};