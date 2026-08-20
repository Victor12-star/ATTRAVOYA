/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - STAY SEARCH
 * ==============================================================================
 * Validates check-in dates and hotel guests volumes.
 */

import { z } from "zod";

export const StaySearchSchema = z.object({
  destinationSlug: z
    .string({ required_error: "Destination name is required." })
    .min(1, { message: "Destination name cannot be empty." }),
    
  checkInDate: z
    .string({ required_error: "Check-in date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Check-in date must be YYYY-MM-DD." }),
    
  checkOutDate: z
    .string({ required_error: "Check-out date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Check-out date must be YYYY-MM-DD." }),
    
  guestsCount: z
    .number()
    .int()
    .min(1, { message: "At least 1 guest is required." })
    .default(1),
});
