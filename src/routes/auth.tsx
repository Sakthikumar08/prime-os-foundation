import { createFileRoute } from "@tanstack/react-router";

import { SignInPage } from "@/features/auth/sign-in-page";
import { parseAuthReason, type AuthReason } from "@/features/auth/session";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { reason?: AuthReason } => {
    const reason = parseAuthReason(search["reason"]);
    return reason ? { reason } : {};
  },
  head: () => ({
    meta: [
      { title: "Sign in · PRIME OS" },
      { name: "description", content: "Sign in to PRIME OS, your private life cockpit." },
      { property: "og:title", content: "Sign in · PRIME OS" },
      { property: "og:description", content: "Sign in to PRIME OS, your private life cockpit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthRoute,
});

function AuthRoute() {
  const { reason } = Route.useSearch();
  return reason ? <SignInPage reason={reason} /> : <SignInPage />;
}
