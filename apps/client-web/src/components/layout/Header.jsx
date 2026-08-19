/**
 * ==============================================================================
 * ATTRAVOYA WEB COMPONENT - SECURE ACCESSIBLE HEADER
 * ==============================================================================
 * Semantic navigation header.
 * 
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Uses HTML5 <header> and <nav> semantic structures.
 * 2. Employs a focus-skipping link so keyboard-only travelers can bypass
 *    all menu loops and skip directly to main page text contents.
 * 3. Enforces high-contrast theme toggles.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth.js";
import { useTheme } from "../../hooks/useTheme.js";
import { brandConfig } from "@attravoya/config";
import { DesktopNavigation } from "./DesktopNavigation.jsx";
import { MobileNavigation } from "./MobileNavigation.jsx";

export const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 transition-colors duration-200">
      
      {/* 
        Semantic a11y: Skip-link bypass. Hidden visually, but appears when keyboard
        tab-key is clicked. Lets blind and disabled users jump directly to core contents.
      */}
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-50 px-4 py-2 bg-primary text-slate-950 font-bold rounded-lg transform -translate-y-24 focus:translate-y-0 transition-transform duration-200"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo and Name */}
        <Link href="/" className="flex items-center gap-2 focus:ring-2 focus:ring-primary rounded-lg p-1">
          {/* SVG Semantic Logo */}
          <svg
            className="h-8 w-8 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true" // Hide decorative icon from reader speech
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2.913M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            {brandConfig.appName}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <DesktopNavigation user={user} logout={logout} />

        {/* Accessibility Buttons (Theme Toggle and Mobile Menu Button) */}
        <div className="flex items-center gap-2">
          {/* Contrast-friendly Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "Dark Mode (midnight theme)" : "Light Mode (warm theme)"}`}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {theme === "light" ? (
              // Sun Icon
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m2.828-9.9a5 5 0 11-7.07 7.07 5 5 0 017.07-7.07z" />
              </svg>
            ) : (
              // Moon Icon
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Hamburger Menu (Appears strictly on small screens) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen} // Tells screen readers if menu drawer is open
            aria-label="Toggle mobile menu navigation"
            className="p-2 sm:hidden rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Slide Navigation */}
      {isMobileMenuOpen && (
        <MobileNavigation
          user={user}
          logout={logout}
          closeMenu={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};