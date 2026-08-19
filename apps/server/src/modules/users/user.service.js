/**
 * ==============================================================================
 * ATTRAVOYA SERVER USERS - SERVICE LAYER
 * ==============================================================================
 * Manages queries to load and update traveler preferences in the database.
 * Supports dual-mode (Prisma vs. dynamic central mock arrays).
 */

import { prisma } from "../../lib/prisma.js";
import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";
import { mockUsers } from "../../lib/mock-db.js";

/**
 * Find traveler by their ID
 */
export const getUserById = async (id) => {
    if (env.useMockDb) {
    return mockUsers.find((u) => u.id === id) || null;
    }
    try {
    return await prisma.user.findUnique({ where: { id } });
    } catch (e) {
    logger.warn("Prisma getUserById failed, fallback to mock:", e.message);
    return mockUsers.find((u) => u.id === id) || null;
    }
};

/**
 * Update traveler preferences and configurations
 */
export const updateUserSettings = async (id, updateFields) => {
    if (env.useMockDb) {
    logger.warn(`[MOCK MODE] Modifying profile settings for user ID: ${id}`);
    const userIndex = mockUsers.findIndex((u) => u.id === id);
    if (userIndex === -1) {
        throw new Error("Traveler record not found.");
    }
    
    // Update fields in mock array
    mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updateFields,
        updatedAt: new Date()
    };
    
    return mockUsers[userIndex];
    }

    try {
    return await prisma.user.update({
        where: { id },
        data: updateFields
    });
    } catch (e) {
    logger.error("Prisma updateUserSettings failed, falling back to mock:", e.message);
    const userIndex = mockUsers.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
        mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updateFields,
        updatedAt: new Date()
        };
        return mockUsers[userIndex];
    }
    throw new Error("Traveler record not found.");
    }
};