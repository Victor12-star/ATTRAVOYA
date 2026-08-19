/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - MOBILE DRAWER NAVIGATION
 * ==============================================================================
 * Collapsible vertical mobile navigation menu.
 */

"use client";

import React from "react";
import Link from "next/link";

export const MobileNavigation = ({ user, logout, closeMenu }) => {
  return (
    <nav className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col gap-4" aria-label="Mobile drawer navigation">
      <Link
        href="/destinations"
        onClick={closeMenu}
        className="text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-primary rounded"
      >
        Destinations
      </Link>
      <Link
        href="/flights"
        onClick={closeMenu}
        className="text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-primary rounded"
      >
        Flights
      </Link>
      <Link
        href="/stays"
        onClick={closeMenu}
        className="text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-primary rounded"
      >
        Stays
      </Link>

      <hr className="border-slate-200 dark:border-slate-800" />

      {user ? (
        <div className="flex flex-col gap-4">
          <Link
            href="/account"
            onClick={closeMenu}
            className="text-base font-bold text-primary rounded"
          >
            My Account (Dashboard)
          </Link>
          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
            className="text-left text-base font-bold text-red-500 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            onClick={closeMenu}
            className="text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-primary rounded"
          >
            Login
          </Link>
          <Link
            href="/register"
            onClick={closeMenu}
            className="w-full text-center py-2 text-base font-bold text-slate-950 bg-primary rounded-lg"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};