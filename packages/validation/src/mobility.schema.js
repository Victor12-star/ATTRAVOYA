/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - MOBILITY (TAXIS & MAPS)
 * ==============================================================================
 * Validates travel route queries and point-to-point taxi estimation coordinates.
 */

import { z } from "zod";

export const TaxiEstimateSchema = z.object({
  destinationId: z
    .string({ required_error: "Destination ID is required." })
    .uuid({ message: "Invalid Destination ID format." }),
    
  distanceKm: z
    .number({ required_error: "Distance in kilometers is required." })
    .positive({ message: "Distance must be a positive number." }),
    
  isNightSurcharge: z.boolean().default(false),
  isWeekendSurcharge: z.boolean().default(false),
});
