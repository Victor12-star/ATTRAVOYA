/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - DESTINATION SEARCH
 * ==============================================================================
 * Validates travel queries and search terms before submitting requests.
 */

import { z } from "zod";

export const DestinationSearchSchema = z.object({
  query: z
    .string()
    .trim()
    .max(100, { message: "Search term is too long (maximum 100 characters allowed)." })
    .default(""),
});
