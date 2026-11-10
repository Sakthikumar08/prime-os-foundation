import { Gauge, Sunrise } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/app/empty-state";
import { PageHeader } from "@/components/app/page-header";
import { ProgressRing } from "@/components/app/progress-ring";
import { Card } from "@/components/ui/card";
import { useSettings } from "@/features/settings/settings-store";
import { formatLongDay, greetingFor } from "@/lib/format";

export function HomePage() {
  const { profileName } = useSettings();
  const [now] = useState(() => new Date());
  const firstName = profileName.trim().split(/\s+/)[0];

  return (
    <div className="fade-in-up">
      <PageHeader
        eyebrow={formatLongDay(now)}
        title={firstName ? `${greetingFor(now)}, ${firstName}` : greetingFor(now)}
      />

      <Card variant="hero" className="p-6">
        <div className="flex items-center gap-6">
          <ProgressRing value={null} label="Prime Score" size={112} />
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink">
              <Gauge className="size-3.5" aria-hidden />
              Prime Score
            </p>
            <p className="mt-2 font-display text-xl font-semibold leading-snug">
              No score yet
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Your daily score appears once you start logging habits, money and tasks.
            </p>
          </div>
        </div>
      </Card>

      <section className="mt-6" aria-labelledby="today-heading">
        <h2 id="today-heading" className="sr-only">
          Today
        </h2>
        <EmptyState
          icon={Sunrise}
          title="Your day is a blank slate"
          description="Today's briefing — habits due, spending and top tasks — will gather here."
        />
      </section>
    </div>
  );
}
