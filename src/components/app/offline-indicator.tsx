import { WifiOff } from "lucide-react";
import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  window.addEventListener("online", cb);
  window.addEventListener("offline", cb);
  return () => {
    window.removeEventListener("online", cb);
    window.removeEventListener("offline", cb);
  };
}

export function useOnline(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
}

/** Subtle pill shown only while the device has no connection. */
export function OfflineIndicator() {
  const online = useOnline();
  if (online) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center pt-safe"
    >
      <div className="fade-in-up mt-2 inline-flex items-center gap-2 rounded-full border border-border-strong bg-popover px-3.5 py-1.5 text-xs font-medium text-popover-foreground">
        <WifiOff className="size-3.5 text-warning" aria-hidden />
        Offline — showing the saved app
      </div>
    </div>
  );
}
