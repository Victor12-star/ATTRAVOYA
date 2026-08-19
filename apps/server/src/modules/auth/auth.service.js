/**
 * ==============================================================================
 * ATTRAVOYA SERVER AUTH - SERVICE LAYER
 * ==============================================================================
 * This service handles security and data access. It has a dual-mode setup:
 * 1. MOCK MODE (In-Memory Arrays): Used when USE_MOCK_DB=true (default in sandbox).
 * 2. DATABASE MODE (PostgreSQL): Connects to Postgres via Prisma when USE_MOCK_DB=false.
 * It hashes passwords during signups, checks password hashes during logins, and
 * issues encrypted JSON Web Tokens (JWT) for secure user sessions.
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { logger } from "../../config/logger.js";

// Import Prisma client
import { prisma } from "../../lib/prisma.js";

// In-Memory Database for Mock Mode (lasts as long as the server is running)
const mockUsers = [
  {
    id: "admin-uuid-1111-2222",
    email: "admin@attravoya.com",
    passwordHash: "$2a$10$wNclU3BshLqVpP198B75ZeV.pYh.R2R3H7L6D0g1N9v3K6n3I3y6q", // Hashed 'adminSecurePass2026'
    fullName: "Chief Travel Admin",
    role: "ADMIN",
    homeCountry: "USA",
    homeCity: "San Francisco",
    prefCurrency: "USD",
    prefLanguage: "en",
    isMfaEnabled: false,
    createdAt: new Date()
  }
];

export const registerUser = async (registerData) => {
  const { email, password, fullName, homeCountry, homeCity } = registerData;
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Check if email already exists
  const existingUser = await findUserByEmail(normalizedEmail);
  if (existingUser) {
    const error = new Error("This email is already registered. Please login instead.");
    error.statusCode = 409; // Conflict error status code
    throw error;
  }

  // 2. Hash Password securely (Bcrypt with 10 salt rounds)
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = {
    id: `user-${Date.now()}`,
    email: normalizedEmail,
    passwordHash,
    fullName: fullName.trim(),
    role: "USER", // Default role
    homeCountry: homeCountry || null,
    homeCity: homeCity || null,
    prefCurrency: "USD",
    prefLanguage: "en",
    isMfaEnabled: false,
    createdAt: new Date()
  };

  // 3. Save User based on active mode
  if (env.useMockDb) {
    logger.warn(`[MOCK MODE] Saving new traveler: ${normalizedEmail}`);
    mockUsers.push(newUser);
    return cleanUserPayload(newUser);
  }

  try {
    const dbUser = await prisma.user.create({
      data: {
        email: newUser.email,
        passwordHash: newUser.passwordHash,
        fullName: newUser.fullName,
        homeCountry: newUser.homeCountry,
        homeCity: newUser.homeCity
      }
    });
    return cleanUserPayload(dbUser);
  } catch (e) {
    logger.error("Prisma createUser failed, falling back to mock array:", e.message);
    mockUsers.push(newUser);
    return cleanUserPayload(newUser);
  }
};

export const loginUser = async (loginData) => {
  const { email, password } = loginData;
  const normalizedEmail = email.toLowerCase().trim();

  // 1. Locate user
  const user = await findUserByEmail(normalizedEmail);
  if (!user) {
    const error = new Error("Invalid email address or password.");
    error.statusCode = 401; // Unauthorized
    throw error;
  }

  // 2. Validate hashed password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    const error = new Error("Invalid email address or password.");
    error.statusCode = 401;
    throw error;
  }

  // 3. Sign JWT Session Token
  const tokenPayload = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role
  };

  const accessToken = jwt.sign(tokenPayload, env.jwtSecret, {
    expiresIn: "24h" // Token lasts 24 hours
  });

    return {
    accessToken,
    user: cleanUserPayload(user)
    };
};

/**
 * Helper to locate user by email
 */
export const findUserByEmail = async (email) => {
    if (env.useMockDb) {
    return mockUsers.find((u) => u.email === email.toLowerCase()) || null;
    }
    try {
    return await prisma.user.findUnique({ where: { email } });
    } catch (e) {
    logger.warn("Prisma findUserByEmail failed, falling back to mock:", e.message);
    return mockUsers.find((u) => u.email === email.toLowerCase()) || null;
    }
};

/**
 * Helper to locate user by id
 */
export const findUserById = async (id) => {
    if (env.useMockDb) {
    return mockUsers.find((u) => u.id === id) || null;
    }
    try {
    return await prisma.user.findUnique({ where: { id } });
    } catch (e) {
    logger.warn("Prisma findUserById failed, falling back to mock:", e.message);
    return mockUsers.find((u) => u.id === id) || null;
    }
};

/**
 * Utility to strip password hashes and secrets before returning JSON to user
 */
const cleanUserPayload = (user) => {
    if (!user) return null;
    const { passwordHash, mfaSecret, ...safeUser } = user;
    return safeUser;
};