/**
 * ==============================================================================
 * ATTRAVOYA FLIGHT PROVIDER - MOCK TRAVEL ENGINE
 * ==============================================================================
 * Generates highly realistic, dynamic flight offers for any requested airports.
 * Calculates flight durations, layovers, passenger baggage allowances, and
 * categorizes them cleanly (Cheapest, Fastest, Best) so users can compare.
 */

import { FlightProvider } from "./flight-provider.js";

export class MockFlightProvider extends FlightProvider {
    /**
   * Search and generate randomized mock flight offers.
   */
    async searchFlights(params) {
    const { originCode, destinationCode, departureDate, cabinClass, adults } = params;

    // List of mock airlines operating routes
    const airlinesList = [
        { name: "VoyaAir", logo: "✈️" },
        { name: "SkyLink Airways", logo: "🛩️" },
        { name: "Pacific Blue", logo: "🌐" },
        { name: "EuroWings Connection", logo: "🇪🇺" }
    ];

    // Seed randomized but realistic offers
    const offers = [];

    for (let i = 0; i < 6; i++) {
        const airline = airlinesList[i % airlinesList.length];
      const stops = i === 0 ? 0 : (i % 2 === 0 ? 1 : 2); // Mix direct and stop-over flights
        
      // Calculate randomized duration (in minutes) and pricing
      const basePrice = 150 + (i * 75) + (cabinClass === "BUSINESS" ? 400 : (cabinClass === "FIRST" ? 1200 : 0));
      const priceTotal = basePrice * adults;
      const priceTax = parseFloat((priceTotal * 0.12).toFixed(2)); // 12% standard taxes
        
      const durationMinutes = 120 + (i * 90) + (stops * 180);
        const hours = Math.floor(durationMinutes / 60);
        const mins = durationMinutes % 60;
        const durationString = `${hours}h ${mins}m`;

      // Select random intermediate layovers if stops > 0
        const layovers = [];
        if (stops > 0) layovers.push("AMS");
        if (stops > 1) layovers.push("ORD");

      // Categorize classifications dynamically
        let classification = "STANDARD";
      if (i === 0) classification = "FASTEST"; // Direct flight
      if (i === 1) classification = "CHEAPEST"; // Double stop low price
      if (i === 2) classification = "BEST";     // Mix of speed and luggage inclusion

        offers.push({
        id: `flight-offer-${originCode}-${destinationCode}-${i}`,
        airline: airline.name,
        airlineLogoUrl: airline.logo,
        flightNumber: `AV-${100 + i * 53}`,
        originCode,
        destinationCode,
        departureTime: `${departureDate}T${10 + i}:30:00Z`,
        arrivalTime: `${departureDate}T${10 + i + hours}:${mins}:00Z`,
        duration: durationString,
        stopsCount: stops,
        layoverAirports: layovers,
        priceTotal: parseFloat(priceTotal.toFixed(2)),
        priceTax,
        baggageAllowance: i % 2 === 0 ? "1 Checked Bag (23kg)" : "Cabin Baggage Only",
        refundConditions: i % 3 === 0 ? "Non-Refundable Ticket" : "Fully Refundable within 24 hours",
        changeConditions: i % 2 === 0 ? "Changes Allowed ($50 fee)" : "No Changes Permitted",
        bookingRedirectUrl: "https://booking.airline-provider.com/redirect?ref=attravoya",
        lastCheckedAt: new Date(),
        classification
        });
    }

    return offers;
    }
}

export default MockFlightProvider;