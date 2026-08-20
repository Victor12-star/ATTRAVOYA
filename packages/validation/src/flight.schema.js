/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - FLIGHT SEARCH
 * ==============================================================================
 * Validates flight criteria (airport codes, calendar dates, passenger counts).
 */

import { z } from "zod";

export const FlightSearchSchema = z.object({
  originCode: z
    .string({ required_error: "Origin airport code is required." })
    .length(3, { message: "Origin must be a 3-letter airport code (e.g. JFK)." })
    .toUpperCase(),
    
  destinationCode: z
    .string({ required_error: "Destination airport code is required." })
    .length(3, { message: "Destination must be a 3-letter airport code (e.g. CDG)." })
    .toUpperCase(),
    
  departureDate: z
    .string({ required_error: "Departure date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Departure date must be YYYY-MM-DD." }),
    
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Return date must be YYYY-MM-DD." })
    .optional(),
    
  adults: z
    .number()
    .int()
    .min(1, { message: "At least 1 adult is required to make a booking." })
    .default(1),
    
  children: z
    .number()
    .int()
    .nonnegative()
    .default(0),
    
  infants: z
    .number()
    .int()
    .nonnegative()
    .default(0),
    
  cabinClass: z
    .enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"])
    .default("ECONOMY"),
});
