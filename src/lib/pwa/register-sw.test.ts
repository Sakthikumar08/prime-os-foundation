import { describe, expect, it } from "vitest";

import { isServiceWorkerBlocked } from "@/lib/pwa/register-sw";

describe("service worker guard", () => {
  it("never registers in dev or inside the editor iframe", () => {
    expect(isServiceWorkerBlocked("prime.example.com", "", false, false)).toBe(true);
    expect(isServiceWorkerBlocked("prime.example.com", "", true, true)).toBe(true);
  });

  it("never registers on preview hosts", () => {
    expect(
      isServiceWorkerBlocked("id-preview--e61b1605-42f6-4985-af79-fa2becfaa9bf.lovable.app", "", false, true),
    ).toBe(true);
    expect(isServiceWorkerBlocked("abc.lovableproject.com", "", false, true)).toBe(true);
  });

  it("honours the ?sw=off kill switch", () => {
    expect(isServiceWorkerBlocked("prime-os.lovable.app", "?sw=off", false, true)).toBe(true);
  });

  it("registers on the published app", () => {
    expect(isServiceWorkerBlocked("prime-os.lovable.app", "", false, true)).toBe(false);
  });
});
