/**
 * ==============================================================================
 * ATTRAVOYA SERVER - PRISMA INITIALIZER
 * ==============================================================================
 * Imports the database pool directly from our @attravoya/database library package
 * so that we share the identical database clients across all our server services.
 */

import { prisma } from "@attravoya/database";

export default prisma;
export { prisma };