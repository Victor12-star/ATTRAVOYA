/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - ATTRACTIONS
 * ==============================================================================
 * Validates search and filters for historical and non-historical attractions.
 */

import { z } from "zod";

export const AttractionQuerySchema = z.object({
  type: z.enum(["HISTORICAL", "NON_HISTORICAL"]).optional(),
  isChildrenFriendly: z.boolean().optional(),
  isAdultOnly: z.boolean().optional(),
});
