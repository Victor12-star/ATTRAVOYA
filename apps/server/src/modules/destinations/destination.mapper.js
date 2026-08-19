/**
 * ==============================================================================
 * ATTRAVOYA SERVER DESTINATIONS - DATA MAPPER
 * ==============================================================================
 * Translates and shapes database models into streamlined JSON payloads for
 * consumer clients, removing duplicate IDs and organizing relations.
 */

export const mapDestinationResponse = (destination) => {
    if (!destination) return null;
    
    return {
    id: destination.id,
    slug: destination.slug,
    name: destination.name,
    type: destination.type,
    airportCode: destination.airportCode,
    latitude: destination.latitude,
    longitude: destination.longitude,
    description: destination.description,
    coverImage: destination.coverImage,
    
    // Core localized intelligence relations
    history: destination.history || null,
    timeline: destination.timeline || [],
    languages: destination.languages || [],
    phrases: destination.phrases || [],
    safetyAdvisories: destination.safetyAdvisories || [],
    taxiPrices: destination.taxiPrices || null,
    transportOptions: destination.transportOptions || [],
    restaurants: destination.restaurants || [],
    shoppingCentres: destination.shoppingCentres || [],
    weatherData: destination.weatherData || [],
    costOfLiving: destination.costOfLiving || null,
    attractions: destination.attractions || []
    };
};