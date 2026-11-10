import type { LucideIcon } from "lucide-react";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
}

/** Friendly empty state with a disabled primary action until the module ships. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel = "Coming in the next phase",
}: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center px-6 py-10 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-border-strong bg-surface-raised text-accent-ink">
        <Icon className="size-6" strokeWidth={1.75} aria-hidden />
      </div>
      <h2 className="mt-5 text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{description}</p>
      <Button className="mt-6 w-full max-w-xs" disabled aria-disabled>
        <Lock aria-hidden />
        {actionLabel}
      </Button>
    </Card>
  );
}
