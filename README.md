# PRIME OS Foundation

Build PHASE 1A (Foundation) of a premium, mobile-first personal life management app called PRIME OS. Build ONLY this phase. Do not build habits, money, tasks or any later module yet.

PRODUCT: PRIME OS is one private app to manage daily habits, finances, tasks and long-term goals. It must feel like a performance cockpit for one disciplined person, NOT a generic admin dashboard and NOT a default template. Single private user for now, but structure everything so it can support many independent users later.

BRAND AND DESIGN SYSTEM
- Name: PRIME OS. Personality: disciplined, confident, premium, calm.
- Dark Mode is the DEFAULT. Light Mode also supported. Near-black dark background, slightly lifted card surfaces, ONE signature accent colour (electric lime or amber, pick one and use it sparingly), muted grey secondary text. Success green and alert red only for meaning.
- Typography: one display font for headings and large numerals (tabular numerals for scores and money), one clean sans for body.
- Rounded cards (20px radius), 1px subtle borders, simple line icons from a single icon set. Soft glow only on a hero card.
- Motion: short transitions (150-250ms) only. No looping animations. Respect prefers-reduced-motion.
- Touch targets at least 44px. WCAG AA contrast in both themes. Visible focus rings.
- Forms open as bottom sheets on mobile. Layout is mobile-first (design at 360px width), with a side navigation rail on tablet and desktop.

THEME
- Theme toggle lives in Settings. The chosen theme is saved in local storage now (and will be stored in the database for the signed-in user later). It must persist after refresh and after closing and reopening the app. Avoid any flash of the wrong theme on load.

NAVIGATION SHELL
- Bottom navigation with five items: Home, Daily, Money, Tasks, More. A floating quick-add button above the nav (opens a bottom sheet with three placeholder actions: Habit, Expense, Task, marked as coming in the next phase).
- Pages for this phase: Home, Daily, Money, Tasks as polished placeholder screens that each show a proper EMPTY STATE (icon, short message, disabled primary action labelled 'Coming in the next phase'). Never show invented numbers or fake statistics anywhere.
- More page: list of modules as polished 'Coming Soon' cards: Goals, Fitness, Nutrition, Cricket, Career, Communication, Grooming, Creativity, Travel, plus Settings (functional).
- Settings page (functional in this phase): theme toggle (Dark/Light), profile name field (saved locally for now), currency shown as INR with the rupee symbol (default), date format dropdown (DD/MM/YYYY default), timezone shown as Asia/Kolkata, sign out button.

AUTHENTICATION
- Use Supabase authentication (email and password, plus optional magic link). Create a clean Sign-in page: centred card, logo, email, password, 'Send magic link' option, theme-aware, with clear error messages for wrong password, expired session and network errors.
- Public sign-up must be DISABLED. Only an invited or manually created user can sign in. If someone tries to sign up, show a polite message that PRIME OS is private.
- Protect all app routes: a signed-out user is redirected to Sign-in. Handle session refresh and sign-out.
- Never expose any service-role key in frontend code. Use only the public anon key.

PWA
- Make it an installable Progressive Web App for Android home-screen install: web app manifest (name PRIME OS, short name PRIME, dark theme colour, standalone display), maskable and standard icons (simple lime 'P' mark on near-black), and a service worker (for example vite-plugin-pwa) so the app shell loads instantly and works offline.
- Show a subtle Offline indicator when the connection is lost.

ENGINEERING RULES
- React + TypeScript (strict) + Vite + Tailwind CSS. Reusable components (Button, Card, BottomSheet, Input, EmptyState, Skeleton, Toast, ProgressRing, PageHeader, NavBar).
- Organise code by feature folders (features/home, features/daily, features/money, features/tasks, features/settings, features/auth) with shared components and a single design-tokens file for colours, radii and spacing.
- Every page must have: a loading skeleton, a friendly empty state, and a readable error state with Retry.
- Dates use Asia/Kolkata. Money formatting uses Indian numbering with the rupee symbol (for example Rs 1,23,456.00 shown with the rupee sign).
- Add a README covering setup, environment variables, running, and deployment.

WHEN DONE, summarise what you built and list anything that needs me to do manually (for example connecting Supabase, creating the first user, disabling public sign-ups, and connecting GitHub). Do not start later phases.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e61b1605-42f6-4985-af79-fa2becfaa9bf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
