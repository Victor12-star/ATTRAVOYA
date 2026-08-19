/**
 * ==============================================================================
 * ATTRAVOYA GLOBAL PRETTIER CONFIGURATION
 * ==============================================================================
 * Enforces a unified formatting style across the entire JavaScript codebase.
 */

export default {
  semi: true,                  // Append semicolons to the end of every statement
  trailingComma: "all",       // Add trailing commas where possible (arrays, objects)
  singleQuote: false,          // Use double quotes for strings
  printWidth: 100,             // Line wrap width threshold
  tabWidth: 2,                 // Consistent 2-space tab indentations
  useTabs: false,              // Use spaces instead of physical tab characters
  bracketSpacing: true,        // Spacing inside object literals: { foo: bar }
  arrowParens: "always",       // Always wrap arrow function parameters in parentheses: (x) => x
};
