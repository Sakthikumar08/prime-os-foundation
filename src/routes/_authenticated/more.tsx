import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/app/page-skeleton";
import { RouteError } from "@/components/app/route-states";
import { MorePage } from "@/features/more/more-page";

export const Route = createFileRoute("/_authenticated/more")({
  head: () => ({
    meta: [
      { title: "More · PRIME OS" },
      { name: "description", content: "All PRIME OS modules." },
      { property: "og:title", content: "More · PRIME OS" },
      { property: "og:description", content: "All PRIME OS modules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  pendingComponent: PageSkeleton,
  errorComponent: RouteError,
  component: MorePage,
});
