import { describe, expect, it, vi } from "vitest";
import { trackLead } from "./track";

describe("trackLead", () => {
  it("fires generate_lead and Lead once each", () => {
    const gtag = vi.fn();
    const fbq = vi.fn();
    trackLead("sites", { gtag, fbq });
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", { product: "sites" });
    expect(fbq).toHaveBeenCalledTimes(1);
    expect(fbq).toHaveBeenCalledWith("track", "Lead", { content_name: "sites" });
  });

  it("does nothing when gtag and fbq are missing", () => {
    expect(() => trackLead("atendente", {})).not.toThrow();
  });

  it("does not throw when gtag throws and still fires the pixel", () => {
    const fbq = vi.fn();
    const gtag = vi.fn(() => {
      throw new Error("blocked");
    });
    expect(() => trackLead("matricula", { gtag, fbq })).not.toThrow();
    expect(fbq).toHaveBeenCalledTimes(1);
  });
});
