/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - ACCESSIBLE EMPTY STATE
 * ==============================================================================
 * Renders an illustrative placeholder container when lists (like saved trips
 * or favorite hotels) are currently empty.
 *
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Employs descriptive headings so users navigating via assistive voice
 *    programs can understand what options are available.
 * 2. Focusable Call-to-Action (CTA) buttons to quickly reroute visitors to search.
 */

import React from "react";
import { Button } from "./Button.jsx";

export const EmptyState = ({
    icon = "🗺️",
    title = "No items found",
    description = "It looks like you haven't added any items here yet.",
    actionLabel,
    onActionClick
}) => {
    return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto gap-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/10">
      {/* Informative Icon (Hidden from screen-reader reading list) */}
        <span className="text-5xl mb-2" aria-hidden="true">
        {icon}
        </span>

        <h3 className="text-xl font-black text-slate-900 dark:text-white">
        {title}
        </h3>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {description}
        </p>

      {/* Focusable Call to Action Button */}
        {actionLabel && onActionClick && (
        <Button
            variant="primary"
            onClick={onActionClick}
            className="mt-2 text-sm px-5"
        >
            {actionLabel}
        </Button>
        )}
    </div>
    );
};

export default EmptyState;