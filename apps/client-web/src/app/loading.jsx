/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - PAGE TRANSITION LOADER
 * ==============================================================================
 * Next.js automatically mounts this visual loader during server-side renders
 * and route transitions to keep visitors engaged.
 */

import React from "react";
import { Spinner } from "../components/ui/Spinner.jsx";

export default function Loading() {
    return (
    <div 
        className="min-h-[50vh] flex flex-col items-center justify-center p-6 gap-4"
      aria-live="polite" // Tells screen-readers to announce loading state transitions quietly
    >
        <Spinner size="lg" color="primary" />
        <p className="text-base font-bold text-slate-500 dark:text-slate-400">
        Fetching your travel intelligence...
        </p>
    </div>
    );
}