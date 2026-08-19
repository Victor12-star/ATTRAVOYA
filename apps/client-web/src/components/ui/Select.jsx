/**
 * ==============================================================================
 * ATTRAVOYA COMPONENT - ACCESSIBLE DROP-DOWN SELECTOR
 * ==============================================================================
 * Semantic dropdown select element.
 */

import React, { useId } from 'react'

export const Select = ({
  label,
  value,
  onChange,
  options = [], // [{ value: 'USD', label: 'US Dollar' }]
  error,
  required = false,
  className = '',
  ...props
}) => {
  const selectId = useId()
  const errorId = `${selectId}-error`

  return (
    <div className={`flex flex-col w-full gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className='text-sm font-semibold text-textLight dark:text-textDark'
        >
          {label}{' '}
          {required && (
            <span className='text-red-500' aria-hidden='true'>
              *
            </span>
          )}
        </label>
      )}

      <select
        id={selectId}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full px-3.5 py-2.5 text-base rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
        {...props}
        >
        {options.map(opt => (
            <option key={opt.value} value={opt.value}>
            {opt.label}
            </option>
        ))}
        </select>

        {error && (
        <span
            id={errorId}
            role='alert'
            className='text-sm font-medium text-red-500'
        >
            {error}
        </span>
        )}
    </div>
    )
}

export default Select
