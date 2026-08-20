/**
 * ==============================================================================
 * ATTRAVOYA SERVER - CENTRALIZED IN-MEMORY MOCK STORE
 * ==============================================================================
 * This file acts as our local "mock database" cache when PostgreSQL is offline.
 * By keeping lists here, updates (such as registering a new traveler, updating
 * a profile, or creating customizable trip itineraries) will persist dynamically
 * across all API requests during server uptime!
 */

export const mockUsers = [
  {
    id: "admin-uuid-1111-2222",
    email: "admin@attravoya.com",
    passwordHash: "$2a$10$wNclU3BshLqVpP198B75ZeV.pYh.R2R3H7L6D0g1N9v3K6n3I3y6q", // Hashed 'adminSecurePass2026'
    fullName: "Chief Travel Admin",
    role: "ADMIN",
    homeCountry: "USA",
    homeCity: "San Francisco",
    prefCurrency: "USD",
    prefLanguage: "en",
    isMfaEnabled: false,
    createdAt: new Date()
  }
];

export const mockTrips = [
  {
    id: "trip-mock-123",
    userId: "admin-uuid-1111-2222",
    title: "My Dream Hawaiian Escape",
    startDate: "2026-08-20",
    endDate: "2026-08-25",
    totalCost: 1070.00,
    currency: "USD",
    notes: "Tropical beach vacation. Focus on resting, surfing, and Hawaiian history.",
    isShared: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    activities: [
      {
        id: "act-1",
        tripId: "trip-mock-123",
        date: "2026-08-20",
        timeSlot: "09:00",
        title: "Flight JFK to Honolulu",
        description: "VoyaAir Flight AV-100 direct. Be at terminal 2 hours early.",
        cost: 150.00,
        category: "FLIGHT"
      },
      {
        id: "act-2",
        tripId: "trip-mock-123",
        date: "2026-08-20",
        timeSlot: "15:00",
        title: "Check-in at HNL Voya Plaza Hotel",
        description: "5-night booking. Check-in starts at 14:00 PM.",
        cost: 825.00,
        category: "HOTEL"
      },
      {
        id: "act-3",
        tripId: "trip-mock-123",
        date: "2026-08-21",
        timeSlot: "10:00",
        title: "Waikiki Beach Surf Lessons",
        description: "Free beach entry. Renting a surf board at shoreline stand.",
        cost: 30.00,
        category: "ATTRACTION"
      },
      {
        id: "act-4",
        tripId: "trip-mock-123",
        date: "2026-08-21",
        timeSlot: "13:00",
        title: "Seafood lunch at Duke's Waikiki",
        description: "Located right on the sand. Wheel-chair accessible patio.",
        cost: 65.00,
        category: "MEAL"
      }
    ]
  }
];

export default {
  mockUsers,
  mockTrips
};