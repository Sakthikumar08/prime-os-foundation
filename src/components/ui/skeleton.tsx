import { cn } from "@/lib/utils";

/** Static placeholder block — no looping shimmer, per the motion rules. */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden className={cn("rounded-control bg-muted", className)} {...props} />;
}

export { Skeleton };
