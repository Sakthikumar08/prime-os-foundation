import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AppShell } from "@/components/app/app-shell";
import { ShellSkeleton } from "@/components/app/page-skeleton";
import { RouteError } from "@/components/app/route-states";
import { isNetworkAuthError } from "@/features/auth/auth-errors";
import { supabase } from "@/integrations/supabase/client";

// Re-verify the session with the server at most every few minutes; offline we trust the local session.
let lastVerifiedAt = 0;
const VERIFY_EVERY_MS = 5 * 60 * 1000;

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;
    if (!session) throw redirect({ to: "/auth" });

    if (Date.now() - lastVerifiedAt > VERIFY_EVERY_MS) {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error && !isNetworkAuthError(error)) {
        await supabase.auth.signOut({ scope: "local" });
        throw redirect({ to: "/auth", search: { reason: "expired" } });
      }
      if (userData.user) lastVerifiedAt = Date.now();
      return { user: userData.user ?? session.user };
    }
    return { user: session.user };
  },
  // pendingComponent: ShellSkeleton,
  errorComponent: RouteError,
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
