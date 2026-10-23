import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "Test User", email: "t@example.com", country: "Pakistan", businessType: "Startup", serviceArea: "Accounting",
  message: "Need help organising bookkeeping records.", consent: true,
};

describe("contact schema", () => {
  it("accepts a minimal valid enquiry", () => expect(contactSchema.safeParse(valid).success).toBe(true));
  it("requires consent", () => expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false));
  it("rejects a bad email", () => expect(contactSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false));
  it("rejects a too-short message", () => expect(contactSchema.safeParse({ ...valid, message: "help" }).success).toBe(false));
  it("rejects unknown countries and service areas", () => {
    expect(contactSchema.safeParse({ ...valid, country: "Narnia" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, serviceArea: "Audit" }).success).toBe(false);
  });
  it("accepts optional fields as empty strings", () =>
    expect(contactSchema.safeParse({ ...valid, company: "", website: "", phone: "", timeframe: "", preferredContact: "" }).success).toBe(true));
});
