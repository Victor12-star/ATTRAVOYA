/**
 * ==============================================================================
 * ATTRAVOYA STAY PROVIDER - MOCK ACCOMMODATION ENGINE
 * ==============================================================================
 * Generates highly realistic hotel offers based on destination slug parameters.
 * Sets star ratings, pool, gym, free breakfast, pet policies, and cancellation flags.
 */

import { StayProvider } from "./stay-provider.js";

export class MockStayProvider extends StayProvider {
    /**
   * Search and generate mock hotel offers.
   */
    async searchStays(params) {
    const { destinationSlug } = params;

    // Standard list of hotel names we can map dynamically
    const namesList = [
        { name: "Voya Plaza Hotel", type: "HOTEL", stars: 4, rating: 8.8 },
        { name: "Backpackers Beach Shelter", type: "HOSTEL", stars: 2, rating: 7.9 },
        { name: "Paradise Bay Golf Resort", type: "RESORT", stars: 5, rating: 9.3 },
        { name: "Waikiki Cozy Holiday Apartment", type: "APARTMENT", stars: 3, rating: 8.5 }
    ];

    const offers = [];

    for (let i = 0; i < 4; i++) {
        const hotel = namesList[i];
      const pricePerNight = 45 + (i * 85) + (hotel.stars * 30);
      const priceTotal = pricePerNight * 5; // Assumes a standard 5-night stay
      const taxesAndFees = parseFloat((priceTotal * 0.14).toFixed(2)); // 14% lodging tax

        offers.push({
        id: `stay-offer-${destinationSlug}-${i}`,
        name: `${destinationSlug.toUpperCase()} ${hotel.name}`,
        starRating: hotel.stars,
        guestRating: hotel.rating,
        type: hotel.type,
        pricePerNight,
        priceTotal,
        taxesAndFees,
        distanceFromCenter: 0.5 + (i * 1.5), // in km
        address: `${100 + i * 25} coastal shoreline boulevard, ${destinationSlug}`,
        latitude: 21.3069 + (i * 0.005),
        longitude: -157.8583 - (i * 0.005),
        hasFamilyRooms: i % 2 === 0,
        hasChildrenBeds: i % 2 === 0,
        hasPool: i % 2 === 0,
        hasGym: i === 2,
        hasFreeCancellation: i % 2 !== 0,
        hasBreakfastIncluded: i % 3 === 0,
        policies: ["No Smoking inside rooms", "Check-in after 14:00 PM", "Check-out before 11:00 AM"],
        providerName: i === 0 ? "Booking.com Partner" : "Expedia Travel",
        bookingUrl: "https://booking.hotel-provider.com/redirect?ref=attravoya",
        isSponsored: i === 0 // Mark the first entry as sponsored result
        });
    }

    return offers;
    }
}

export default MockStayProvider;