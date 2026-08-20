/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - TRAVELER PROFILE PREFERENCES PAGE
 * ==============================================================================
 * Enables travelers to update their custom profiles, default currencies,
 * and languages. Changes are submitted to our Express backend.
 */

"use client";

import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth.js";
import { apiClient } from "../../../lib/api-client.js";
import { Select } from "../../../components/ui/Select.jsx";
import { Button } from "../../../components/ui/Button.jsx";

export default function ProfilePage() {
  const { user } = useAuth();

  // Local state form controllers
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [homeCountry, setHomeCountry] = useState(user?.homeCountry || "");
  const [homeCity, setHomeCity] = useState(user?.homeCity || "");
  const [prefCurrency, setPrefCurrency] = useState(user?.prefCurrency || "USD");
  const [prefLanguage, setPrefLanguage] = useState(user?.prefLanguage || "en");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const response = await apiClient.put("/users/update", {
        fullName,
        homeCountry,
        homeCity,
        prefCurrency,
        prefLanguage
      });

      if (response.success) {
        setSuccess("Your preferences have been saved successfully!");
        
        // Refresh local memory state by silently reloading profile values
        window.location.reload();
      }
    } catch (err) {
      setError(err.message || "Failed to update profile settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Profile Preferences</h1>
        <p className="text-sm text-slate-500 mt-1">Configure your default regional parameters for accurate cost index comparisons.</p>
      </div>

      {success && (
        <div role="alert" className="p-4 bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm rounded-xl">
          {success}
        </div>
      )}

      {error && (
        <div role="alert" className="p-4 bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold text-sm rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-5">
        
        {/* Full Name Input */}
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            className="w-full px-3.5 py-2 text-base rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Home Country Input */}
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Home Country</label>
            <input
              type="text"
              value={homeCountry}
              onChange={(e) => setHomeCountry(e.target.value)}
              disabled={loading}
              className="w-full px-3.5 py-2 text-base rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Home City Input */}
          <div>
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Home City</label>
            <input
              type="text"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              disabled={loading}
              className="w-full px-3.5 py-2 text-base rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Default Currency Select dropdown */}
          <Select
            label="Preferred Currency"
            value={prefCurrency}
            onChange={(e) => setPrefCurrency(e.target.value)}
            options={[
              { value: "USD", label: "US Dollar ($)" },
              { value: "EUR", label: "Euro (€)" },
              { value: "JPY", label: "Japanese Yen (¥)" },
              { value: "GBP", label: "Great British Pound (£)" }
            ]}
            disabled={loading}
          />

          {/* Default Language Select dropdown */}
          <Select
            label="Preferred Language"
            value={prefLanguage}
            onChange={(e) => setPrefLanguage(e.target.value)}
            options={[
              { value: "en", label: "English" },
              { value: "fr", label: "French" },
              { value: "ja", label: "Japanese" },
              { value: "es", label: "Spanish" }
            ]}
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-fit px-6 mt-4 self-end"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
