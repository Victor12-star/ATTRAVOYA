/**
 * ==============================================================================
 * ATTRAVOYA STAY PROVIDER - BASE ABSTRACT CLASS
 * ==============================================================================
 * Defines the contract/interface that all accommodation providers (like Booking.com,
 * Expedia, or our local MockProvider) must implement. This maps search structures.
 */

export class StayProvider {
    /**
   * Search hotel / stays offers.
   * Must return an array of normalized StayOffer objects.
   */
    async searchStays(searchParams) {
    throw new Error("Method 'searchStays()' must be implemented by the provider subclass.");
    }
}

export default StayProvider;