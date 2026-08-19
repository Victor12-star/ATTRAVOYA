/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - ACCESSIBLE CHECKBOX
 * ==============================================================================
 * Standard form checkbox element with explicit ARIA-matched labels.
 */

import React, { useId } from "react";

export const Checkbox = ({
  label,
  checked,
  onChange,
  className = "",
  ...props
}) => {
  const checkboxId = useId();

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <input
        id={checkboxId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4.5 w-4.5 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary bg-white dark:bg-slate-900 cursor-pointer"
        {...props}
      />
      {label && (
        <label
          htmlFor={checkboxId}
          className="text-base font-medium text-textLight dark:text-textDark cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;