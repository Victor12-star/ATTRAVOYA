/**
 * ==============================================================================
 * ATTRAVOYA DATABASE - PRISMA CLIENT INITIALIZER
 * ==============================================================================
 * This file creates and exports a single, shared instance of the Prisma Client.
 * By reusing this single instance, we prevent our backend server from opening too
 * many simultaneous connections to the PostgreSQL database.
 */

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default prisma;