import { beforeEach, describe, expect, it } from "vitest";

import {
  DEFAULT_SETTINGS,
  THEME_STORAGE_KEY,
  getSettings,
  resetSettingsCache,
  updateSettings,
} from "@/features/settings/settings-store";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.className = "";
  resetSettingsCache();
});

describe("settings defaults", () => {
  it("starts dark, INR, DD/MM/YYYY and Asia/Kolkata", () => {
    expect(getSettings()).toEqual({
      theme: "dark",
      profileName: "",
      currency: "INR",
      dateFormat: "DD/MM/YYYY",
      timezone: "Asia/Kolkata",
    });
    expect(DEFAULT_SETTINGS.theme).toBe("dark");
  });
});

describe("theme persistence", () => {
  it("saves the chosen theme and reads it back after a reload", () => {
    updateSettings({ theme: "light" });
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    resetSettingsCache(); // simulate a fresh page load
    expect(getSettings().theme).toBe("light");
  });

  it("switching back to dark re-applies the dark class", () => {
    updateSettings({ theme: "light" });
    updateSettings({ theme: "dark" });
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    resetSettingsCache();
    expect(getSettings().theme).toBe("dark");
  });

  it("keeps the profile name and date format across reloads", () => {
    updateSettings({ profileName: "Sakthi", dateFormat: "YYYY-MM-DD" });
    resetSettingsCache();
    expect(getSettings().profileName).toBe("Sakthi");
    expect(getSettings().dateFormat).toBe("YYYY-MM-DD");
  });
});
