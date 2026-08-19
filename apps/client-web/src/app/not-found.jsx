/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - 404 PAGE NOT FOUND
 * ==============================================================================
 * Standard Next.js custom fallback page returned when a requested relative url
 * does not exist on our website.
 */

import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto gap-5">
        <div className="p-4 bg-sky-100 dark:bg-sky-950/20 text-primary rounded-full" aria-hidden="true">
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        </div>

        <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
        404 — Page Not Found
        </h1>

        <p className="text-base text-slate-500 dark:text-slate-400">
        We can't seem to find the travel guide or page you are looking for. It might have been moved or is currently being explored by our team.
        </p>

        <Link
        href="/"
        className="px-5 py-2.5 bg-primary text-slate-950 font-bold rounded-xl hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
        >
        Return to Home Search
        </Link>
    </div>
    );
}