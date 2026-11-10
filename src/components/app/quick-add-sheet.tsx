import { CalendarCheck2, ListChecks, Wallet, type LucideIcon } from "lucide-react";

import { BottomSheet } from "@/components/app/bottom-sheet";

const ACTIONS: { label: string; hint: string; icon: LucideIcon }[] = [
  { label: "Habit", hint: "Log or create a daily habit", icon: CalendarCheck2 },
  { label: "Expense", hint: "Record money spent", icon: Wallet },
  { label: "Task", hint: "Capture something to do", icon: ListChecks },
];

export function QuickAddSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Quick add"
      description="These shortcuts unlock in the next phase."
    >
      <ul className="flex flex-col gap-2">
        {ACTIONS.map(({ label, hint, icon: Icon }) => (
          <li key={label}>
            <button
              type="button"
              disabled
              className="flex min-h-16 w-full cursor-not-allowed items-center gap-4 rounded-card border border-border bg-surface-raised px-4 py-3 text-left"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-control bg-background text-muted-foreground">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-foreground">{label}</span>
                <span className="block text-sm text-muted-foreground">{hint}</span>
              </span>
              <span className="shrink-0 rounded-full border border-border-strong px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                Next phase
              </span>
            </button>
          </li>
        ))}
      </ul>
    </BottomSheet>
  );
}
