/**
 * ==============================================================================
 * ATTRAVOYA FLIGHT PROVIDER - BASE ABSTRACT CLASS
 * ==============================================================================
 * Defines the contract/interface that all flight providers (like Amadeus,
 * Skyscanner, or our local MockProvider) must implement. This makes it extremely
 * easy to plug in real paid APIs later without breaking our controllers!
 */

export class FlightProvider {
    /**
   * Search flight offers from an origin to a destination airport code.
   * Must return an array of normalized FlightOffer objects.
   */
    async searchFlights(searchParams) {
    throw new Error("Method 'searchFlights()' must be implemented by the provider subclass.");
    }
}

export default FlightProvider;