import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/app/page-skeleton";
import { RouteError } from "@/components/app/route-states";
import { SettingsPage } from "@/features/settings/settings-page";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings · PRIME OS" },
      { name: "description", content: "Theme, profile, currency and date preferences." },
      { property: "og:title", content: "Settings · PRIME OS" },
      { property: "og:description", content: "Theme, profile, currency and date preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  pendingComponent: PageSkeleton,
  errorComponent: RouteError,
  component: SettingsPage,
});
