import { cn } from "@/lib/utils";

interface ProgressRingProps {
  /** 0–100, or null when there is no data yet (renders an empty track and a dash). */
  value: number | null;
  size?: number;
  stroke?: number;
  label: string;
  className?: string;
}

export function ProgressRing({ value, size = 120, stroke = 10, label, className }: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = value === null ? 0 : Math.min(100, Math.max(0, value));
  const offset = circumference * (1 - clamped / 100);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={value === null ? `${label}: no data yet` : `${label}: ${clamped} percent`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-muted"
          strokeDasharray={value === null ? "2 6" : undefined}
        />
        {value !== null && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            className="stroke-primary transition-[stroke-dashoffset] duration-250 ease-snappy"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        )}
      </svg>
      <span className="absolute font-display text-3xl font-semibold tabular-nums text-foreground">
        {value === null ? "—" : clamped}
      </span>
    </div>
  );
}
