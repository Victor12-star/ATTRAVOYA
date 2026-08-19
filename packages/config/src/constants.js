/**
 * ==============================================================================
 * ATTRAVOYA GLOBAL SYSTEM CONSTANTS
 * ==============================================================================
 * Houses technical limit parameters, caching timers, and baseline rules.
 */

export const SYSTEM_CONSTANTS = {
  // Security limits
  maxRequestsPerMinute: 100, // Anti-bot scraping threshold limit
  
  // Cache timeouts (in seconds)
  cacheTimeouts: {
    weather: 7200,      // Cache weather for 2 hours (saves API costs)
    currency: 86400,    // Cache currency rates for 24 hours
    flights: 1800,      // Cache flight searches for 30 minutes
    stays: 1800,       // Cache hotel listings for 30 minutes
  },
  
  // Passenger labels
  passengerTypes: {
    adult: "ADULT",
    child: "CHILD",
    infant: "INFANT"
  }
};