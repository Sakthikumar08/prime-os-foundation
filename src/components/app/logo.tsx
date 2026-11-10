import { cn } from "@/lib/utils";

/** PRIME OS "P" mark — lime on near-black in both themes. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("size-10", className)} aria-hidden>
      <rect width="64" height="64" rx="14" className="fill-brand-ink" />
      <path
        className="fill-brand-lime"
        fillRule="evenodd"
        d="M19 14h16a11 11 0 0 1 0 22h-8v14h-8V14Zm8 7v8h6.5a4 4 0 0 0 0-8H27Z"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-lg font-bold tracking-tight", className)}>
      PRIME<span className="text-accent-ink"> OS</span>
    </span>
  );
}
