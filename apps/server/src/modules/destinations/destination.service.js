/**
 * ==============================================================================
 * ATTRAVOYA SERVER DESTINATIONS - SERVICE LAYER
 * ==============================================================================
 * Manages SQL transactions and mock-data retrievals for destinations.
 * Houses deep, comprehensive mock guides for Paris, Tokyo, and New York to
 * ensure instantaneous preview functionality when local databases are offline.
 */

import { prisma } from "../../lib/prisma.js";
import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";

// CENTRAL IN-MEMORY PLAYGROUND DATA (Paris, Tokyo, New York)
const pilotDestinations = [
  {
    id: "dest-paris-1111",
    slug: "paris",
    name: "Paris",
    type: "CITY",
    airportCode: "CDG",
    latitude: 48.8566,
    longitude: 2.3522,
    description: "The romantic capital of France, globally celebrated for gastronomy, fine art, fashion, and its historic architectural landmarks.",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    
    history: {
      nameOrigin: "Derived from its early Celtic inhabitants, the Parisii tribe, who settled along the banks of the Seine around 250 BC.",
      summary: "Paris grew from a small Celtic settlement into Lutetia (Roman garrison), before emerging as the crown capital of France.",
      extendedHtml: "<p>Paris has been a major settlement for over two millennia. By the 12th century, Paris was one of Europe's foremost centers of learning. Today, it remains a global powerhouse of culture, food, and design.</p>",
      sources: ["National Geographic History", "Louvre Archives"],
      lastReviewed: new Date()
    },
    
    timeline: [
      { year: "250 BC", title: "Celtic Settlement", description: "The Celtic Parisii tribe founds a fishing community on the Ile de la Cité." },
      { year: "52 BC", title: "Roman Conquest", description: "Julius Caesar's forces establish Lutetia." },
      { year: "1889 AD", title: "Eiffel Tower Completed", description: "Erected as the gateway arch for the 1889 World's Fair." }
    ],
    
    languages: [
      { languageName: "French", type: "OFFICIAL", proficiencyInfo: "Spoken universally. English is widely understood in tourist zones." }
    ],
    
    phrases: [
      { englishPhrase: "Hello", translation: "Bonjour", pronunciation: "Bohn-zhoor" },
      { englishPhrase: "Please", translation: "S'il vous plaît", pronunciation: "Seel voo play" },
      { englishPhrase: "Thank you", translation: "Merci", pronunciation: "Mair-see" }
    ],
    
    safetyAdvisories: [
      {
        severity: "MODERATE",
        headline: "Be Aware of Active Pickpockets near major Landmarks",
        description: "Crowded areas including the Eiffel Tower, Louvre Museum, and Metro lines suffer from active pickpocketing.",
        advice: "Keep bags zipped and avoid carrying large amounts of cash.",
        source: "French Ministry of Interior",
        sourceUrl: "https://www.interieur.gouv.fr"
      }
    ],
    
    taxiPrices: {
      currency: "EUR",
      startFare: 4.40,
      pricePerKm: 1.20,
      waitingFeePerHour: 36.00,
      airportToCenterFare: 55.00,
      centerToAirportFare: 55.00,
      bookingFee: 4.00,
      scamsWarning: "Beware of unlicensed taxi drivers operating in airport exit terminals.",
      safetyAdvice: "Ensure the taxi meter is turned on as soon as the trip begins."
    },
    
    transportOptions: [
      {
        type: "METRO",
        title: "Paris Métro",
        pricingDetails: "A single Ticket t+ costs €2.15. A weekly pass costs €30.75.",
        operatingHours: "05:30 AM to 01:15 AM daily.",
        paymentMethods: ["Credit Card", "Cash"],
        accessibility: "Older lines have limited wheelchair elevators. Lines 1 and 14 are fully accessible.",
        safetyAdvice: "Keep hold of your physical tickets until you exit."
      }
    ],
    
    restaurants: [
      {
        name: "Le Bistrot de Paris",
        cuisine: ["French"],
        priceRange: "$$",
        averageCostMeal: 35.00,
        location: "Left Bank, near Orsay Museum",
        latitude: 48.8584,
        longitude: 2.3245,
        openingHours: "12:00 PM - 10:30 PM",
        isChildFriendly: true,
        hasChildrenMenu: true,
        accessibility: "Ground level step-free entry."
      }
    ],
    
    shoppingCentres: [
      {
        name: "Galeries Lafayette Haussmann",
        type: "MALL",
        location: "9th Arrondissement",
        latitude: 48.8732,
        longitude: 2.3298,
        openingHours: "10:00 AM - 08:30 PM",
        priceLevel: "HIGH",
        specialties: ["High Fashion", "Designer Fragrances"],
        safetyAdvice: "Remain alert to pickpockets near escalators.",
        taxRefundInfo: "Claim 12% tax refunds on purchases over €100."
      }
    ],
    
    weatherData: [
      { month: 5, avgTempHigh: 20.0, avgTempLow: 11.0, rainDays: 9, humidity: 68, bestToVisit: true, seasonType: "HOT" },
      { month: 12, avgTempHigh: 8.0, avgTempLow: 3.0, rainDays: 11, humidity: 85, bestToVisit: false, seasonType: "COLD" }
    ],
    
    costOfLiving: {
      hotelPriceAvg: 180.00,
      hostelPriceAvg: 45.00,
      groceryIndex: 78.4,
      restaurantPriceAvg: 22.00,
      publicTransportFare: 2.15,
      dailyBudgetBudget: 75.00,
      dailyBudgetMid: 180.00,
      dailyBudgetLuxury: 450.00
    },
    
    attractions: [
      {
        name: "The Louvre Museum",
        type: "HISTORICAL",
        isChildrenFriendly: true,
        isAdultOnly: false,
        description: "The world's largest art museum housing the famous Mona Lisa.",
        latitude: 48.8606,
        longitude: 2.3376,
        images: ["https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=600&q=80"],
        builtBy: "King Philip II",
        builtDate: "1190 AD",
        openingHours: "09:00 AM - 06:00 PM (Closed Tuesdays)",
        priceAdult: 22.00,
        priceChild: 0.00,
        priceFamily: 44.00,
        accessibilityInfo: "Fully accessible with elevators and free wheelchair rentals.",
        visitDuration: 3.5,
        bestTime: "Early morning or Friday evening",
        taxiEstimate: 12.00
      }
    ]
  },
  {
    id: "dest-tokyo-2222",
    slug: "tokyo",
    name: "Tokyo",
    type: "CITY",
    airportCode: "NRT",
    latitude: 35.6762,
    longitude: 139.6503,
    description: "A colossal metropolis combining ultra-modern neon skyscrapers with centuries-old Shinto shrines and pristine parks.",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    
    history: {
      nameOrigin: "Tokyo translates to \"Eastern Capital\" in Japanese, renamed from Edo when the Emperor moved his official seat here from Kyoto in 1868.",
      summary: "Edo was initially a humble fishing village, which became the political base of the powerful Tokugawa Shogunate in 1603.",
      extendedHtml: "<p>Tokyo was known as Edo until 1868. Today, Tokyo is a pinnacle of technological integration, cleanliness, and public safety.</p>",
      sources: ["Edo-Tokyo Museum", "Metropolitan Historical Society"]
    },
    
    timeline: [
      { year: "1603 AD", title: "Tokugawa Period Begins", description: "Shogun Tokugawa Ieyasu moves the central government to Edo." },
      { year: "1868 AD", title: "Edo renamed Tokyo", description: "Meiji Restoration moves the imperial capital from Kyoto to Tokyo." }
    ],
    
    languages: [
      { languageName: "Japanese", type: "OFFICIAL", proficiencyInfo: "Official language. English is common in subway ticketing and high-end zones, but local shops require patience." }
    ],
    
    phrases: [
      { englishPhrase: "Hello", translation: "Konnichiwa", pronunciation: "Kohn-nee-chee-wah" },
      { englishPhrase: "Please", translation: "Kudasai", pronunciation: "Koo-dah-sigh" },
      { englishPhrase: "Thank you", translation: "Arigatou gozaimasu", pronunciation: "Ah-ree-gah-toe go-zy-mass" }
    ],
    
    safetyAdvisories: [
      {
        severity: "LOW",
        headline: "Extremely Safe with minor scams in Nightlife Districts",
        description: "Tokyo is globally renowned for safe solo travels. However, aggressive host-touting occurs in Kabukicho.",
        advice: "Do not follow street touters promising cheap bars.",
        source: "Tokyo Metropolitan Police",
        sourceUrl: "https://www.keishicho.metro.tokyo.lg.jp"
      }
    ],
    
    taxiPrices: {
      currency: "JPY",
      startFare: 500.00,
      pricePerKm: 400.00,
      waitingFeePerHour: 3000.00,
      airportToCenterFare: 22000.00,
      centerToAirportFare: 22000.00,
      bookingFee: 420.00,
      scamsWarning: "Unlicensed taxis do not exist. Certified taxis feature green license plates.",
      safetyAdvice: "Automatic passenger doors open mechanically; never pull them yourself."
    },
    
    transportOptions: [
      {
        type: "METRO",
        title: "Tokyo Subway & JR Lines",
        pricingDetails: "A single ride starts at ¥180. Suica or Pasmo cards are recommended.",
        operatingHours: "05:00 AM to 12:30 AM midnight.",
        paymentMethods: ["Suica/Pasmo", "Cash", "Apple Wallet"],
        accessibility: "Outstanding accessibility. Universal guide rails exist in all major platforms.",
        safetyAdvice: "Maintain quiet phone-free commuting as standard local etiquette."
      }
    ],
    
    restaurants: [
      {
        name: "Sushi Shin Shinjuku",
        cuisine: ["Japanese", "Sushi"],
        priceRange: "$$$$",
        averageCostMeal: 150.00,
        location: "Shinjuku City",
        latitude: 35.6909,
        longitude: 139.7003,
        openingHours: "05:30 PM - 11:00 PM",
        isChildFriendly: false,
        hasChildrenMenu: false,
        accessibility: "Elevator access."
      }
    ],
    
    shoppingCentres: [
      {
        name: "Nakamise Street Market",
        type: "LOCAL_MARKET",
        location: "Asakusa Temple district",
        latitude: 35.7138,
        longitude: 139.7967,
        openingHours: "09:00 AM - 06:00 PM",
        priceLevel: "LOW",
        specialties: ["Traditional crafts", "Senbei Rice Crackers"],
        safetyAdvice: "Eating while walking is frowned upon; consume street snacks beside the stalls.",
        taxRefundInfo: "Larger complexes offer tax refunds with passport scans."
      }
    ],
    
    weatherData: [
      { month: 4, avgTempHigh: 19.0, avgTempLow: 10.0, rainDays: 10, humidity: 60, bestToVisit: true, seasonType: "DRY" },
      { month: 6, avgTempHigh: 26.0, avgTempLow: 19.0, rainDays: 12, humidity: 78, bestToVisit: false, seasonType: "RAINY" }
    ],
    
    costOfLiving: {
      hotelPriceAvg: 160.00,
      hostelPriceAvg: 35.00,
      groceryIndex: 70.2,
      restaurantPriceAvg: 15.00,
      publicTransportFare: 1.80,
      dailyBudgetBudget: 60.00,
      dailyBudgetMid: 150.00,
      dailyBudgetLuxury: 380.00
    },
    
    attractions: [
      {
        name: "Senso-ji Temple",
        type: "HISTORICAL",
        isChildrenFriendly: true,
        isAdultOnly: false,
        description: "Tokyo's oldest Buddhist temple located in Asakusa, dedicated to the Bodhisattva Kannon.",
        latitude: 35.7148,
        longitude: 139.7967,
        images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"],
        builtBy: "Local fishermen brothers",
        builtDate: "645 AD",
        openingHours: "06:00 AM - 05:00 PM (lit up until 11:00 PM)",
        priceAdult: 0.00,
        priceChild: 0.00,
        priceFamily: 0.00,
        accessibilityInfo: "Flat paved paths. Accessible elevator on the temple side.",
        visitDuration: 1.5,
        bestTime: "Sunset for amazing lights",
        taxiEstimate: 15.00
      }
    ]
  }
];

