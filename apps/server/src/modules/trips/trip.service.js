/**
 * ==============================================================================
 * ATTRAVOYA SERVER TRIPS - SERVICE LAYER
 * ==============================================================================
 * Manages SQL transactions and mock-data operations for custom traveler trips.
 * Supports dual-mode (Prisma vs. centralized mock array).
 */

import { prisma } from "../../lib/prisma.js";
import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";
import { mockTrips } from "../../lib/mock-db.js";

/**
 * Fetch all scheduled trips for a specific traveler
 */
export const getUserTripsList = async (userId) => {
    if (env.useMockDb) {
    return mockTrips.filter((t) => t.userId === userId);
    }
    
    try {
    return await prisma.trip.findMany({
        where: { userId },
        include: { activities: true },
        orderBy: { startDate: "asc" }
    });
    } catch (e) {
    logger.warn("Prisma getUserTripsList failed, falling back to mock:", e.message);
    return mockTrips.filter((t) => t.userId === userId);
    }
};

/**
 * Creates a brand new trip outline
 */
export const createUserTrip = async (userId, tripData) => {
    const newTrip = {
    id: `trip-${Date.now()}`,
    userId,
    title: tripData.title,
    startDate: new Date(tripData.startDate),
    endDate: new Date(tripData.endDate),
    totalCost: 0.0,
    currency: tripData.currency || "USD",
    notes: tripData.notes || "",
    isShared: tripData.isShared || false,
    createdAt: new Date(),
    updatedAt: new Date(),
    activities: []
    };

    if (env.useMockDb) {
    logger.warn(`[MOCK MODE] Creating custom traveler trip: ${newTrip.title}`);
    mockTrips.push(newTrip);
    return newTrip;
    }

    try {
    return await prisma.trip.create({
        data: {
        userId,
        title: newTrip.title,
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
        currency: newTrip.currency,
        notes: newTrip.notes,
        isShared: newTrip.isShared
        }
    });
    } catch (e) {
    logger.error("Prisma createUserTrip failed, falling back to mock:", e.message);
    mockTrips.push(newTrip);
    return newTrip;
    }
};

/**
 * Appends a scheduled activity event inside a trip
 */
export const addUserTripActivity = async (tripId, activityData) => {
    const newActivity = {
    id: `act-${Date.now()}`,
    tripId,
    date: new Date(activityData.date),
    timeSlot: activityData.timeSlot || null,
    title: activityData.title,
    description: activityData.description || "",
    cost: parseFloat(activityData.cost || "0"),
    category: activityData.category
    };

    if (env.useMockDb) {
    logger.warn(`[MOCK MODE] Appending activity event: ${newActivity.title}`);
    const tripIndex = mockTrips.findIndex((t) => t.id === tripId);
    if (tripIndex !== -1) {
        mockTrips[tripIndex].activities.push(newActivity);
        mockTrips[tripIndex].totalCost += newActivity.cost;
        mockTrips[tripIndex].updatedAt = new Date();
        return mockTrips[tripIndex];
    }
    throw new Error("Trip record not found.");
    }

    try {
    // 1. Create the activity
    const activity = await prisma.tripActivity.create({
        data: {
        tripId,
        date: newActivity.date,
        timeSlot: newActivity.timeSlot,
        title: newActivity.title,
        description: newActivity.description,
        cost: newActivity.cost,
        category: newActivity.category
        }
    });

    // 2. Increment total cost in parent Trip
    await prisma.trip.update({
        where: { id: tripId },
        data: {
        totalCost: { increment: newActivity.cost }
        }
    });

    // Return the updated trip
    return await prisma.trip.findUnique({
        where: { id: tripId },
        include: { activities: true }
    });
    } catch (e) {
    logger.error("Prisma addUserTripActivity failed, falling back to mock:", e.message);
    const tripIndex = mockTrips.findIndex((t) => t.id === tripId);
    if (tripIndex !== -1) {
        mockTrips[tripIndex].activities.push(newActivity);
        mockTrips[tripIndex].totalCost += newActivity.cost;
        mockTrips[tripIndex].updatedAt = new Date();
        return mockTrips[tripIndex];
    }
    throw new Error("Trip record not found.");
    }
};

/**
 * Delete a trip
 */
export const deleteUserTrip = async (tripId, userId) => {
    if (env.useMockDb) {
    logger.warn(`[MOCK MODE] Deleting trip ID: ${tripId}`);
    const index = mockTrips.findIndex((t) => t.id === tripId && t.userId === userId);
    if (index !== -1) {
        mockTrips.splice(index, 1);
        return true;
    }
    return false;
    }

    try {
    await prisma.trip.delete({
        where: { id: tripId, userId }
    });
    return true;
    } catch (e) {
    logger.error("Prisma deleteUserTrip failed, falling back to mock:", e.message);
    const index = mockTrips.findIndex((t) => t.id === tripId && t.userId === userId);
    if (index !== -1) {
        mockTrips.splice(index, 1);
        return true;
    }
    return false;
    }
};