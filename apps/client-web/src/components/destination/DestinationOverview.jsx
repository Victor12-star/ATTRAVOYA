/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - DESTINATION OVERVIEW SEGMENT
 * ==============================================================================
 * Displays the core, high-conversion visual catalog cards for local dining,
 * transport, and main attractions (such as beaches and monuments).
 */

import React from "react";
import { Card } from "../ui/Card.jsx";
import { Badge } from "../ui/Badge.jsx";

export const DestinationOverview = ({ destination }) => {
    return (
    <div className="flex flex-col gap-10">
        
      {/* SECTION 1: INTRODUCTION CARD */}
        <article className="flex flex-col gap-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Welcome to {destination.name}
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {destination.description} Explore our structured tabs above to find detailed historical chronologies, spoken languages, and weather patterns. Below, you'll find featured local landmarks and beaches!
        </p>
        </article>

      {/* SECTION 2: LANDMARKS AND BEACHES SHOWCASE */}
        {destination.attractions && destination.attractions.length > 0 && (
        <section className="flex flex-col gap-6" aria-label="Landmarks and beaches">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2">
            Featured Landmarks & Public Beaches
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.attractions.map((attr, idx) => (
                <Card key={idx} className="flex flex-col sm:flex-row h-full">
                
                {/* Visual Banner */}
                {attr.images && attr.images.length > 0 && (
                    <div className="sm:w-48 h-48 bg-slate-100 flex-shrink-0">
                    <img
                        src={attr.images[0]}
                        alt={`Scenic view of ${attr.name}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                    </div>
                )}
                
                {/* Attraction Info Details */}
                <div className="p-5 flex flex-col justify-between gap-3">
                    <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant="info">{attr.type}</Badge>
                        {attr.isChildrenFriendly && (
                        <Badge variant="success">Kid Friendly</Badge>
                        )}
                    </div>
                    
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {attr.name}
                    </h4>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {attr.description}
                    </p>
                    </div>

                  {/* Pricing guidelines */}
                    <div className="text-xs text-slate-400">
                    <p>🕒 Hours: {attr.openingHours}</p>
                    <p>💵 Ticket: {attr.priceAdult === 0 ? "FREE / Public" : `$${attr.priceAdult.toFixed(2)}`}</p>
                    <p className="text-primary font-medium mt-1">♿ Accessibility: {attr.accessibilityInfo}</p>
                    </div>
                </div>

                </Card>
            ))}
            </div>
        </section>
        )}

    </div>
    );
};

export default DestinationOverview;