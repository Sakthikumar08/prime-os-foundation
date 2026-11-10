import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/app/page-skeleton";
import { RouteError } from "@/components/app/route-states";
import { MoneyPage } from "@/features/money/money-page";

export const Route = createFileRoute("/_authenticated/money")({
  head: () => ({
    meta: [
      { title: "Money · PRIME OS" },
      { name: "description", content: "Spending, income and budgets in rupees." },
      { property: "og:title", content: "Money · PRIME OS" },
      { property: "og:description", content: "Spending, income and budgets in rupees." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  pendingComponent: PageSkeleton,
  errorComponent: RouteError,
  component: MoneyPage,
});
