// Test-only stand-in for vite-plugin-pwa's virtual module (the plugin isn't loaded under vitest).
export function registerSW(_options?: unknown) {
  return async (_reload?: boolean) => {};
}
