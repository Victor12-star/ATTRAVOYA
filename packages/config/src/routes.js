/**
 * ==============================================================================
 * ATTRAVOYA GLOBAL ROUTE MAPS
 * ==============================================================================
 * Central directory of all web pages and backend endpoint URLs. This blocks
 * dead-ends and broken link requests from occurring in the monorepo.
 */

export const SYSTEM_ROUTES = {
  // Web application URL links (Relative paths)
  web: {
    home: "/",
    destinations: "/destinations",
    destinationDetail: (slug) => `/destinations/${slug}`,
    flights: "/flights",
    stays: "/stays",
    attractions: "/attractions",
    attractionDetail: (slug) => `/attractions/${slug}`,
    safety: "/safety",
    transportation: "/transportation",
    taxiPrices: "/taxi-prices",
    restaurants: "/restaurants",
    shopping: "/shopping",
    costOfLiving: "/cost-of-living",
    tripPlanner: "/trip-planner",
    news: "/news",
    faq: "/faq",
    about: "/about",
    contact: "/contact",
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    
    // Account Dashboard Routes
    account: "/account",
    profile: "/account/profile",
    saved: "/account/saved",
    trips: "/account/trips",
    tripDetail: (tripId) => `/account/trips/${tripId}`,
    alerts: "/account/alerts",
    security: "/account/security",
    
    // Administrator Routes
    admin: "/admin",
    adminDestinations: "/admin/destinations",
    adminAttractions: "/admin/attractions",
    adminContent: "/admin/content",
    adminSafety: "/admin/safety",
    adminProviders: "/admin/providers",
    adminUsers: "/admin/users",
    adminSettings: "/admin/settings"
  },
  
  // Backend Express server endpoint URLs
  api: {
    health: "/health",
    auth: {
      register: "/auth/register",
      login: "/auth/login",
      logout: "/auth/logout"
    },
    users: {
      profile: "/users/profile",
      update: "/users/update"
    },
    destinations: {
      base: "/destinations",
      search: "/destinations/search",
      detail: (slug) => `/destinations/${slug}`
    },
    trips: {
      base: "/trips",
      detail: (id) => `/trips/${id}`
    }
  }
};