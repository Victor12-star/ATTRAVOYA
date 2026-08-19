/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - ACCESSIBLE UI CARD
 * ==============================================================================
 * Content container card. Enables assistive readers to distinguish
 * isolated grid elements.
 */

import React from "react";

export const Card = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200";
  
  // If clickable, wrap inside semantic card boundaries
  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0} // Allows keyboard navigation focusing
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={`${baseStyles} cursor-pointer focus:ring-2 focus:ring-primary ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <article className={`${baseStyles} ${className}`} {...props}>
      {children}
    </article>
  );
};

export default Card;