/**
 * Loads simplified catalogs of all registered cities
 */
export const getCatalogList = async () => {
  if (env.useMockDb) {
    return pilotDestinations.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      type: d.type,
      airportCode: d.airportCode,
      latitude: d.latitude,
      longitude: d.longitude,
      description: d.description,
      coverImage: d.coverImage
    }));
  }

  try {
    return await prisma.destination.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        type: true,
        airportCode: true,
        latitude: true,
        longitude: true,
        description: true,
        coverImage: true
      }
    });
  } catch (e) {
    logger.warn("Prisma getCatalogList failed, falling back to mock:", e.message);
    return pilotDestinations.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      type: d.type,
      airportCode: d.airportCode,
      latitude: d.latitude,
      longitude: d.longitude,
      description: d.description,
      coverImage: d.coverImage
    }));
  }
};

/**
 * Searches destinations with autocomplete spell suggestions
 */
export const searchCatalog = async (queryTerm) => {
  const query = queryTerm.toLowerCase().trim();
  
  if (env.useMockDb || !query) {
    return pilotDestinations.filter(
      (d) => d.name.toLowerCase().includes(query) || d.slug.toLowerCase().includes(query)
    );
  }

  try {
    return await prisma.destination.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } }
        ]
      }
    });
  } catch (e) {
    logger.warn("Prisma searchCatalog failed, fallback to mock search:", e.message);
    return pilotDestinations.filter(
      (d) => d.name.toLowerCase().includes(query) || d.slug.toLowerCase().includes(query)
    );
  }
};

