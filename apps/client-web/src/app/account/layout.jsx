/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - ACCOUNT SUB-LAYOUT
 * ==============================================================================
 * Wraps all private traveler settings pages, rendering a clean account sidebar.
 * Protects pages from rendering until session loading completes.
 */

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth.js";
import { Spinner } from "../../components/ui/Spinner.jsx";

export default function AccountLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // If auth finishes loading and find no user is authenticated, redirect them to login
    if (!loading && !user) {
      router.push("/login?callbackUrl=/account/profile");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 gap-4">
        <Spinner size="lg" color="primary" />
        <p className="font-bold text-slate-500">Unlocking your dashboard session...</p>
      </div>
    );
  }

  // If session is validated, render dashboard wrapper
  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* 1. Account Sidebar navigation */}
          <aside className="w-full md:w-64 flex flex-col gap-2 flex-shrink-0" aria-label="Account Settings Menu">
            <div className="p-4 bg-slate-100 dark:bg-slate-800/40 rounded-2xl border border-slate-200/50 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Traveler Profile</p>
              <h2 className="text-base font-black text-slate-900 dark:text-white mt-1">{user.fullName}</h2>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>

            <nav className="flex flex-col gap-1 mt-4">
              <Link 
                href="/account/profile" 
                className="px-4 py-2.5 text-base font-semibold rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-primary outline-none"
              >
                👤 Profile Preferences
              </Link>
              <Link 
                href="/account/saved" 
                className="px-4 py-2.5 text-base font-semibold rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-primary outline-none"
              >
                ⭐ Saved Favorites
              </Link>
              <Link 
                href="/account/trips" 
                className="px-4 py-2.5 text-base font-semibold rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-primary outline-none"
              >
                🗓️ My Itineraries
              </Link>
              <Link 
                href="/account/security" 
                className="px-4 py-2.5 text-base font-semibold rounded-xl text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50 focus:ring-2 focus:ring-primary outline-none"
              >
                🔒 Account Security
              </Link>
            </nav>
          </aside>

          {/* 2. Sub-Page Content area */}
          <div className="flex-grow">
            {children}
          </div>

        </div>
      </div>
    );
  }

  return null;
}