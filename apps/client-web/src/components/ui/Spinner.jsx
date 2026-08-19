/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - ACCESSIBLE LOADING SPINNER
 * ==============================================================================
 * Visual progress indicator equipped with ARIA roles so that assistive devices
 * announce loading transitions to disabled travelers.
 */

import React from "react";

export const Spinner = ({ size = "md", color = "current" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4"
  };

  const colors = {
    current: "border-current",
    primary: "border-primary",
    white: "border-white"
  };

  return (
    <div
      role="status" // Signals to assistive technologies that this is a status loading node
      className="inline-block"
    >
      <svg
        className={`animate-spin rounded-full border-t-transparent ${sizes[size]} ${colors[color]}`}
        viewBox="0 0 24 24"
        aria-hidden="true" // Hide raw rotating visual circle from screen-reader speech
      />
      <span className="sr-only">Loading...</span> {/* Read strictly by text-to-speech engine */}
    </div>
  );
};

export default Spinner;