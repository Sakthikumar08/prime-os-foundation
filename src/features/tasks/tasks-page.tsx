import { ListChecks } from "lucide-react";

import { EmptyState } from "@/components/app/empty-state";
import { PageHeader } from "@/components/app/page-header";

export function TasksPage() {
  return (
    <div className="fade-in-up">
      <PageHeader eyebrow="Focus" title="Tasks" />
      <EmptyState
        icon={ListChecks}
        title="No tasks yet"
        description="Capture what matters, set priorities and clear your list one task at a time."
      />
    </div>
  );
}
