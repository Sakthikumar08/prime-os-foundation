import { useSyncExternalStore } from "react";
import { DEFAULT_DATE_FORMAT, DATE_FORMATS, type DateFormat, APP_TIMEZONE } from "@/lib/format";

/**
 * Local-first settings. Phase 1A persists to localStorage; a later phase will sync the
 * same shape to the signed-in user's row in the database.
 */
export type Theme = "dark" | "light";

export interface AppSettings {
  theme: Theme;
  profileName: string;
  currency: "INR";
  dateFormat: DateFormat;
  timezone: typeof APP_TIMEZONE;
}

export const THEME_STORAGE_KEY = "prime-os:theme";
export const SETTINGS_STORAGE_KEY = "prime-os:settings";

export const DEFAULT_SETTINGS: AppSettings = {
  theme: "dark",
  profileName: "",
  currency: "INR",
  dateFormat: DEFAULT_DATE_FORMAT,
  timezone: APP_TIMEZONE,
};

export const THEME_COLORS: Record<Theme, string> = {
  dark: "#0e0f0c",
  light: "#f6f7f2",
};

function readStorage(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<AppSettings>) : {};
    const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return {
      ...DEFAULT_SETTINGS,
      profileName: typeof parsed.profileName === "string" ? parsed.profileName : "",
      dateFormat:
        parsed.dateFormat && DATE_FORMATS.includes(parsed.dateFormat)
          ? parsed.dateFormat
          : DEFAULT_DATE_FORMAT,
      theme: theme === "light" ? "light" : "dark",
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

let snapshot: AppSettings | null = null;
const listeners = new Set<() => void>();

function getSnapshot(): AppSettings {
  if (!snapshot) snapshot = readStorage();
  return snapshot;
}

function getServerSnapshot(): AppSettings {
  return DEFAULT_SETTINGS;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === SETTINGS_STORAGE_KEY || e.key === THEME_STORAGE_KEY) {
      snapshot = readStorage();
      applyTheme(snapshot.theme);
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Applies the theme class + browser chrome colour to the document. */
export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
}

export function updateSettings(patch: Partial<Pick<AppSettings, "theme" | "profileName" | "dateFormat">>) {
  const next: AppSettings = { ...getSnapshot(), ...patch };
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next.theme);
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ profileName: next.profileName, dateFormat: next.dateFormat }),
    );
  } catch {
    // Storage can be unavailable (private mode). Keep the in-memory value.
  }
  snapshot = next;
  if (patch.theme) applyTheme(next.theme);
  listeners.forEach((l) => l());
}

/** Test helper: forget the cached snapshot so the next read hits storage. */
export function resetSettingsCache() {
  snapshot = null;
}

export function getSettings(): AppSettings {
  return getSnapshot();
}

export function useSettings(): AppSettings {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Inline script for <head>: applies the saved theme before first paint so there is
 * never a flash of the wrong theme. Must stay dependency-free.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');var d=document.documentElement;var l=t==='light';d.classList.toggle('dark',!l);d.style.colorScheme=l?'light':'dark';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',l?'${THEME_COLORS.light}':'${THEME_COLORS.dark}');}catch(e){}})();`;
