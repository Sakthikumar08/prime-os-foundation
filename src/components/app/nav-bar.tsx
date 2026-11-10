import { Link } from "@tanstack/react-router";
import {
  CalendarCheck2,
  House,
  LayoutGrid,
  ListChecks,
  Plus,
  Settings,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import { LogoMark, Wordmark } from "@/components/app/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavPath = "/" | "/daily" | "/money" | "/tasks" | "/more";

export const NAV_ITEMS: { to: NavPath; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "Home", icon: House },
  { to: "/daily", label: "Daily", icon: CalendarCheck2 },
  { to: "/money", label: "Money", icon: Wallet },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/more", label: "More", icon: LayoutGrid },
];

/** Mobile: fixed bottom bar. Tablet/desktop: left navigation rail. */
export function NavBar({ onQuickAdd }: { onQuickAdd: () => void }) {
  return (
    <>
      {/* Bottom navigation (mobile) */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/92 backdrop-blur-xl pb-safe md:hidden"
      >
        <ul className="mx-auto grid h-nav max-w-lg grid-cols-5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to} className="flex">
              <Link
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="group flex flex-1 flex-col items-center justify-center gap-1 rounded-control text-[11px] font-medium text-muted-foreground transition-colors duration-200 data-[status=active]:text-foreground"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        "flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-200",
                        isActive && "bg-primary/14 text-accent-ink",
                      )}
                    >
                      <Icon className="size-[22px]" strokeWidth={isActive ? 2.1 : 1.75} aria-hidden />
                    </span>
                    {label}
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick add (mobile) — floats above the bottom nav */}
      <Button
        variant="fab"
        size="fab"
        aria-label="Quick add"
        onClick={onQuickAdd}
        className="fixed right-5 z-30 md:hidden bottom-[calc(var(--spacing-nav)+env(safe-area-inset-bottom)+1rem)]"
      >
        <Plus strokeWidth={2.25} aria-hidden />
      </Button>

      {/* Side rail (tablet + desktop) */}
      <nav
        aria-label="Primary"
        className="fixed inset-y-0 left-0 z-30 hidden w-rail flex-col border-r border-border bg-sidebar px-3 py-5 md:flex lg:w-rail-wide lg:px-4"
      >
        <Link to="/" className="flex items-center gap-3 rounded-control px-2 py-1.5">
          <LogoMark className="size-9 shrink-0" />
          <Wordmark className="hidden lg:inline" />
        </Link>

        <Button
          onClick={onQuickAdd}
          className="mt-6 w-full px-0 lg:justify-start lg:px-4"
          aria-label="Quick add"
        >
          <Plus strokeWidth={2.25} aria-hidden />
          <span className="hidden lg:inline">Quick add</span>
        </Button>

        <ul className="mt-6 flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <RailLink to={to} label={label} icon={Icon} exact={to === "/"} />
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <RailLink to="/settings" label="Settings" icon={Settings} />
        </div>
      </nav>
    </>
  );
}

function RailLink({
  to,
  label,
  icon: Icon,
  exact,
}: {
  to: NavPath | "/settings";
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}) {
  return (
    <Link
      to={to}
      activeOptions={{ exact }}
      className="flex h-12 flex-col items-center justify-center gap-0.5 rounded-control text-[11px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground data-[status=active]:bg-primary/12 data-[status=active]:text-accent-ink lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:text-sm"
    >
      <Icon className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
      <span>{label}</span>
    </Link>
  );
}
