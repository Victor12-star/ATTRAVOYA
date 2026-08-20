/**
 * ==============================================================================
 * SHARED VALIDATION SCHEMAS - AUTHENTICATION
 * ==============================================================================
 * Declares Zod schemas to validate email, password, and fullName formats.
 */

import { z } from "zod";

// 1. Schema for Client Register / Signup inputs
export const RegisterSchema = z.object({
  email: z
    .string({ required_error: "Email address is required." })
    .email({ message: "Please enter a valid email address (e.g. name@domain.com)." })
    .trim(),
    
  password: z
    .string({ required_error: "Password is required." })
    .min(6, { message: "Security check: Password must be at least 6 characters long." }),
    
  fullName: z
    .string({ required_error: "Full name is required." })
    .min(2, { message: "Name must be at least 2 characters long to be valid." })
    .trim(),
    
  homeCountry: z.string().optional(),
  homeCity: z.string().optional(),
});

// 2. Schema for Client Login inputs
export const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .trim(),
    
  password: z
    .string({ required_error: "Password is required." })
    .min(1, { message: "Password cannot be blank." }),
});
