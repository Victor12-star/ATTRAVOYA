/**
 * ==============================================================================
 * ATTRAVOYA SERVER DESTINATIONS - CONTROLLER LAYER
 * ==============================================================================
 * Processes Express request payloads for loading catalogs, completing searches,
 * and pulling detailed geographic travel intelligence guides.
 */

import { getCatalogList, searchCatalog, getDetailedGuideBySlug } from "./destination.service.js";
import { mapDestinationResponse } from "./destination.mapper.js";
import { asyncHandler } from "../../lib/async-handler.js";

/**
 * GET /api/destinations
 * Returns a catalog summary of all indexed travel hubs
 */
export const getCatalog = asyncHandler(async (req, res) => {
  const list = await getCatalogList();
  
  res.status(200).json({
    success: true,
    count: list.length,
    destinations: list
  });
});

/**
 * GET /api/destinations/search?query=xxx
 * Resolves autocomplete and spell-check lookups
 */
export const search = asyncHandler(async (req, res) => {
  const query = req.query.query || "";
  const results = await searchCatalog(query);
  
  res.status(200).json({
    success: true,
    query,
    count: results.length,
    results
  });
});

/**
 * GET /api/destinations/:slug
 * Resolves comprehensive nested guide profiles
 */
export const getGuide = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const rawGuide = await getDetailedGuideBySlug(slug);
  
  // Format guide neatly via Mapper
  const formattedGuide = mapDestinationResponse(rawGuide);

  res.status(200).json({
    success: true,
    destination: formattedGuide
  });
});