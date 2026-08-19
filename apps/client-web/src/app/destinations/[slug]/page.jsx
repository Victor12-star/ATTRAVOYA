/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - DYNAMIC DESTINATION PORTFOLIO HUB
 * ==============================================================================
 * This dynamic route page loads complete traveler intelligence for any requested
 * city slug (e.g. /destinations/honolulu or /destinations/paris).
 *
 * It fetches the comprehensive nested guides from our Express server, and renders
 * our multi-tab traveler dashboard.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "../../../lib/api-client.js";
import { Spinner } from "../../../components/ui/Spinner.jsx";
import { DestinationHero } from "../../../components/destination/DestinationHero.jsx";
import { DestinationTabs } from "../../../components/destination/DestinationTabs.jsx";
import { DestinationOverview } from "../../../components/destination/DestinationOverview.jsx";
import { HistorySection } from "../../../components/destination/HistorySection.jsx";
import { LanguageSection } from "../../../components/destination/LanguageSection.jsx";
import { WeatherSection } from "../../../components/destination/WeatherSection.jsx";

export default function DestinationDetailPage() {
  const { slug } = useParams(); // Reads city parameter directly from browser address
  const [guide, setGuide] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // Default active section
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch detailed guide profile on mount
  useEffect(() => {
    const fetchGuide = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get(`/destinations/${slug}`);
        if (response.success && response.destination) {
          setGuide(response.destination);
        }
      } catch (err) {
        setError(err.message || "Could not retrieve the requested travel guide.");
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 gap-4">
        <Spinner size="lg" color="primary" />
        <p className="font-bold text-slate-500">Unpacking regional travel portfolios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center flex flex-col gap-4">
        <span className="text-4xl" aria-hidden="true">🗺️</span>
        <h1 className="text-2xl font-black text-red-500">Guide retrieval failed</h1>
        <p className="text-slate-500">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-primary text-slate-950 font-bold rounded-lg self-center">Retry</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* 1. Header Hero Banner */}
      <DestinationHero destination={guide} />

      {/* 2. Interactive Navigation Section Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8 pb-20">
        <DestinationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* 3. Render Tab Contents dynamically */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            {activeTab === "overview" && <DestinationOverview destination={guide} />}
            {activeTab === "history" && <HistorySection destination={guide} />}
            {activeTab === "languages" && <LanguageSection destination={guide} />}
            {activeTab === "weather" && <WeatherSection destination={guide} />}
        </div>
        </section>
    </div>
    );
}