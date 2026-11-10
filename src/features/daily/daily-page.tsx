import { CalendarCheck2 } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/app/empty-state";
import { PageHeader } from "@/components/app/page-header";
import { useSettings } from "@/features/settings/settings-store";
import { formatDate } from "@/lib/format";

export function DailyPage() {
  const { dateFormat } = useSettings();
  const [now] = useState(() => new Date());
  return (
    <div className="fade-in-up">
      <PageHeader eyebrow={formatDate(now, dateFormat)} title="Daily" />
      <EmptyState
        icon={CalendarCheck2}
        title="No habits yet"
        description="Build your daily routine here — check in, keep streaks and see what's due today."
      />
    </div>
  );
}
