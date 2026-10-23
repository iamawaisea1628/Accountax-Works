import { z } from "zod";

export const COUNTRY_OPTIONS = ["Pakistan", "United Kingdom", "United States", "United Arab Emirates", "Saudi Arabia", "Canada", "Australia", "Other / multiple"] as const;
export const BUSINESS_TYPES = ["Startup", "Small or medium-sized business", "Ecommerce or retail", "Professional services or agency", "Property or real estate", "Technology or SaaS", "Multi-entity or international", "Other"] as const;
export const SERVICE_AREAS = ["Accounting", "Taxation", "Advisory", "Finance", "Analytics", "Finance Technology", "Not sure yet"] as const;
export const TIMEFRAMES = ["As soon as possible", "Within 1 month", "1 to 3 months", "No fixed timeframe"] as const;
export const CONTACT_METHODS = ["Email", "Phone call", "Video call"] as const;

const opt = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.email("Enter a valid work email address.").max(200),
  country: z.enum(COUNTRY_OPTIONS, { error: "Select a country." }),
  businessType: z.enum(BUSINESS_TYPES, { error: "Select a business type." }),
  serviceArea: z.enum(SERVICE_AREAS, { error: "Select a service area." }),
  message: z.string().trim().min(20, "Describe your requirement in at least 20 characters.").max(3000),
  consent: z.literal(true, { error: "Confirm that you have read the privacy notice." }),
  company: opt(150),
  website: opt(200),
  preferredContact: z.enum(CONTACT_METHODS).optional().or(z.literal("")),
  phone: opt(40),
  timeframe: z.enum(TIMEFRAMES).optional().or(z.literal("")),
  preferredTime: opt(100),
  // attribution + anti-spam
  sourcePage: opt(200),
  utmSource: opt(100), utmMedium: opt(100), utmCampaign: opt(100),
  contactRef: opt(10), // honeypot: must stay empty
  turnstileToken: opt(2048),
});
export type ContactInput = z.infer<typeof contactSchema>;
