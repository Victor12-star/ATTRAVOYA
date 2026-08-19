/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - HOTEL OFFER CARD
 * ==============================================================================
 * Accessible card highlighting stay prices, guest ratings, and amenities.
 */

import React from "react";
import { Card } from "../ui/Card.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";

export const StayCard = ({ stay }) => {
  return (
    <Card className="p-6 flex flex-col md:flex-row items-stretch justify-between gap-6 hover:border-primary/40 transition-colors">
      
      {/* Hotel Description Details */}
      <div className="flex flex-col gap-3 flex-grow">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="info">{stay.type}</Badge>
          {stay.isSponsored && (
            <Badge variant="default" className="bg-slate-100 text-slate-500 text-[10px]">Sponsored</Badge>
          )}
          {stay.hasFreeCancellation && (
            <Badge variant="success">Free Cancellation</Badge>
          )}
        </div>

        <div>
          <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {stay.name}
          </h4>
          <p className="text-sm text-slate-400 mt-1">📍 {stay.address} ({stay.distanceFromCenter.toFixed(1)} km from center)</p>
        </div>

        {/* Stars and guest ratings */}
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="text-amber-500">
            {"★".repeat(stay.starRating)}{"☆".repeat(5 - stay.starRating)} <span className="text-slate-400">({stay.starRating} Stars)</span>
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-500">
            👍 Guest Score: {stay.guestRating} / 10
          </span>
        </div>

        {/* Amenities Icons Row */}
        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-2">
          {stay.hasPool && <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg">🏊 Pool</span>}
          {stay.hasGym && <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg">🏋️ Gym</span>}
          {stay.hasBreakfastIncluded && <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg">🥞 Free Breakfast</span>}
          {stay.hasFamilyRooms && <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg">👨‍👩‍👧 Family Rooms</span>}
        </div>
      </div>

      {/* Hotel Pricing & Booking redirect */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800 w-full md:w-44 gap-3 flex-shrink-0">
        <div className="text-left md:text-right">
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            ${stay.pricePerNight.toFixed(0)}
          </span>
          <span className="text-xs text-slate-400 block leading-none">per night</span>
          <span className="text-xs text-slate-500 mt-1 block">Total Stay: ${stay.priceTotal.toFixed(0)}</span>
        </div>

        <Button
          onClick={() => window.open(stay.bookingUrl, "_blank")}
          ariaLabel={`Book room at ${stay.name} for $${stay.pricePerNight.toFixed(0)} per night`}
          className="px-5 py-2"
        >
          Book Room
        </Button>
      </div>
    </Card>
  );
};