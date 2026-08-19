/**
 * ==============================================================================
 * ATTRAVOYA SERVER AUTH - VALIDATION SCHEMAS
 * ==============================================================================
 * Imports and exports our secure login and registration Zod schemas directly from
 * our shared validation package. This maintains a single source of truth across
 * our entire platform!
 */

import { RegisterSchema, LoginSchema } from "@attravoya/validation";

export { RegisterSchema, LoginSchema };