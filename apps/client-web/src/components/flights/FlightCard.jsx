/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - FLIGHT CARD
 * ==============================================================================
 * Accessible card highlighting flight prices, speeds, stopovers, and refund terms.
 */

import React from "react";
import { Card } from "../ui/Card.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";

export const FlightCard = ({ flight }) => {
  return (
    <Card className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/40 transition-colors">
      
      {/* Flight info details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
        {/* Airline Brand */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl w-full sm:w-fit flex-shrink-0">
          <span className="text-3xl" aria-hidden="true">{flight.airlineLogoUrl}</span>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white leading-none">{flight.airline}</h4>
            <span className="text-xs text-slate-400 font-mono mt-1 block">{flight.flightNumber}</span>
          </div>
        </div>

        {/* Route Timeline */}
        <div className="flex items-center justify-between gap-6 w-full max-w-md">
          {/* Origin */}
          <div className="text-center sm:text-left">
            <span className="text-xl font-black text-slate-900 dark:text-white block">{flight.originCode}</span>
            <span className="text-xs text-slate-400">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          {/* Connection Map Polyline */}
          <div className="flex flex-col items-center flex-grow gap-1">
            <span className="text-xs font-bold text-slate-400 font-mono">{flight.duration}</span>
            <div className="relative w-full flex items-center justify-center">
              <hr className="border-t border-dashed border-slate-200 dark:border-slate-700 w-full absolute" />
              <span className="relative z-10 text-lg bg-white dark:bg-slate-900 px-2 text-slate-400">✈️</span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {flight.stopsCount === 0 ? "Non-Stop / Direct" : `${flight.stopsCount} Stop${flight.stopsCount > 1 ? "s" : ""} (${flight.layoverAirports.join(", ")})`}
            </span>
          </div>

          {/* Destination */}
          <div className="text-center sm:text-right">
            <span className="text-xl font-black text-slate-900 dark:text-white block">{flight.destinationCode}</span>
            <span className="text-xs text-slate-400">{new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Flight Pricing and Booking Trigger */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800 w-full md:w-44 gap-3 flex-shrink-0">
        <div className="text-left md:text-right">
          <Badge variant={flight.classification === "CHEAPEST" ? "success" : (flight.classification === "FASTEST" ? "info" : "default")} className="mb-1.5">
            {flight.classification}
          </Badge>
          <span className="text-3xl font-black text-slate-900 dark:text-white block">
            ${flight.priceTotal.toFixed(2)}
          </span>
          <span className="text-xs text-slate-400">Taxes Included (${flight.priceTax.toFixed(2)})</span>
        </div>

        <Button
          onClick={() => window.open(flight.bookingRedirectUrl, "_blank")}
          ariaLabel={`Book ticket flight with ${flight.airline} for $${flight.priceTotal.toFixed(2)}`}
          className="px-5 py-2"
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};