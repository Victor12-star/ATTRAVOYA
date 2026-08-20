/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - TRIP ITINERARY
 * ==============================================================================
 * Validates travel planner calendars, budgets, and scheduling inputs.
 */

import { z } from "zod";

export const TripCreateSchema = z.object({
  title: z
    .string({ required_error: "Trip title is required." })
    .min(1, { message: "Trip title cannot be empty." })
    .trim(),
    
  startDate: z
    .string({ required_error: "Start date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be YYYY-MM-DD." }),
    
  endDate: z
    .string({ required_error: "End date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be YYYY-MM-DD." }),
    
  currency: z.string().default("USD"),
  notes: z.string().optional().nullable(),
  isShared: z.boolean().default(false),
});

export const TripActivitySchema = z.object({
  date: z
    .string({ required_error: "Date is required." })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be YYYY-MM-DD." }),
    
  timeSlot: z.string().optional().nullable(),
  title: z
    .string({ required_error: "Activity title is required." })
    .min(1, { message: "Activity title cannot be empty." }),
    
  description: z.string().optional().nullable(),
  
  cost: z
    .number()
    .nonnegative({ message: "Cost cannot be a negative amount." })
    .default(0),
    
  category: z.enum(["FLIGHT", "HOTEL", "ATTRACTION", "MEAL", "TAXI", "OTHER"]),
});
