import { describe, expect, it } from "vitest";
import { leadSchema, normalizePhone } from "./lead-schema";

const valid = {
  product: "sites",
  business: "Barbearia Silva",
  name: "João Silva",
  phone: "(31) 97213-1824",
  link: "@barbeariasilva",
};

describe("normalizePhone", () => {
  it.each(["(31) 97213-1824", "+55 31 97213-1824", "31972131824"])("normalizes %s", (input) => {
    expect(normalizePhone(input)).toBe("5531972131824");
  });

  it("returns empty for a number that is too short", () => {
    expect(normalizePhone("1234")).toBe("");
  });
});

describe("leadSchema", () => {
  it("accepts a complete lead and normalizes the phone", () => {
    const r = leadSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.phone).toBe("5531972131824");
  });

  it("rejects a lead without name", () => {
    expect(leadSchema.safeParse({ ...valid, name: "" }).success).toBe(false);
  });

  it("rejects an invalid phone with a clear message", () => {
    const r = leadSchema.safeParse({ ...valid, phone: "abc" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].message).toBe("Informe um WhatsApp com DDD");
  });

  it("accepts an empty email and rejects a malformed one", () => {
    expect(leadSchema.safeParse({ ...valid, email: "" }).success).toBe(true);
    expect(leadSchema.safeParse({ ...valid, email: "x" }).success).toBe(false);
  });

  it("requires the instagram or google business page", () => {
    expect(leadSchema.safeParse({ ...valid, link: "" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...valid, link: undefined }).success).toBe(false);
    const r = leadSchema.safeParse({ ...valid, link: "https://g.page/barbearia-silva" });
    expect(r.success).toBe(true);
  });

  it("requires the business name", () => {
    expect(leadSchema.safeParse({ ...valid, business: "  " }).success).toBe(false);
  });

  it("accepts the custom system as a product", () => {
    expect(leadSchema.safeParse({ ...valid, product: "sob-medida" }).success).toBe(true);
  });

  it("rejects an unknown product", () => {
    expect(leadSchema.safeParse({ ...valid, product: "outro" }).success).toBe(false);
  });
});
