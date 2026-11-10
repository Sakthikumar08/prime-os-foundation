import { describe, expect, it } from "vitest";

import { formatDate, formatINR } from "@/lib/format";

describe("formatINR", () => {
  it("uses the rupee sign and Indian digit grouping with two decimals", () => {
    expect(formatINR(123456)).toBe("₹1,23,456.00");
  });

  it("groups crores the Indian way", () => {
    expect(formatINR(12345678.9)).toBe("₹1,23,45,678.90");
  });
});

describe("formatDate", () => {
  it("defaults to DD/MM/YYYY", () => {
    expect(formatDate(new Date("2026-03-07T06:00:00Z"))).toBe("07/03/2026");
  });

  it("uses Asia/Kolkata, not UTC: 20:00 UTC on 31 Dec is already 1 Jan in India", () => {
    expect(formatDate(new Date("2025-12-31T20:00:00Z"))).toBe("01/01/2026");
  });

  it("supports the other date formats", () => {
    const d = new Date("2026-03-07T06:00:00Z");
    expect(formatDate(d, "MM/DD/YYYY")).toBe("03/07/2026");
    expect(formatDate(d, "YYYY-MM-DD")).toBe("2026-03-07");
  });
});
