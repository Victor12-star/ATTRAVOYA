/**
 * ==============================================================================
 * ATTRAVOYA SERVER STAYS - SERVICE LAYER
 * ==============================================================================
 * Connects our controllers to our active stay providers (mock engine).
 */

import { MockStayProvider } from "./providers/mock-stay-provider.js";
import { logger } from "../../config/logger.js";

const provider = new MockStayProvider();

export const searchStayOffers = async (searchParams) => {
    logger.info(`🔍 Fetching hotel offers for destination slug: ${searchParams.destinationSlug}`);
    
    try {
    return await provider.searchStays(searchParams);
    } catch (err) {
    logger.error("Stay provider search failed, returning blank:", err.message);
    return [];
    }
};