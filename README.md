# PRIME OS — Phase 1A (Foundation)

A private, mobile-first cockpit for habits, money, tasks and long-term goals.
Phase 1A ships the foundation only: design system, navigation shell, sign-in,
settings, and installable/offline app support. Habits, money, tasks and the
other modules are placeholders that say "Coming in the next phase".

## Stack

- TanStack Start (React 19 + TypeScript strict) on Vite 7, Tailwind CSS v4
- Lovable Cloud for authentication (email + password, magic link)
- `vite-plugin-pwa` (Workbox `generateSW`) for the installable, offline app shell
- Vitest + Testing Library for tests

## Project layout

```text
src/
  routes/                 file-based routes (/, /daily, /money, /tasks, /more, /settings, /auth)
    _authenticated/       everything here requires a signed-in user
  features/               one folder per feature (auth, home, daily, money, tasks, more, settings)
  components/app/         shared app components (NavBar, BottomSheet, EmptyState, ProgressRing ...)
  components/ui/          base UI primitives (Button, Card, Input, Skeleton ...)
  lib/format.ts           INR money + Asia/Kolkata date formatting
  lib/pwa/register-sw.ts  the only place the service worker is registered
  styles.css              design tokens (colours, radii, spacing) for dark and light themes
```

## Environment variables

These are filled in automatically by Lovable Cloud in `.env`. Only public values are used
in the browser — no service-role key is ever shipped to the frontend.

| Name | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Backend URL used by the browser client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public (anon) key for the browser client |
| `VITE_SUPABASE_PROJECT_ID` | Backend project id |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID` | Same values for server-side code |

When running outside Lovable, copy these into a local `.env` file.

## Creating the first user

Public sign-up is disabled — PRIME OS is invite-only. To create your account:

1. In Lovable, open **Cloud → Users**.
2. Click **Add user → Create new user**, enter your email and a password.
3. Open the app and sign in with that email and password (or request a magic link).

Choosing **Send invitation** instead emails a sign-in link; that account has no password,
so use magic links to sign in afterwards.

If you publish to a custom domain, add that address to the allowed redirect URLs in the
Cloud sign-in settings so magic links return to the right place.

## Running locally

```sh
npm install        # or: bun install
npm run dev        # http://localhost:8080
npm test           # run the test suite once
```

## Deploying

- Click **Publish** in Lovable. The published app is what you install on Android
  (Chrome menu → **Add to Home screen** / **Install app**).
- Offline support only works on the published app. The service worker is deliberately
  never registered in development, in the Lovable editor preview, or inside an iframe.
  Add `?sw=off` to any URL to remove it from a device.
- Connecting GitHub is optional and done from the Lovable project settings.

## Conventions

- Dark theme is the default; the chosen theme is saved in local storage and applied
  before first paint (no flash). A later phase will also store it per user in the database.
- All dates use Asia/Kolkata; the default date format is DD/MM/YYYY.
- Money uses Indian Rupees with Indian digit grouping, e.g. ₹1,23,456.00.
- No invented numbers or fake statistics anywhere — empty states until real data exists.

## Built with Lovable

Continue developing in the
[Lovable editor](https://lovable.dev/projects/e61b1605-42f6-4985-af79-fa2becfaa9bf).
