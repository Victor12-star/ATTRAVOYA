/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - ACCESSIBLE BUTTON
 * ==============================================================================
 * A highly customizable atomic button.
 *
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Uses semantic HTML5 <button> tag to enable native browser keyboard focus.
 * 2. Employs "aria-busy" and "disabled" states during loading, announcing to
 *    screen-readers that a process is active.
 * 3. Enforces WCAG focus-visible rings for keyboard-only visitors.
 */

import React from "react";
import { Spinner } from "./Spinner.jsx";

export const Button = ({
    children,
    type = "button",
  variant = "primary", // "primary" | "secondary" | "danger" | "ghost"
  size = "md",         // "sm" | "md" | "lg"
    loading = false,
    disabled = false,
    onClick,
    ariaLabel,
    ...props
}) => {
  // Styles definitions mapped against standard Tailwind configurations
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
    primary: "bg-primary text-slate-950 hover:bg-sky-400 focus:ring-primary",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",
    ghost: "bg-transparent text-textLight dark:text-textDark hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-primary"
    };

    const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
    };

    return (
    <button
        type={type}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
        onClick={onClick}
        disabled={disabled || loading}
      aria-busy={loading} // Announces loading status to screen readers
      aria-label={ariaLabel} // Accessibility custom descriptor option
        {...props}
    >
        {loading && (
        <span className="mr-2" aria-hidden="true">
            <Spinner size="sm" />
        </span>
        )}
        {children}
    </button>
    );
};

export default Button;