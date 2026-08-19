/**
 * ==============================================================================
 * ATTRAVOYA WEB PAGE - ACCOMMODATION COMPARISON
 * ==============================================================================
 * Handles querying hotel, hostel, and guest house offers dynamically.
 */

"use client";

import React, { useState } from "react";
import { apiClient } from "../../lib/api-client.js";
import { StaySearchForm } from "../../components/forms/StaySearchForm.jsx";
import { StayCard } from "../../components/stays/StayCard.jsx";
import { Spinner } from "../../components/ui/Spinner.jsx";

export default function StaysPage() {
  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (params) => {
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const query = `?destinationSlug=${params.destinationSlug}&checkInDate=${params.checkInDate}&checkOutDate=${params.checkOutDate}&guestsCount=${params.guestsCount}`;
      const response = await apiClient.get(`/stays/search${query}`);
      if (response.success && response.stays) {
        setStays(response.stays);
      }
    } catch (err) {
      setError(err.message || "Failed to retrieve accommodation offers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8 w-full">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Compare Hotel Offers</h1>
        <p className="text-slate-500 mt-1">Search resorts, apartments, and guest houses instantly.</p>
      </div>

      <StaySearchForm onSearch={handleSearch} />

      {loading && (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <Spinner size="lg" color="primary" />
          <p className="font-bold text-slate-400">Comparing central lodging tariffs...</p>
        </div>
      )}

      {error && (
        <div role="alert" className="p-4 bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold text-sm rounded-xl">
          {error}
        </div>
      )}

      {!loading && searched && stays.length === 0 && (
        <p className="text-center text-slate-500 py-10 font-bold">No stay offers found for this search. Try a different city or dates.</p>
      )}

      <div className="grid grid-cols-1 gap-6">
        {stays.map((stay) => (
          <StayCard key={stay.id} stay={stay} />
        ))}
      </div>
    </div>
  );
}