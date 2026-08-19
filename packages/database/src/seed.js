/**
 * ==============================================================================
 * ATTRAVOYA DATABASE - PILOT DESTINATIONS SEED SCRIPT
 * ==============================================================================
 * This script is a database "Seeder". Its job is to pre-populate our PostgreSQL
 * tables with our beautiful pilot destinations: Paris, Tokyo, New York, and
 * our premium tropical beach destination: Honolulu, Hawaii!
 *
 * It establishes relational connections (like linking Waikiki Beach to Honolulu)
 * so that when our API starts, it already has deep, rich content ready to serve.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding process...");

  // 1. Clear existing database rows to prevent duplicate primary key errors during development
  console.log("🧹 Cleaning old database entries...");
  await prisma.auditLog.deleteMany({});
  await prisma.tripActivity.deleteMany({});
  await prisma.trip.deleteMany({});
  await prisma.savedItem.deleteMany({});
  await prisma.priceAlert.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.attraction.deleteMany({});
  await prisma.costOfLiving.deleteMany({});
  await prisma.weatherData.deleteMany({});
  await prisma.shoppingCentre.deleteMany({});
  await prisma.restaurant.deleteMany({});
  await prisma.transportation.deleteMany({});
  await prisma.taxiPrice.deleteMany({});
  await prisma.safetyAdvisory.deleteMany({});
  await prisma.travelPhrase.deleteMany({});
  await prisma.languageRelation.deleteMany({});
  await prisma.timelineItem.deleteMany({});
  await prisma.history.deleteMany({});
  await prisma.destination.deleteMany({});

  console.log("💾 Inserting pilot destinations...");

  // 2. Seed PARIS, FRANCE (Omitted for brevity - same as Batch B1)
  // ...

  // 3. Seed TOKYO, JAPAN (Omitted for brevity - same as Batch B1)
  // ...

  // 4. Seed HONOLULU, HAWAII (TROPICAL BEACH DESTINATION)
  console.log("🏖️ Seeding Honolulu Beach Destination...");
  await prisma.destination.create({
    data: {
      slug: "honolulu",
      name: "Honolulu",
      type: "CITY",
      airportCode: "HNL",
      latitude: 21.3069,
      longitude: -157.8583,
      description: "The tropical paradise capital of Hawaii, world-famous for its golden sand beaches, historic military sites, and beautiful volcanic craters.",
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      
      history: {
        create: {
          nameOrigin: "Honolulu means \"sheltered harbor\" or \"place of shelter\" in the native Hawaiian language.",
          summary: "Honolulu was a crucial central trade hub for Pacific sailors in the 19th century, eventually becoming the capital of the independent Hawaiian Kingdom before Hawaii was annexed by the United States.",
          extendedHtml: "<p>Honolulu rose to global prominence as a strategic whaling and sandalwood port. Today, it hosts the historic naval base at Pearl Harbor and welcomes millions of tourists to Waikiki Beach.</p>",
          sources: ["Hawaii Historical Society", "Bishop Museum Archives"]
        }
      },
      
      timeline: {
        create: [
          { year: "1794 AD", title: "First Foreign Vessel", description: "Captain William Brown of Great Britain sails the first foreign ship into Honolulu Harbor." },
          { year: "1845 AD", title: "Hawaiian Capital", description: "King Kamehameha III officially moves the royal capital of the Hawaiian Kingdom to Honolulu." },
          { year: "1941 AD", title: "Attack on Pearl Harbor", description: "A surprise military strike on Pearl Harbor thrusts the United States into World War II." }
        ]
      },
      
      languages: {
        create: [
          { languageName: "English", type: "OFFICIAL", proficiencyInfo: "Spoken universally. Hawaiian and Hawaiian Pidgin are also widely heard and valued locally." }
        ]
      },
      
      phrases: {
        create: [
          { englishPhrase: "Hello / Welcome", translation: "Aloha", pronunciation: "Ah-low-hah" },
          { englishPhrase: "Thank you", translation: "Mahalo", pronunciation: "Mah-hah-low" },
          { englishPhrase: "Family", translation: "Ohana", pronunciation: "Oh-hah-nah" }
        ]
      },
      
      safetyAdvisories: {
        create: [
          {
            severity: "LOW",
            headline: "Ocean Safety: Watch for Strong Undercurrents",
            description: "Hawaii beaches have powerful tides and sharp coral reefs that can be dangerous for inexperienced swimmers.",
            advice: "Always swim near a staffed lifeguard tower and never turn your back on the ocean.",
            source: "Hawaii Department of Land and Natural Resources",
            sourceUrl: "https://dlnr.hawaii.gov",
            publishedAt: new Date()
          }
        ]
      },
      
      taxiPrices: {
        create: {
          currency: "USD",
          startFare: 3.50,
          pricePerKm: 1.85,
          waitingFeePerHour: 32.00,
          airportToCenterFare: 45.00,
          centerToAirportFare: 45.00,
          bookingFee: 2.50,
          scamsWarning: "Only use official taxis waiting in designated airport queues. Decline unsolicited offers inside the baggage claim.",
          safetyAdvice: "Confirm that your taxi driver is using an official, active meter."
        }
      },
      
      transportOptions: {
        create: [
          {
            type: "BUS",
            title: "TheBus Oahu Transit",
            pricingDetails: "A single ride costs $3.00. A daily pass costs $7.50.",
            operatingHours: "04:30 AM to 12:30 AM daily.",
            paymentMethods: ["HOLO Card", "Cash"],
            accessibility: "All buses are 100% ADA compliant with mechanical wheelchair boarding ramps.",
            safetyAdvice: "Keep your HOLO card loaded. Buses do not give change for cash fares."
          }
        ]
      },
      
      restaurants: {
        create: [
          {
            name: "Duke's Waikiki",
            cuisine: ["Hawaiian", "Seafood"],
            priceRange: "$$$",
            averageCostMeal: 45.00,
            location: "Outrigger Waikiki Beach Resort",
            latitude: 21.2766,
            longitude: -157.8281,
            openingHours: "07:00 AM - 11:30 PM",
            isChildFriendly: true,
            hasChildrenMenu: true,
            accessibility: "Fully wheelchair accessible beachside patio."
          }
        ]
      },
      
      shoppingCentres: {
        create: [
          {
            name: "Ala Moana Center",
            type: "MALL",
            location: "1450 Ala Moana Blvd",
            latitude: 21.2911,
            longitude: -157.8431,
            openingHours: "10:00 AM - 08:00 PM",
            priceLevel: "MEDIUM",
            specialties: ["Surf shops", "Designer brands", "Local Hawaiian snacks"],
            safetyAdvice: "The mall is open-air; wear sunscreen and stay hydrated while shopping.",
            taxRefundInfo: "Tax refunds are not available for tourists in Hawaii."
          }
        ]
      },
      
      weatherData: {
        create: [
          { month: 1, avgTempHigh: 27.0, avgTempLow: 19.0, rainDays: 8, humidity: 65, bestToVisit: true, seasonType: "DRY" },
          { month: 7, avgTempHigh: 31.0, avgTempLow: 24.0, rainDays: 5, humidity: 62, bestToVisit: true, seasonType: "HOT" }
        ]
      },
      
      costOfLiving: {
        create: {
          hotelPriceAvg: 240.00,
          hostelPriceAvg: 55.00,
          groceryIndex: 104.5,
          restaurantPriceAvg: 24.00,
          publicTransportFare: 3.00,
          dailyBudgetBudget: 85.00,
          dailyBudgetMid: 210.00,
          dailyBudgetLuxury: 550.00
        }
      },
      
      attractions: {
        create: [
          {
            name: "Waikiki Beach",
            type: "NON_HISTORICAL", // Beach attraction!
            isChildrenFriendly: true,
            isAdultOnly: false,
            description: "One of the most famous beaches in the world, renowned for its calm golden-sand swimming shores and surf lesson schools.",
            latitude: 21.2766,
            longitude: -157.8281,
            images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"],
            openingHours: "24 Hours Open daily",
            priceAdult: 0.00, // Beach is completely free and public!
            priceChild: 0.00,
            priceFamily: 0.00,
            accessibilityInfo: "Matted sand pathways are available at select lifeguard stands for wheelchair rollers.",
            visitDuration: 4.0,
            bestTime: "Early morning or spectacular sunset hours",
            taxiEstimate: 10.00
          },
          {
            name: "Diamond Head State Monument",
            type: "HISTORICAL", // Volcanic crater landmark!
            isChildrenFriendly: true,
            isAdultOnly: false,
            description: "A spectacular historic volcanic tuff cone offering breath-taking panoramic views of the Honolulu shoreline.",
            latitude: 21.2631,
            longitude: -157.8083,
            images: ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"],
            builtBy: "Nature (Volcanic eruption)",
            builtDate: "300,000 years ago",
            openingHours: "06:00 AM - 04:00 PM (Requires reservations)",
            priceAdult: 5.00,
            priceChild: 0.00,
            priceFamily: 15.00,
            accessibilityInfo: "The lookouts are reached via a steep trail with stairs. Not fully wheelchair accessible.",
            visitDuration: 2.0,
            bestTime: "06:00 AM right at gates opening to beat the hot tropical sun",
            taxiEstimate: 15.00
          }
        ]
      }
    }
  });

  // 5. Seed ADMIN Account (Omitted for brevity - same as Batch B1)
  // ...
  console.log("✅ Seeding completed! Database is ready to travel!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });