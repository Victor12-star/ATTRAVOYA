/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - DESKTOP MENU NAVIGATION
 * ==============================================================================
 * Inline desktop nav link bar.
 */

"use client";

import React from "react";
import Link from "next/link";

export const DesktopNavigation = ({ user, logout }) => {
  return (
    <nav className="hidden sm:flex items-center gap-6" aria-label="Desktop principal navigation">
      {/* Search hub pages */}
      <Link href="/destinations" className="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white rounded-md p-1 focus:ring-2 focus:ring-primary">
        Destinations
      </Link>
      <Link href="/flights" className="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white rounded-md p-1 focus:ring-2 focus:ring-primary">
        Flights
      </Link>
      <Link href="/stays" className="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white rounded-md p-1 focus:ring-2 focus:ring-primary">
        Stays
      </Link>

      {/* Session dependent routes */}
      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/account" className="text-sm font-bold text-primary hover:underline rounded-md p-1 focus:ring-2 focus:ring-primary">
            Hi, {user.fullName.split(" ")[0]}
          </Link>
          <button
            onClick={logout}
            className="text-sm font-bold text-red-500 hover:text-red-400 rounded-md p-1 focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white rounded-md p-1 focus:ring-2 focus:ring-primary">
            Login
          </Link>
          <Link href="/register" className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-bold text-slate-950 bg-primary hover:bg-sky-400 rounded-lg focus:ring-2 focus:ring-primary">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};