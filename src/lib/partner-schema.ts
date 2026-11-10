import { z } from "zod";

export const VENUE_TYPES = ["Gym", "Studio", "Shopping centre", "Office", "Other"] as const;

export const partnerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+()\d\s-]*$/, "Use digits, spaces and + ( ) - only")
    .optional()
    .or(z.literal("")),
  venue: z.string().trim().min(2, "Tell us the venue name").max(120),
  venueType: z.enum(VENUE_TYPES, { errorMap: () => ({ message: "Choose a venue type" }) }),
  visitors: z.coerce
    .number({ invalid_type_error: "Enter a number" })
    .int()
    .min(0, "Must be 0 or more")
    .max(100000),
  message: z.string().trim().max(1000, "Keep it under 1000 characters").optional().or(z.literal("")),
});

export type PartnerInput = z.input<typeof partnerSchema>;
export type PartnerValues = z.output<typeof partnerSchema>;
