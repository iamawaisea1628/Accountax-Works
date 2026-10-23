import { z } from "zod";
import { serviceSchema, countryServiceSchema } from "./schema";

// Intentionally empty. Individual services and country-service records are added
// only after the owner confirms the service is delivered (and, per country, permitted).
export const services = z.array(serviceSchema).parse([]);
export const countryServices = z.array(countryServiceSchema).parse([]);
