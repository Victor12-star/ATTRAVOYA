/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - WEATHER CLIMATE SEGMENT
 * ==============================================================================
 * Renders monthly high/low temperature indexes, humidity, rain averages, and
 * lists recommended seasonal travel times.
 */

import React from "react";
import { Badge } from "../ui/Badge.jsx";

export const WeatherSection = ({ destination }) => {
    const weather = destination.weatherData;

    const monthsMap = {
    1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
    7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"
    };

    return (
    <div className="flex flex-col gap-8">
        
      {/* SECTION 1: RECOMMENDATIONS */}
        <article className="flex flex-col gap-3">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Climate & Season Averages in {destination.name}
        </h2>
        <p className="text-base text-slate-500">
            Plan your packing list and select optimal travel times based on monthly high and low temperature averages.
        </p>
        </article>

      {/* SECTION 2: METRICS TABLES */}
        {weather && weather.length > 0 ? (
        <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse" aria-label="Monthly climate averages">
            <thead className="bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-500 dark:text-slate-300">
                <tr>
                <th className="p-4">Month</th>
                <th className="p-4">High Temp (°C)</th>
                <th className="p-4">Low Temp (°C)</th>
                <th className="p-4">Rainy Days</th>
                <th className="p-4">Humidity (%)</th>
                <th className="p-4 text-center">Best Visit Time</th>
                </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-base text-slate-700 dark:text-slate-200">
                {weather.map((wt, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4 font-bold">{monthsMap[wt.month]}</td>
                    <td className="p-4 font-semibold text-red-500">{wt.avgTempHigh}°C</td>
                    <td className="p-4 font-semibold text-blue-500">{wt.avgTempLow}°C</td>
                    <td className="p-4">{wt.rainDays} Days</td>
                    <td className="p-4">{wt.humidity}%</td>
                    <td className="p-4 text-center">
                    {wt.bestToVisit ? (
                        <Badge variant="success" className="bg-emerald-500/10 text-emerald-500">
                        Highly Recommended
                        </Badge>
                    ) : (
                        <Badge variant="default" className="text-slate-400 bg-slate-100">
                        Standard
                        </Badge>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        ) : (
        <p className="text-sm text-slate-400">Weather climate logs are currently loading.</p>
        )}

    </div>
    );
};