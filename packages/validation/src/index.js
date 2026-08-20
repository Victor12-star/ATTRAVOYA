/**
 * ==============================================================================
 * ATTRAVOYA SHARED VALIDATIONS - ENTRY POINT
 * ==============================================================================
 * Groups and exports all Zod validation schemas.
 */

import { RegisterSchema, LoginSchema } from "./auth.schema.js";
import { UserUpdateSchema } from "./user.schema.js";
import { DestinationSearchSchema } from "./destination.schema.js";
import { FlightSearchSchema } from "./flight.schema.js";
import { StaySearchSchema } from "./stay.schema.js";
import { AttractionQuerySchema } from "./attraction.schema.js";
import { TaxiEstimateSchema } from "./mobility.schema.js";
import { TripCreateSchema, TripActivitySchema } from "./trip.schema.js";
import { PaginationQuerySchema } from "./pagination.schema.js";

export {
  RegisterSchema,
  LoginSchema,
  UserUpdateSchema,
  DestinationSearchSchema,
  FlightSearchSchema,
  StaySearchSchema,
  AttractionQuerySchema,
  TaxiEstimateSchema,
  TripCreateSchema,
  TripActivitySchema,
  PaginationQuerySchema
};
