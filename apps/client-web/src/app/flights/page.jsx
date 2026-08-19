/**
 * ==============================================================================
 * ATTRAVOYA WEB PAGE - FLIGHT SEARCH COMPARISON
 * ==============================================================================
 * Handles querying flight offers dynamically.
 */

"use client";

import React, { useState } from "react";
import { apiClient } from "../../lib/api-client.js";
import { FlightSearchForm } from "../../components/forms/FlightSearchForm.jsx";
import { FlightCard } from "../../components/flights/FlightCard.jsx";
import { Spinner } from "../../components/ui/Spinner.jsx";

export default function FlightsPage() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    const handleSearch = async (params) => {
    setLoading(true);
    setError("");
    setSearched(true);
    try {
        const query = `?originCode=${params.originCode}&destinationCode=${params.destinationCode}&departureDate=${params.departureDate}&cabinClass=${params.cabinClass}&adults=${params.adults}`;
        const response = await apiClient.get(`/flights/search${query}`);
        if (response.success && response.flights) {
        setFlights(response.flights);
        }
    } catch (err) {
        setError(err.message || "Failed to search flight offers.");
    } finally {
        setLoading(false);
    }
    };

    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8 w-full">
        <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Compare Flight Offers</h1>
        <p className="text-slate-500 mt-1">Search multiple airlines and discover fastest and cheapest routing options instantly.</p>
        </div>

        <FlightSearchForm onSearch={handleSearch} />

        {loading && (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
            <Spinner size="lg" color="primary" />
            <p className="font-bold text-slate-400">Searching live flight registries...</p>
        </div>
        )}

        {error && (
        <div role="alert" className="p-4 bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold text-sm rounded-xl">
            {error}
        </div>
        )}

        {!loading && searched && flights.length === 0 && (
        <p className="text-center text-slate-500 py-10 font-bold">No flight offers found for this search. Try a different date or airport code.</p>
        )}

        <div className="flex flex-col gap-4">
        {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
        ))}
        </div>
    </div>
    );
}