import { Skeleton } from "@/components/ui/skeleton";

/** Loading placeholder that mirrors the page layout (header + cards). */
export function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading" className="fade-in-up">
      <div className="pb-6">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-3 h-8 w-48" />
      </div>
      <Skeleton className="h-44 w-full rounded-card" />
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Skeleton className="h-28 rounded-card" />
        <Skeleton className="h-28 rounded-card" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}

/** Full-screen loading shell shown while the session is being checked. */
export function ShellSkeleton() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto max-w-content px-page pt-10 md:pl-rail lg:pl-rail-wide">
        <PageSkeleton />
      </div>
    </div>
  );
}
