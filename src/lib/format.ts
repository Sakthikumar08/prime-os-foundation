/**
 * Locale rules for PRIME OS: all dates are shown in Asia/Kolkata and all money in
 * Indian Rupees with Indian digit grouping (e.g. ₹1,23,456.00).
 */
export const APP_TIMEZONE = "Asia/Kolkata";
export const APP_CURRENCY = "INR";

export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
export const DATE_FORMATS: readonly DateFormat[] = ["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
export const DEFAULT_DATE_FORMAT: DateFormat = "DD/MM/YYYY";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: APP_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats an amount as Indian Rupees, e.g. 123456 → "₹1,23,456.00". */
export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

function zonedParts(date: Date): { day: string; month: string; year: string } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: APP_TIMEZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return { day: get("day"), month: get("month"), year: get("year") };
}

/** Formats a date in Asia/Kolkata using the chosen pattern. */
export function formatDate(date: Date, format: DateFormat = DEFAULT_DATE_FORMAT): string {
  const { day, month, year } = zonedParts(date);
  switch (format) {
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
}

/** e.g. "Tuesday, 10 November" in Asia/Kolkata. */
export function formatLongDay(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: APP_TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

/** Hour of day (0–23) in Asia/Kolkata. */
export function hourInAppZone(date: Date): number {
  const h = new Intl.DateTimeFormat("en-GB", {
    timeZone: APP_TIMEZONE,
    hour: "2-digit",
    hourCycle: "h23",
  }).format(date);
  return Number(h);
}

export function greetingFor(date: Date): string {
  const h = hourInAppZone(date);
  if (h < 5) return "Late night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
