import { describe, expect, it } from "vitest";
import { captureAttribution, isCampaignVisit, readAttribution } from "./attribution";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  };
}

const brokenStorage = {
  getItem: () => {
    throw new Error("blocked");
  },
  setItem: () => {
    throw new Error("blocked");
  },
};

describe("attribution", () => {
  it("captures utm, gclid and fbclid from the url", () => {
    const a = captureAttribution(
      "?utm_source=instagram&utm_campaign=lancamento&fbclid=abc",
      "/",
      memoryStorage(),
    );
    expect(a).toEqual({
      utm_source: "instagram",
      utm_campaign: "lancamento",
      fbclid: "abc",
      landing: "/",
    });
  });

  it("keeps the first capture of the session", () => {
    const s = memoryStorage();
    captureAttribution("?utm_source=instagram", "/", s);
    const second = captureAttribution("?utm_source=google", "/agendar", s);
    expect(second.utm_source).toBe("instagram");
  });

  it("isCampaignVisit is true after navigating without params", () => {
    const s = memoryStorage();
    captureAttribution("?gclid=1", "/", s);
    expect(isCampaignVisit("", s)).toBe(true);
    expect(readAttribution(s).gclid).toBe("1");
  });

  it("isCampaignVisit is false for a plain visit", () => {
    expect(isCampaignVisit("", memoryStorage())).toBe(false);
  });

  it("does not throw when storage throws", () => {
    expect(() => captureAttribution("?utm_source=x", "/", brokenStorage)).not.toThrow();
    expect(isCampaignVisit("?utm_source=x", brokenStorage)).toBe(true);
    expect(readAttribution(brokenStorage)).toEqual({});
  });
});