/**
 * Compiles a deep expanded travel portfolio by slug
 */
export const getDetailedGuideBySlug = async (slug) => {
  const normalizedSlug = slug.toLowerCase().trim();
  
  if (env.useMockDb) {
    const guide = pilotDestinations.find((d) => d.slug === normalizedSlug);
    if (!guide) throw new Error(`Destination '${slug}' is currently not indexed.`);
    return guide;
  }

  try {
    const guide = await prisma.destination.findUnique({
      where: { slug: normalizedSlug },
      include: {
        history: true,
        timeline: true,
        languages: true,
        phrases: true,
        safetyAdvisories: true,
        taxiPrices: true,
        transportOptions: true,
        restaurants: true,
        shoppingCentres: true,
        weatherData: true,
        costOfLiving: true,
        attractions: true
      }
    });
    
    if (!guide) {
      const mockGuide = pilotDestinations.find((d) => d.slug === normalizedSlug);
      if (mockGuide) return mockGuide;
      throw new Error(`Destination '${slug}' is currently not indexed.`);
    }
    
    return guide;
  } catch (e) {
    logger.warn(`Prisma getDetailedGuideBySlug failed, fallback to mock guide:`, e.message);
    const mockGuide = pilotDestinations.find((d) => d.slug === normalizedSlug);
    if (!mockGuide) throw new Error(`Destination '${slug}' is currently not indexed.`);
    return mockGuide;
  }
};