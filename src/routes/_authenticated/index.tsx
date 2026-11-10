import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/app/page-skeleton";
import { RouteError } from "@/components/app/route-states";
import { HomePage } from "@/features/home/home-page";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Home · PRIME OS" },
      { name: "description", content: "Your day at a glance in PRIME OS." },
      { property: "og:title", content: "Home · PRIME OS" },
      { property: "og:description", content: "Your day at a glance in PRIME OS." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  pendingComponent: PageSkeleton,
  errorComponent: RouteError,
  component: HomePage,
});
