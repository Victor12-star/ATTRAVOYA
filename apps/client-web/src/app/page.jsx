/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - HOME PAGE
 * ==============================================================================
 * This is the landing homepage of AttraVoya. It features:
 * 1. Large search hero panel with integrated autocomplete search.
 * 2. Traveler passengers input filters tab.
 * 3. Grid showcases of curated global destinations (including beaches and old towns!).
 * 4. Recent safety advisories and deal highlights.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { brandConfig } from "@attravoya/config";
import { DestinationSearchForm } from "../components/forms/DestinationSearchForm.jsx";
import { Card } from "../components/ui/Card.jsx";
import { Badge } from "../components/ui/Badge.jsx";

export default function HomePage() {
  const [searchTab, setSearchTab] = useState("all"); // "all" | "flights" | "stays"

  // Curated list of popular destinations for quick access
  const popularCities = [
    {
      name: "Honolulu, USA",
      slug: "honolulu",
      tag: "Tropical Beach",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      desc: "Surf golden waves at world-famous Waikiki Beach.",
      badge: "Beach Paradise"
    },
    {
      name: "Paris, France",
      slug: "paris",
      tag: "History & Art",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80",
      desc: "Explore historic Louvre galleries and romantic boulevards.",
      badge: "Historical"
    },
    {
      name: "Tokyo, Japan",
      slug: "tokyo",
      tag: "Culture & Tech",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80",
      desc: "Encounter ancient Shinto shrines and futuristic skyscrapers.",
      badge: "Metropolis"
    },
    {
      name: "Stockholm, Sweden",
      slug: "stockholm",
      tag: "Old Town & Canals",
      image: "https://images.unsplash.com/photo-1509142111881-2292f256037b?auto=format&fit=crop&w=400&q=80",
      desc: "Walk cobbled Gamla Stan alleys across Baltic archipelagos.",
      badge: "Scandinavian"
    }
  ];

  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* SECTION 1: HERO CONTAINER SECTION */}
      <section
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white py-24 px-4 sm:px-6 lg:px-8 text-center"
        aria-label="Welcome and Unified Destination Search"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <Badge variant="info" className="self-center bg-sky-400/20 text-sky-300">
            {brandConfig.slogan}
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Discover Your Next <span className="text-primary">Adventure</span> Smarter.
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Find global flights, hotel comparison indices, safety bulletins, and local taxi rates—all in one secure place.
          </p>

          {/* Autocomplete Input Search Console */}
          <div className="mt-6">
            <DestinationSearchForm />
          </div>
        </div>
      </section>

      {/* SECTION 2: SEARCH ENGINE OPTIONS TABBED CONSOLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" aria-label="Quick Search Consoles">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col gap-6 -mt-24 relative z-10">
          
          {/* Navigation Tab Anchors */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 pb-3 gap-6" role="tablist">
            <button
              role="tab"
              aria-selected={searchTab === "all"}
              onClick={() => setSearchTab("all")}
              className={`pb-2 text-base font-bold transition-all focus:outline-none ${
                searchTab === "all" ? "border-b-4 border-primary text-primary" : "text-slate-500"
              }`}
            >
              All Guides
            </button>
            <Link
              href="/flights"
              className="pb-2 text-base font-semibold text-slate-500 hover:text-primary transition-all"
            >
              Compare Flights
            </Link>
            <Link
              href="/stays"
              className="pb-2 text-base font-semibold text-slate-500 hover:text-primary transition-all"
            >
              Compare Stays
            </Link>
          </div>

          {/* Tab Panel Body */}
          <div className="text-slate-600 dark:text-slate-300">
            {searchTab === "all" && (
              <div className="flex flex-col gap-4">
                <p className="text-base">
                  Ready to check local rates, safety statuses, and phrases? Enter any city name above! Or browse our top recommendations:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/destinations/honolulu" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary/20 hover:text-primary font-bold text-sm rounded-xl transition-all">🏖️ Waikiki Beach, Honolulu</Link>
                  <Link href="/destinations/paris" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary/20 hover:text-primary font-bold text-sm rounded-xl transition-all">🗼 Eiffel Tower, Paris</Link>
                  <Link href="/destinations/tokyo" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary/20 hover:text-primary font-bold text-sm rounded-xl transition-all">🍣 Senso-ji, Tokyo</Link>
                  <Link href="/destinations/barcelona" className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-primary/20 hover:text-primary font-bold text-sm rounded-xl transition-all">🇪🇸 Barceloneta, Barcelona</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED POPULAR DESTINATIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Trending Destinations
            </h2>
            <p className="text-base text-slate-500">
              Browse world-class cities pre-loaded with local travel and beach intelligence.
            </p>
          </div>
          <Link
            href="/destinations"
            className="text-primary hover:underline font-bold text-base flex items-center gap-1 focus:ring-2 focus:ring-primary rounded-md p-1"
          >
            View all destinations
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Cities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCities.map((city) => (
            <Card key={city.slug} className="flex flex-col h-full">
              {/* Image banner */}
              <div className="relative h-48 w-full bg-slate-100">
                <img
                  src={city.image}
                  alt={`Scenic photograph of ${city.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="success" className="bg-emerald-500 text-slate-950 font-bold">
                    {city.badge}
                  </Badge>
                </div>
              </div>

              {/* Card Contents */}
              <div className="p-5 flex flex-col flex-grow gap-3">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {city.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {city.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex-grow">
                  {city.desc}
                </p>
                <Link
                  href={`/destinations/${city.slug}`}
                  className="mt-2 w-full text-center py-2 bg-slate-100 hover:bg-primary/20 hover:text-primary font-bold text-sm rounded-xl text-textLight dark:text-textDark dark:bg-slate-800 transition-colors"
                >
                  Explore Guide
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SECTION 4: FLIGHT & HOTEL VALUE DEALS SECTION */}
      <section className="bg-slate-100 dark:bg-slate-900/40 py-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Column A: Flight details banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col gap-5 shadow-sm">
            <div className="p-3 bg-sky-100 dark:bg-sky-950/40 rounded-2xl w-fit text-sky-600 dark:text-sky-400">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Flight Price Alerts</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Never pay full price. Save your favorite flights and get instant, automatic notifications as soon as ticket prices drop!
            </p>
            <Link
              href="/flights"
              className="mt-auto px-5 py-2.5 bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold rounded-xl text-center text-sm transition-colors dark:bg-sky-950/20 dark:text-sky-300"
            >
              Search Flight Deals
            </Link>
          </div>

          {/* Column B: Stays details banner */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col gap-5 shadow-sm">
            <div className="p-3 bg-amber-100 dark:bg-amber-950/40 rounded-2xl w-fit text-amber-600 dark:text-amber-400">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Hotel Comparison Indexes</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Compare guest houses, resorts, and shared apartments across top travel networks safely with no scrape bots.
            </p>
            <Link
                href="/stays"
                className="mt-auto px-5 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-700 font-bold rounded-xl text-center text-sm transition-colors dark:bg-amber-950/20 dark:text-amber-300"
            >
                Compare Hotel Options
            </Link>
            </div>
        </div>
        </section>

    </div>
    );
}