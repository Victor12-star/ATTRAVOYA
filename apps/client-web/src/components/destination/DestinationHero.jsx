/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - DESTINATION HERO COVER
 * ==============================================================================
 * Displays the destination's cover image, city name, parent state, and IATA
 * airport code cleanly, framing the entry point of the guide nicely.
 */

import React from "react";
import { Badge } from "../ui/Badge.jsx";

export const DestinationHero = ({ destination }) => {
  return (
    <section 
      className="relative h-96 w-full bg-slate-900 text-white flex items-end pb-12"
      aria-label={`${destination.name} introduction header`}
    >
      {/* Background Image backdrop with dimming filter */}
      <div className="absolute inset-0">
        <img
          src={destination.coverImage}
          alt={`Panoramic photo of ${destination.name}`}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* Hero Contents */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="info" className="bg-primary/20 text-primary font-bold text-sm">
            {destination.type}
          </Badge>
          <Badge variant="default" className="font-bold text-sm">
            IATA: {destination.airportCode}
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
          {destination.name}
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-200 max-w-3xl leading-relaxed">
          {destination.description}
        </p>

        {/* GPS Coordinates mapping descriptors */}
        <p className="text-xs text-slate-400 font-mono">
          GPS Coordinates: Latitude {destination.latitude.toFixed(4)}° | Longitude {destination.longitude.toFixed(4)}°
        </p>
      </div>
    </section>
  );
};

export default DestinationHero;