import { describe, expect, it } from "vitest";

import { partnerMailto, partnerSchema } from "@/lib/partner-schema";

const valid = {
  name: "Jane Doe",
  email: "jane@gym.com",
  phone: "+971 50 123 4567",
  venue: "Ironworks",
  venueType: "Gym",
  visitors: "350",
  message: "",
};

describe("partner enquiry form rules", () => {
  it("accepts a complete enquiry and turns visitors into a number", () => {
    const r = partnerSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.visitors).toBe(350);
  });

  it("rejects an invalid email", () => {
    expect(partnerSchema.safeParse({ ...valid, email: "jane@" }).success).toBe(false);
  });

  it("rejects letters in the phone number but allows it empty", () => {
    expect(partnerSchema.safeParse({ ...valid, phone: "call me" }).success).toBe(false);
    expect(partnerSchema.safeParse({ ...valid, phone: "" }).success).toBe(true);
  });

  it("requires daily visitors instead of treating empty as 0", () => {
    expect(partnerSchema.safeParse({ ...valid, visitors: "" }).success).toBe(false);
    expect(partnerSchema.safeParse({ ...valid, visitors: "-5" }).success).toBe(false);
  });

  it("requires a venue type from the list", () => {
    expect(partnerSchema.safeParse({ ...valid, venueType: "" }).success).toBe(false);
  });

  it("puts the venue in the email subject", () => {
    const r = partnerSchema.parse(valid);
    expect(partnerMailto("hello@repupfit.com", r)).toContain(
      encodeURIComponent("Partner enquiry — Ironworks"),
    );
  });
});
