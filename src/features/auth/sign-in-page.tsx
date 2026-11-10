import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Info, Mail, MailCheck, TriangleAlert } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { LogoMark, Wordmark } from "@/components/app/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import {
  EXPIRED_SESSION_MESSAGE,
  NETWORK_ERROR_MESSAGE,
  PRIVATE_APP_MESSAGE,
  describeAuthError,
} from "@/features/auth/auth-errors";
import type { AuthReason } from "@/features/auth/session";

export function SignInPage({ reason }: { reason?: AuthReason }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState<"password" | "magic" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [linkSentTo, setLinkSentTo] = useState<string | null>(null);
  const [showPrivate, setShowPrivate] = useState(false);

  // Already signed in (or returning from a magic link)? Go straight to the app.
  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) void navigate({ to: "/", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) void navigate({ to: "/", replace: true });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  async function onPasswordSignIn(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!navigator.onLine) return setError(NETWORK_ERROR_MESSAGE);
    setBusy("password");
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (err) setError(describeAuthError(err));
      else await navigate({ to: "/", replace: true });
    } catch (err) {
      setError(describeAuthError(err));
    } finally {
      setBusy(null);
    }
  }

  async function onMagicLink() {
    setError(null);
    if (!email.trim()) return setError("Enter your email first, then request a magic link.");
    if (!navigator.onLine) return setError(NETWORK_ERROR_MESSAGE);
    setBusy("magic");
    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/auth` },
      });
      if (err) setError(describeAuthError(err));
      else setLinkSentTo(email.trim());
    } catch (err) {
      setError(describeAuthError(err));
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-page py-10">
      <div className="fade-in-up w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark className="size-14" />
          <Wordmark className="mt-4 text-2xl" />
          <p className="mt-1.5 text-sm text-muted-foreground">Your private performance cockpit</p>
        </div>

        <Card className="p-6">
          {reason === "expired" && !error && (
            <Notice tone="info">{EXPIRED_SESSION_MESSAGE}</Notice>
          )}
          {reason === "signed-out" && !error && <Notice tone="info">You've signed out.</Notice>}
          {error && <Notice tone="error">{error}</Notice>}

          {linkSentTo ? (
            <div className="flex flex-col items-center py-4 text-center" role="status">
              <MailCheck className="size-10 text-accent-ink" strokeWidth={1.5} aria-hidden />
              <h1 className="mt-4 text-lg font-semibold">Check your inbox</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We sent a sign-in link to <span className="font-medium text-foreground">{linkSentTo}</span>.
              </p>
              <Button variant="ghost" className="mt-4" onClick={() => setLinkSentTo(null)}>
                Use a different method
              </Button>
            </div>
          ) : (
            <form onSubmit={onPasswordSignIn} className="flex flex-col gap-4" noValidate>
              <h1 className="font-display text-xl font-semibold">Sign in</h1>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute top-0 right-0 flex size-12 items-center justify-center rounded-control text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={busy !== null || !email || !password} className="mt-1">
                {busy === "password" ? "Signing in…" : "Sign in"}
              </Button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" />
              </div>
              <Button type="button" variant="outline" disabled={busy !== null} onClick={onMagicLink}>
                <Mail aria-hidden />
                {busy === "magic" ? "Sending…" : "Send magic link"}
              </Button>
            </form>
          )}
        </Card>

        <div className="mt-6 text-center">
          <Button variant="link" size="sm" onClick={() => setShowPrivate((s) => !s)}>
            New here? Create an account
          </Button>
          {showPrivate && (
            <p role="status" className="fade-in-up mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
              {PRIVATE_APP_MESSAGE}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function Notice({ tone, children }: { tone: "info" | "error"; children: string }) {
  const Icon = tone === "error" ? TriangleAlert : Info;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={
        tone === "error"
          ? "mb-5 flex gap-2.5 rounded-control border border-destructive/30 bg-destructive/10 p-3 text-sm text-foreground"
          : "mb-5 flex gap-2.5 rounded-control border border-border-strong bg-surface-raised p-3 text-sm text-foreground"
      }
    >
      <Icon className={tone === "error" ? "mt-0.5 size-4 shrink-0 text-destructive" : "mt-0.5 size-4 shrink-0 text-accent-ink"} aria-hidden />
      <span>{children}</span>
    </div>
  );
}
