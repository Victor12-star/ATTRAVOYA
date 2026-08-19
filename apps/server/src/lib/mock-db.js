/**
 * ==============================================================================
 * ATTRAVOYA SERVER - CENTRALIZED IN-MEMORY MOCK STORE
 * ==============================================================================
 * This file acts as our local "mock database" cache when PostgreSQL is offline.
 * By keeping lists here, updates (such as registering a new traveler or updating
 * a profile) will persist dynamically across all API requests during server uptime!
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

export default {
  mockUsers
};