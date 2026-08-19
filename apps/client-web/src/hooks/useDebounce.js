/**
 * ==============================================================================
 * ATTRAVOYA CUSTOM HOOKS - INPUT DEBOUNCE
 * ==============================================================================
 * Delays updating a value until a specified timer (delay) has completed.
 * This is crucial for our autocomplete search bar because it prevents sending
 * 15 expensive API requests to our server while the user is actively typing!
 * Instead, it waits until they pause typing for 300ms before querying the backend.
 */

import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
    // Start delay timer
    const handler = setTimeout(() => {
        setDebouncedValue(value);
    }, delay);

    // Clear timer if value changes (user is still typing!)
    return () => {
        clearTimeout(handler);
    };
    }, [value, delay]);

    return debouncedValue;
};

export default useDebounce;