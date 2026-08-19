import { brandConfig } from "@attravoya/config";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enables class-based dark mode toggling (Comfortable for travelers)
  theme: {
    extend: {
      colors: {
        // Enforces our centralized high-contrast accessible visual palette
        primary: brandConfig.globalColors.primary,
        secondary: brandConfig.globalColors.secondary,
        lightBg: brandConfig.globalColors.lightBg,
        darkBg: brandConfig.globalColors.darkBg,
        textLight: brandConfig.globalColors.textLight,
        textDark: brandConfig.globalColors.textDark,
        
        // Specialized Category colors requested by the design book
        flights: brandConfig.sectionThemes.flights.colors.primary,
        hotels: brandConfig.sectionThemes.hotels.colors.primary,
        family: brandConfig.sectionThemes.family.colors.primary,
        safety: brandConfig.sectionThemes.safety.colors.primary,
        culture: brandConfig.sectionThemes.culture.colors.primary,
        maps: brandConfig.sectionThemes.maps.colors.primary,
        dining: brandConfig.sectionThemes.dining.colors.primary,
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};