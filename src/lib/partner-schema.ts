import { z } from "zod";

export const VENUE_TYPES = ["Gym", "Studio", "Shopping centre", "Office", "Other"] as const;

export const partnerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Keep it under 80 characters"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .max(30, "Keep it under 30 characters")
    .regex(/^[+()\d\s-]*$/, "Use digits, spaces and + ( ) - only")
    .optional()
    .or(z.literal("")),
  venue: z.string().trim().min(2, "Tell us the venue name").max(120),
  venueType: z.enum(VENUE_TYPES, { errorMap: () => ({ message: "Choose a venue type" }) }),
  // Empty inputs become undefined so they fail as "Enter a number" instead of coercing to 0.
  visitors: z.preprocess(
    (v) => (v === "" || v === null ? undefined : v),
    z.coerce
      .number({ invalid_type_error: "Enter a number" })
      .int("Use a whole number")
      .min(0, "Must be 0 or more")
      .max(100000, "That's a lot — enter 100,000 or less"),
  ),
  message: z.string().trim().max(1000, "Keep it under 1000 characters").optional().or(z.literal("")),
});

export type PartnerInput = z.input<typeof partnerSchema>;
export type PartnerValues = z.output<typeof partnerSchema>;

/** Builds a mailto: link carrying the enquiry, so it works without a server. */
export function partnerMailto(to: string, v: PartnerValues): string {
  const subject = `Partner enquiry — ${v.venue}`;
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.phone ? `Phone: ${v.phone}` : null,
    `Venue: ${v.venue} (${v.venueType})`,
    `Daily visitors: ${v.visitors}`,
    v.message ? `\n${v.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
