/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - ACCESSIBLE FORM INPUT
 * ==============================================================================
 * Standardized single-line form text field.
 *
 * ACCESSIBILITY (a11y) ACTIONS:
 * 1. Requires a "label" that is explicitly tied to the input "id" via "htmlFor",
 *    enabling screen readers to dictate the field's purpose.
 * 2. Employs "aria-invalid" and "aria-describedby" properties when error warnings
 *    exist, speaking form faults instantly to assistive readers.
 */

import React, { useId } from "react";

export const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = "",
  ...props
}) => {
  // Generates a unique, stable ID for matching input with its descriptive label
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <div className={`flex flex-col w-full gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-textLight dark:text-textDark"
        >
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error} // Tells screen readers if there is an input error
        aria-describedby={error ? errorId : undefined} // Links error message text to input focus
        className={`w-full px-3.5 py-2 text-base rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
        {...props}
      />

      {error && (
        <span
          id={errorId}
          role="alert" // Instantly speaks validation errors to visually impaired visitors
          className="text-sm font-medium text-red-500"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;