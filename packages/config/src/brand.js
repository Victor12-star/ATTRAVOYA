/**
 * ==============================================================================
 * ATTRAVOYA CORE BRAND CONFIGURATION
 * ==============================================================================
 * This file centralizes our visual identity, logo assets, company contact data,
 * and legal document links. Changing values here automatically updates the
 * web client, mobile client, and API server!
 */

export const brandConfig = {
  // General Platform Branding
  appName: 'AttraVoya',
  slogan: 'Discover more. Travel smarter. Stay safer.',
  companyName: 'AttraVoya Travel Technologies Ltd.',
  logoUrl: 'https://assets.attravoya.com/logo.svg',
  logoDarkUrl: 'https://assets.attravoya.com/logo-dark.svg',
  iconUrl: 'https://assets.attravoya.com/icon.png',

  // Default regional focus settings
  defaultLanguage: 'en',
  defaultCurrency: 'USD',

  // Official Contact Details
  contact: {
    email: 'support@attravoya.com',
    phone: '+1-800-555-VOYA',
    address: '100 Travel Innovation Blvd, Suite 400, San Francisco, CA 94103'
  },

  // Official Social Media Channels
  socialLinks: {
    twitter: 'https://twitter.com/attravoya',
    facebook: 'https://facebook.com/attravoya',
    instagram: 'https://instagram.com/attravoya',
    linkedin: 'https://linkedin.com/company/attravoya'
  },

  // Universal relative page links
  legalLinks: {
    privacyPolicy: '/privacy',
    cookiePolicy: '/cookies',
    termsConditions: '/terms',
    accessibilityStatement: '/accessibility'
  },

  // Accessible Typography (WCAG AA Compliant)
  typography: {
    fontFamilySans:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontFamilyMono: 'ui-monospace, SFMono-Regular, Consolas, monospace',
    baseFontSize: '16px' // Baseline standard font size for optimum readability
  },

  // Global Standard Color Palettes
  globalColors: {
    primary: '#0EA5E9', // High-contrast vibrant sky blue
    secondary: '#0F172A', // Deep Slate Grey for backgrounds and borders
    lightBg: '#F8FAFC', // Off-White background for comfortable reading
    darkBg: '#0F172A', // Midnight Slate background for dark mode
    textLight: '#1E293B', // Deep dark charcoal text (High contrast for light mode)
    textDark: '#F1F5F9' // Soft pearl white text (High contrast for dark mode)
  },

  // Custom Visual Themes for specialized sections of the platform
  sectionThemes: {
    flights: {
      name: 'Flights & Sky Travel',
      colors: {
        primary: '#0284C7', // Sky blue
        secondary: '#0D9488', // Deep turquoise
        lightBg: '#F0F9FF', // Soft blue tint
        darkBg: '#075985' // Rich ocean navy
      }
    },
    hotels: {
      name: 'Hotels & Stays',
      colors: {
        primary: '#D97706', // Warm bronze gold
        secondary: '#FEF3C7', // Cream tint
        lightBg: '#FFFBEB', // Soft warm cream
        darkBg: '#78350F' // Deep gold brown
      }
    },
    family: {
      name: 'Family Travel & Eco-Data',
      colors: {
        primary: '#16A34A', // Lush Green
        secondary: '#DCFCE7', // Mint tint
        lightBg: '#F0FDF4', // Soft mint green
        darkBg: '#14532D' // Deep forest green
      }
    },
    safety: {
      name: 'Safety & Advisories',
      colors: {
        primary: '#1E3A8A', // Guard Navy Blue
        secondary: '#D97706', // Caution Amber
        lightBg: '#FEF2F2', // Soft warning red tint
        darkBg: '#7F1D1D' // Serious crimson red
      }
    },
    culture: {
      name: 'Culture, History & Attractions',
      colors: {
        primary: '#7C3AED', // Majestic purple
        secondary: '#F3E8FF', // Lavender tint
        lightBg: '#FAF5FF', // Pale violet tint
        darkBg: '#4C1D95' // Royal deep purple
      }
    },
    maps: {
      name: 'Maps & Transportation',
      colors: {
        primary: '#1E293B', // Deep asphalt slate
        secondary: '#475569', // Medium steel grey
        lightBg: '#F1F5F9', // Soft light highway grey
        darkBg: '#020617' // Deep midnight black
      }
    },
    dining: {
      name: 'Restaurants & Shopping',
      colors: {
        primary: '#EA580C', // Sunset Orange
        secondary: '#FFEDD5', // Peach cream
        lightBg: '#FFF7ED', // Soft morning sun glow
        darkBg: '#7C2D12' // Warm rust clay orange
      }
    }
  }
}
