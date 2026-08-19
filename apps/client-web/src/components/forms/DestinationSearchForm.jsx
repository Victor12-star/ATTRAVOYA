/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - AUTOCOMPLETE SEARCH
 * ==============================================================================
 * Interactive autocomplete search panel.
 *
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Employs "aria-expanded" and "aria-autocomplete" to inform screen readers
 *    that a dropdown list is available.
 * 2. Implements standard "Keyboard Navigation" (Up/Down arrow keys to browse
 *    cities, Enter key to select, and Escape to close), making it fully usable
 *    for blind and motor-disabled users.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../../lib/api-client.js";
import { useDebounce } from "../../hooks/useDebounce.js";

export const DestinationSearchForm = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  
  const debouncedSearch = useDebounce(searchTerm, 300);
  const dropdownRef = useRef(null);

  // 1. Fetch autocomplete suggestions from our Express backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearch.trim()) {
        setSuggestions([]);
        return;
      }
      
      setLoading(true);
      try {
        const response = await apiClient.get(`/destinations/search?query=${debouncedSearch}`);
        if (response.success && response.results) {
          setSuggestions(response.results);
        }
      } catch (e) {
        console.warn("Autocomplete lookup failed:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  // 2. Click outside handler to close dropdown list
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Accessibility Keyboard Navigation handlers
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (dest) => {
    setSearchTerm("");
    setIsOpen(false);
    // Direct routing to the custom city dynamic tabbed hub!
    router.push(`/destinations/${dest.slug}`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      {/* Search Input Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search country, city, airport, beach..."
          aria-expanded={isOpen && suggestions.length > 0}
          aria-autocomplete="list" // Dictates that a suggestion list is linked
          className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        
        {/* Search Icon (Decorative) */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" aria-hidden="true">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown Suggestions Panel */}
      {isOpen && suggestions.length > 0 && (
        <ul
          role="listbox" // Declares a list selection context
          aria-label="Travel destination suggestions"
          className="absolute left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl max-h-72 overflow-y-auto"
        >
          {suggestions.map((dest, idx) => (
            <li
              key={dest.id}
              role="option"
              aria-selected={idx === activeIndex} // Speaks active selection row
              onClick={() => handleSelect(dest)}
              className={`px-5 py-3 flex items-center justify-between cursor-pointer border-b border-slate-50 dark:border-slate-800/50 transition-colors ${
                idx === activeIndex
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-textLight dark:text-textDark"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Section Specific Tag Emojis */}
                <span className="text-xl" aria-hidden="true">
                  {dest.slug === "honolulu" || dest.slug === "barcelona" || dest.slug === "rio-de-janeiro" || dest.slug === "cape-town" ? "🏖️" : "🏙️"}
                </span>
                <div>
                  <span className="font-bold text-base">{dest.name}</span>
                  <span className="text-xs text-slate-400 block">{dest.description.substring(0, 60)}...</span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {dest.airportCode}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationSearchForm;