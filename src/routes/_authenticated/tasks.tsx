import { createFileRoute } from "@tanstack/react-router";

import { PageSkeleton } from "@/components/app/page-skeleton";
import { RouteError } from "@/components/app/route-states";
import { TasksPage } from "@/features/tasks/tasks-page";

export const Route = createFileRoute("/_authenticated/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks · PRIME OS" },
      { name: "description", content: "Capture and clear what matters." },
      { property: "og:title", content: "Tasks · PRIME OS" },
      { property: "og:description", content: "Capture and clear what matters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  pendingComponent: PageSkeleton,
  errorComponent: RouteError,
  component: TasksPage,
});
