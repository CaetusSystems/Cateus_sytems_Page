import { describe, expect, it, vi } from "vitest";
import { readStoredLead, submitLead } from "./submit-lead";
import type { LeadInput } from "./lead-schema";

const lead = {
  product: "sites",
  business: "Barbearia Silva",
  name: "João",
  phone: "5531972131824",
} as LeadInput;

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  };
}

const reply = (status: number, body = '{"ok":true}') =>
  (async () => new Response(body, { status })) as unknown as typeof fetch;

describe("submitLead", () => {
  it("returns ok, tracks once and stores the lead on 200", async () => {
    const track = vi.fn();
    const storage = memoryStorage();
    const r = await submitLead(lead, { fetchImpl: reply(200), track, storage });
    expect(r).toEqual({ ok: true });
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith("sites");
    expect(readStoredLead(storage)?.name).toBe("João");
  });

  it("does not track on 502 and reports a server failure", async () => {
    const track = vi.fn();
    const r = await submitLead(lead, { fetchImpl: reply(502), track, storage: memoryStorage() });
    expect(r).toEqual({ ok: false, reason: "server" });
    expect(track).not.toHaveBeenCalled();
  });

  it("reports invalid on 400 without tracking", async () => {
    const track = vi.fn();
    const r = await submitLead(lead, { fetchImpl: reply(400), track, storage: memoryStorage() });
    expect(r).toEqual({ ok: false, reason: "invalid" });
    expect(track).not.toHaveBeenCalled();
  });

  it("does not track when a 200 does not carry ok:true (e.g. html from a static host)", async () => {
    const track = vi.fn();
    const r = await submitLead(lead, {
      fetchImpl: reply(200, "<!doctype html><html></html>"),
      track,
      storage: memoryStorage(),
    });
    expect(r).toEqual({ ok: false, reason: "server" });
    expect(track).not.toHaveBeenCalled();
  });

  it("does not track on network error", async () => {
    const track = vi.fn();
    const fetchImpl = (async () => {
      throw new TypeError("offline");
    }) as unknown as typeof fetch;
    const r = await submitLead(lead, { fetchImpl, track, storage: memoryStorage() });
    expect(r).toEqual({ ok: false, reason: "network" });
    expect(track).not.toHaveBeenCalled();
  });

  it("ignores a second call while the first is pending", async () => {
    const track = vi.fn();
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const fetchImpl = vi.fn(async () => {
      await gate;
      return new Response('{"ok":true}', { status: 200 });
    }) as unknown as typeof fetch;
    const deps = { fetchImpl, track, storage: memoryStorage() };
    const first = submitLead(lead, deps);
    const second = submitLead(lead, deps);
    release();
    await Promise.all([first, second]);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledTimes(1);
  });

  it("readStoredLead returns undefined when storage is empty or broken", () => {
    expect(readStoredLead(memoryStorage())).toBeUndefined();
    const broken = {
      getItem: () => {
        throw new Error("x");
      },
      setItem: () => {},
    };
    expect(readStoredLead(broken)).toBeUndefined();
  });
});
