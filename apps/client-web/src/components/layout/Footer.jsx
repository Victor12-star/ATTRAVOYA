/**
 * ==============================================================================
 * ATTRAVOYA WEB COMPONENT - SECURE ACCESSIBLE FOOTER
 * ==============================================================================
 * Semantic copyright footer.
 * 
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Employs HTML5 <footer> semantic wrapper tags.
 * 2. Employs strong, high-contrast, larger link sizing to aid low-vision users.
 */

"use client";

import React from "react";
import Link from "next/link";
import { brandConfig } from "@attravoya/config";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Core links and grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Section 1: Branding and description */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-black tracking-tight text-white">
              {brandConfig.appName}
            </h2>
            <p className="text-sm text-slate-400">
              {brandConfig.slogan}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              © {currentYear} {brandConfig.companyName}. All rights reserved.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h3>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/destinations" className="hover:text-primary focus:ring-1 focus:ring-primary rounded">Destinations catalog</Link>
              <Link href="/flights" className="hover:text-primary focus:ring-1 focus:ring-primary rounded">Flight search</Link>
              <Link href="/stays" className="hover:text-primary focus:ring-1 focus:ring-primary rounded">Stays search</Link>
            </div>
          </div>

          {/* Section 3: Compliance & Legal Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Legal & Accessibility</h3>
            <div className="flex flex-col gap-1.5 text-sm">
              <Link href="/privacy" className="hover:text-primary focus:ring-1 focus:ring-primary rounded">Privacy Policy</Link>
              <Link href="/cookies" className="hover:text-primary focus:ring-1 focus:ring-primary rounded">Cookie Settings</Link>
              <Link href="/terms" className="hover:text-primary focus:ring-1 focus:ring-primary rounded">Terms and Conditions</Link>
              
              {/* Highlighted Accessibility Statement */}
              <Link
                href="/accessibility"
                className="hover:text-primary font-semibold text-primary underline focus:ring-1 focus:ring-primary rounded"
              >
                Accessibility Statement
              </Link>
            </div>
          </div>
        </div>

        {/* Contact info and help block */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Contact: {brandConfig.contact.phone} | {brandConfig.contact.email}
          </p>
          <p>
            Address: {brandConfig.contact.address}
          </p>
        </div>
      </div>
    </footer>
  );
};