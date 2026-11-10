/**
 * The only place the app service worker is registered. It refuses to run in dev, inside
 * iframes (the Lovable editor) and on Lovable preview hosts, and cleans up stale workers there.
 * Append `?sw=off` to any URL to unregister it manually.
 */
const SW_PATH = "/sw.js";

const PREVIEW_LABEL = /^(?:id-preview|preview)(?:-[a-z0-9]+)?--.+$/;
const PREVIEW_SUFFIXES = [".lovable.app", ".gpt-eng.com", ".gptengineer.run"];
const PROJECT_ID = "e61b1605-42f6-4985-af79-fa2becfaa9bf";

export function isServiceWorkerBlocked(
  hostname: string,
  search: string,
  inIframe: boolean,
  isProd: boolean,
): boolean {
  const host = hostname.toLowerCase();
  if (!isProd || inIframe) return true;
  if (new URLSearchParams(search).get("sw") === "off") return true;
  const firstLabel = host.split(".")[0] ?? "";
  const onPreviewDomain = PREVIEW_SUFFIXES.some((s) => host.endsWith(s));
  if (onPreviewDomain && PREVIEW_LABEL.test(firstLabel)) return true;
  if (onPreviewDomain && firstLabel === `project--${PROJECT_ID}-dev`) return true;
  const blockedRoots = ["lovableproject.com", "lovableproject-dev.com", "beta.lovable.dev"];
  if (blockedRoots.some((root) => host === root || host.endsWith(`.${root}`))) return true;
  return false;
}

async function unregisterAppWorkers() {
  if (!("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    regs
      .filter((r) => {
        const url = r.active?.scriptURL ?? r.waiting?.scriptURL ?? r.installing?.scriptURL ?? "";
        return url.endsWith(SW_PATH);
      })
      .map((r) => r.unregister()),
  );
}

/** Call once from a useEffect in the root component. */
export async function setupServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  let inIframe = true;
  try {
    inIframe = window.self !== window.top;
  } catch {
    inIframe = true;
  }
  const blocked = isServiceWorkerBlocked(
    window.location.hostname,
    window.location.search,
    inIframe,
    import.meta.env.PROD,
  );
  if (blocked) {
    await unregisterAppWorkers();
    return;
  }
  const { registerSW } = await import("virtual:pwa-register");
  registerSW({ immediate: true });
}
