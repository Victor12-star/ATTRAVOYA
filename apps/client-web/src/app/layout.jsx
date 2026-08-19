/**
 * ==============================================================================
 * ATTRAVOYA WEB CLIENT - MASTER ROOT LAYOUT
 * ==============================================================================
 * This is the HTML envelope wrapping every single page on our Next.js website.
 * It is responsible for:
 * 1. Injecting global providers (ThemeProvider and AuthProvider).
 * 2. Enforcing high-contrast font settings.
 * 3. Enforcing accessible WCAG semantic wrappers (<header>, <main>, <footer>).
 */

"use client";

import React from "react";
import "./globals.css";

// Import global providers
import { ThemeProvider } from "../providers/ThemeProvider.jsx";
import { AuthProvider } from "../providers/AuthProvider.jsx";

// Import header and footer layouts
import { Header } from "../components/layout/Header.jsx";
import { Footer } from "../components/layout/Footer.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>AttraVoya — Discover more. Travel smarter. Stay safer.</title>
        <meta name="description" content="Secure and accessible travel discovery and comparison platform." />
        <link rel="icon" href="/brand/favicon.ico" />
      </head>
      
      {/* 
        Semantic a11y: Wrapping the entire body inside visual transitions.
        Standardizing custom focus outlines.
      */}
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            
            {/* Header Guard */}
            <Header />
            
            {/* 
              Semantic a11y: Using <main> tag so that page readers skip directly
              to core body coordinates instead of getting stuck in navigation menus.
            */}
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            
            {/* Footer Guard */}
            <Footer />
            
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}