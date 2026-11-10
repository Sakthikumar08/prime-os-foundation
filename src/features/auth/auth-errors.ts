/**
 * Turns auth failures into short, human messages for the sign-in screen.
 */
export const PRIVATE_APP_MESSAGE =
  "PRIME OS is private. Accounts are created by invitation only, so sign-up isn't available.";

export const EXPIRED_SESSION_MESSAGE = "Your session expired. Please sign in again.";

export const NETWORK_ERROR_MESSAGE =
  "Can't reach PRIME OS right now. Check your internet connection and try again.";

interface AuthLikeError {
  message?: string;
  code?: string;
  status?: number;
  name?: string;
}

export function describeAuthError(error: unknown): string {
  if (!error) return "Something went wrong. Please try again.";
  const e = error as AuthLikeError;
  const message = (e.message ?? "").toLowerCase();
  const code = (e.code ?? "").toLowerCase();

  if (
    e.name === "AuthRetryableFetchError" ||
    (e.name === "TypeError" && message.includes("fetch")) ||
    message.includes("failed to fetch") ||
    message.includes("network") ||
    e.status === 0
  ) {
    return NETWORK_ERROR_MESSAGE;
  }

  if (code === "invalid_credentials" || message.includes("invalid login credentials")) {
    return "That email and password don't match. Check them and try again, or use a magic link.";
  }

  if (
    code === "signup_disabled" ||
    code === "otp_disabled" ||
    message.includes("signups not allowed") ||
    message.includes("signup is disabled")
  ) {
    return PRIVATE_APP_MESSAGE;
  }

  if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
    return "This account isn't confirmed yet. Open the invite email and follow its link first.";
  }

  if (
    code === "session_expired" ||
    code === "refresh_token_not_found" ||
    code === "refresh_token_already_used" ||
    code === "session_not_found" ||
    message.includes("jwt expired") ||
    message.includes("refresh token")
  ) {
    return EXPIRED_SESSION_MESSAGE;
  }

  if (
    e.status === 429 ||
    code === "over_request_rate_limit" ||
    code === "over_email_send_rate_limit" ||
    message.includes("rate limit")
  ) {
    return "Too many attempts. Wait a minute, then try again.";
  }

  if (code === "validation_failed" || message.includes("valid email")) {
    return "Enter a valid email address.";
  }

  return "Something went wrong. Please try again.";
}

/** True when the error means the server could not be reached (vs. a rejected session). */
export function isNetworkAuthError(error: unknown): boolean {
  return describeAuthError(error) === NETWORK_ERROR_MESSAGE;
}
