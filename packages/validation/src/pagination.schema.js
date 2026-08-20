/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - PAGINATION
 * ==============================================================================
 * Validates request offsets, page lists, and limits.
 */

import { z } from "zod";

export const PaginationQuerySchema = z.object({
  page: z
    .number()
    .int()
    .positive({ message: "Page number must be positive." })
    .default(1),
    
  limit: z
    .number()
    .int()
    .min(1, { message: "Limit must be at least 1." })
    .max(100, { message: "Limit cannot exceed 100 per page." })
    .default(10),
});
