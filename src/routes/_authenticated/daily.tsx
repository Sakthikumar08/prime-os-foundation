import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/app/page-skeleton";
import { RouteError } from "@/components/app/route-states";
import { DailyPage } from "@/features/daily/daily-page";

export const Route = createFileRoute("/_authenticated/daily")({
  head: () => ({
    meta: [
      { title: "Daily · PRIME OS" },
      { name: "description", content: "Daily habits and check-ins." },
      { property: "og:title", content: "Daily · PRIME OS" },
      { property: "og:description", content: "Daily habits and check-ins." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  pendingComponent: PageSkeleton,
  errorComponent: RouteError,
  component: DailyPage,
});
