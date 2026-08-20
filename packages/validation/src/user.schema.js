/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - USER PREFERENCES
 * ==============================================================================
 * Validates updates made by the traveler to their profile or travel preferences.
 */

import { z } from "zod";

export const UserUpdateSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .optional(),
    
  homeCountry: z.string().optional().nullable(),
  homeCity: z.string().optional().nullable(),
  
  prefCurrency: z.string().length(3, { message: "Currency must be a 3-letter standard ISO code." }).optional(),
  prefLanguage: z.string().length(2, { message: "Language must be a 2-letter standard ISO code." }).optional(),
});
