/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - BADGE LABEL
 * ==============================================================================
 * Styled highlight tags (such as safety levels, direct flight markers).
 */

import React from "react";

export const Badge = ({
  children,
  variant = "default", // "default" | "success" | "warning" | "danger" | "info"
  className = ""
}) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider";
  
  const variants = {
    default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    info: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;