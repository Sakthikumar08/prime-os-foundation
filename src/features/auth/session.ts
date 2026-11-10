import type { QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Distinguishes a sign-out the user asked for from one caused by an expired or revoked
 * session, so the sign-in screen can explain what happened.
 */
let manualSignOut = false;

export function consumeManualSignOut(): boolean {
  const was = manualSignOut;
  manualSignOut = false;
  return was;
}

export async function signOut(queryClient: QueryClient) {
  manualSignOut = true;
  await queryClient.cancelQueries();
  queryClient.clear();
  await supabase.auth.signOut();
}

export type AuthReason = "expired" | "signed-out";

export function parseAuthReason(value: unknown): AuthReason | undefined {
  return value === "expired" || value === "signed-out" ? value : undefined;
}
