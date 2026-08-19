/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - FLIGHT SEARCH FORM
 * ==============================================================================
 * Accessible search parameters picker.
 */

"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input.jsx";
import { Select } from "../ui/Select.jsx";
import { Button } from "../ui/Button.jsx";

export const FlightSearchForm = ({ onSearch }) => {
    const [originCode, setOriginCode] = useState("JFK");
    const [destinationCode, setDestinationCode] = useState("HNL");
    const [departureDate, setDepartureDate] = useState("2026-08-20");
    const [cabinClass, setCabinClass] = useState("ECONOMY");
    const [adults, setAdults] = useState(1);

    const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ originCode, destinationCode, departureDate, cabinClass, adults });
    };

    return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Origin Airport */}
        <Input
            label="From (Airport Code)"
            required
            value={originCode}
            onChange={(e) => setOriginCode(e.target.value)}
            placeholder="e.g. JFK"
        />

        {/* Destination Airport */}
        <Input
            label="To (Airport Code)"
            required
            value={destinationCode}
            onChange={(e) => setDestinationCode(e.target.value)}
            placeholder="e.g. HNL"
        />

        {/* Departure Date */}
        <Input
            label="Departure Date"
            type="date"
            required
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
        />

        {/* Seating Class Selector */}
        <Select
            label="Cabin Class"
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            options={[
            { value: "ECONOMY", label: "Economy" },
            { value: "PREMIUM_ECONOMY", label: "Premium Economy" },
            { value: "BUSINESS", label: "Business" },
            { value: "FIRST", label: "First Class" }
            ]}
        />
        </div>

        <div className="flex items-center justify-between gap-4 mt-2">
        {/* Passengers Selector */}
        <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Adults:</label>
            <select
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value, 10))}
            className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold border-none cursor-pointer"
            >
            {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
            ))}
            </select>
        </div>

        <Button type="submit" className="px-6">
            Find Flights
        </Button>
        </div>
    </form>
    );
};