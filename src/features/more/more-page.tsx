import { Link } from "@tanstack/react-router";
import {
  Briefcase,
  ChevronRight,
  Dumbbell,
  MessagesSquare,
  Palette,
  Plane,
  Salad,
  Settings,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/components/app/page-header";
import { Card } from "@/components/ui/card";

const MODULES: { name: string; blurb: string; icon: LucideIcon }[] = [
  { name: "Goals", blurb: "Long-term targets and milestones", icon: Target },
  { name: "Fitness", blurb: "Workouts and training load", icon: Dumbbell },
  { name: "Nutrition", blurb: "Meals, water and macros", icon: Salad },
  { name: "Cricket", blurb: "Practice, matches and form", icon: Trophy },
  { name: "Career", blurb: "Skills, projects and growth", icon: Briefcase },
  { name: "Communication", blurb: "Speaking, writing and listening", icon: MessagesSquare },
  { name: "Grooming", blurb: "Routines and self-care", icon: Sparkles },
  { name: "Creativity", blurb: "Ideas, practice and output", icon: Palette },
  { name: "Travel", blurb: "Trips, plans and memories", icon: Plane },
];

export function MorePage() {
  return (
    <div className="fade-in-up">
      <PageHeader eyebrow="Modules" title="More" />

      <Link to="/settings" className="block rounded-card">
        <Card variant="interactive" className="flex min-h-16 items-center gap-4 px-4 py-3.5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-primary/14 text-accent-ink">
            <Settings className="size-5" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">Settings</span>
            <span className="block text-sm text-muted-foreground">
              Theme, profile, currency and dates
            </span>
          </span>
          <ChevronRight className="size-5 text-muted-foreground" aria-hidden />
        </Card>
      </Link>

      <h2 className="mt-8 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Coming soon
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {MODULES.map(({ name, blurb, icon: Icon }) => (
          <li key={name}>
            <Card className="flex h-full flex-col p-4" aria-label={`${name} — coming soon`}>
              <div className="flex items-start justify-between gap-2">
                <span className="flex size-10 items-center justify-center rounded-control bg-surface-raised text-muted-foreground">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="rounded-full border border-border-strong px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Soon
                </span>
              </div>
              <p className="mt-4 font-semibold">{name}</p>
              <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{blurb}</p>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
