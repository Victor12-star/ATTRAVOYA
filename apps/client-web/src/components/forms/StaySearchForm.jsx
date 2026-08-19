/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - HOTEL SEARCH FORM
 * ==============================================================================
 * Form text inputs for hotel check-ins and check-outs.
 */

"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input.jsx";
import { Button } from "../ui/Button.jsx";

export const StaySearchForm = ({ onSearch }) => {
    const [destinationSlug, setDestinationSlug] = useState("honolulu");
    const [checkInDate, setCheckInDate] = useState("2026-08-20");
    const [checkOutDate, setCheckOutDate] = useState("2026-08-25");
    const [guestsCount, setGuestsCount] = useState(1);

    const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ destinationSlug, checkInDate, checkOutDate, guestsCount });
    };

    return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination Target */}
        <Input
            label="Where to?"
            required
            value={destinationSlug}
            onChange={(e) => setDestinationSlug(e.target.value)}
            placeholder="e.g. honolulu"
        />

        {/* Check-In */}
        <Input
            label="Check-In"
            type="date"
            required
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
        />

        {/* Check-Out */}
        <Input
            label="Check-Out"
            type="date"
            required
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
        />

        {/* Guests Select */}
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Guests</label>
            <select
            value={guestsCount}
            onChange={(e) => setGuestsCount(parseInt(e.target.value, 10))}
            className="w-full px-3.5 py-2.5 text-base rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
            {[1, 2, 3, 4, 6].map((n) => (
                <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
            ))}
            </select>
        </div>
        </div>

        <Button type="submit" className="w-fit px-6 self-end">
        Search Accommodations
        </Button>
    </form>
    );
};