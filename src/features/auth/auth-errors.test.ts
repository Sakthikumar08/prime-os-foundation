import { describe, expect, it } from "vitest";

import {
  EXPIRED_SESSION_MESSAGE,
  NETWORK_ERROR_MESSAGE,
  PRIVATE_APP_MESSAGE,
  describeAuthError,
  isNetworkAuthError,
} from "@/features/auth/auth-errors";

describe("describeAuthError", () => {
  it("explains a wrong email or password", () => {
    expect(describeAuthError({ code: "invalid_credentials", message: "Invalid login credentials" })).toMatch(
      /don't match/,
    );
  });

  it("tells people sign-up is private when sign-ups are disabled", () => {
    expect(describeAuthError({ code: "signup_disabled" })).toBe(PRIVATE_APP_MESSAGE);
    expect(describeAuthError({ code: "otp_disabled", message: "Signups not allowed for otp" })).toBe(
      PRIVATE_APP_MESSAGE,
    );
  });

  it("reports an expired session", () => {
    expect(describeAuthError({ code: "refresh_token_not_found" })).toBe(EXPIRED_SESSION_MESSAGE);
  });

  it("reports network failures", () => {
    expect(describeAuthError({ name: "AuthRetryableFetchError", message: "Failed to fetch" })).toBe(
      NETWORK_ERROR_MESSAGE,
    );
    expect(isNetworkAuthError({ name: "TypeError", message: "Failed to fetch" })).toBe(true);
    expect(isNetworkAuthError({ code: "invalid_credentials" })).toBe(false);
  });
});
