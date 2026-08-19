/**
 * ==============================================================================
 * ATTRAVOYA GLOBAL ESLINT CONFIGURATION
 * ==============================================================================
 * Establishes standard linting rules to enforce clean, bug-free JavaScript.
 */

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/.expo/**"
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": "warn",      // Warn on declared but unused variables
      "no-console": "off",           // Allow consoles for seeder and logger scripts
      "semi": ["error", "always"],   // Enforce semicolons
      "quotes": ["error", "double"]  // Enforce double quotes
    }
  }
];
