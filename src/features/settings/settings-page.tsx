import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { ChevronDown, LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { PageHeader } from "@/components/app/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, inputClasses } from "@/components/ui/input";
import { signOut } from "@/features/auth/session";
import { updateSettings, useSettings, type Theme } from "@/features/settings/settings-store";
import { DATE_FORMATS, formatDate, formatINR, type DateFormat } from "@/lib/format";
import { cn } from "@/lib/utils";

export function SettingsPage() {
  const settings = useSettings();
  const { user } = useRouteContext({ from: "/_authenticated" });

  return (
    <div className="fade-in-up">
      <PageHeader eyebrow="Preferences" title="Settings" />

      <div className="flex flex-col gap-6">
        <Section title="Appearance">
          <Row label="Theme" description="Dark is the default.">
            <ThemeToggle value={settings.theme} />
          </Row>
        </Section>

        <Section title="Profile">
          <ProfileNameForm initial={settings.profileName} />
        </Section>

        <Section title="Region">
          <Row label="Currency" description={`Example format: ${formatINR(123456)}`}>
            <span className="text-sm font-semibold">₹ INR</span>
          </Row>
          <Divider />
          <DateFormatRow value={settings.dateFormat} />
          <Divider />
          <Row label="Timezone" description="All dates and days follow this zone.">
            <span className="text-right text-sm font-semibold">
              Asia/Kolkata
              <span className="block text-xs font-normal text-muted-foreground">IST · UTC+05:30</span>
            </span>
          </Row>
        </Section>

        <Section title="Account">
          <Row label="Signed in as" description={user.email ?? "Private account"}>
            <span />
          </Row>
          <div className="px-5 pb-5">
            <SignOutButton />
          </div>
        </Section>

        <p className="pb-2 text-center text-xs text-muted-foreground">PRIME OS · Foundation</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2.5 px-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h2>
      <Card>{children}</Card>
    </section>
  );
}

function Row({
  label,
  description,
  children,
  htmlFor,
}: {
  label: string;
  description?: string;
  children: ReactNode;
  htmlFor?: string;
}) {
  const LabelTag = htmlFor ? "label" : "div";
  return (
    <div className="flex min-h-16 items-center justify-between gap-4 px-5 py-4">
      <LabelTag htmlFor={htmlFor} className="min-w-0">
        <span className="block font-medium">{label}</span>
        {description && (
          <span className="mt-0.5 block truncate text-sm text-muted-foreground">{description}</span>
        )}
      </LabelTag>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="mx-5 h-px bg-border" />;
}

function ThemeToggle({ value }: { value: Theme }) {
  const options: { value: Theme; label: string; icon: typeof Moon }[] = [
    { value: "dark", label: "Dark", icon: Moon },
    { value: "light", label: "Light", icon: Sun },
  ];
  return (
    <div role="radiogroup" aria-label="Theme" className="flex rounded-control bg-surface-raised p-1">
      {options.map(({ value: v, label, icon: Icon }) => {
        const active = v === value;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => updateSettings({ theme: v })}
            className={cn(
              "flex h-11 items-center gap-1.5 rounded-[10px] px-3.5 text-sm font-semibold transition-colors duration-200",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function ProfileNameForm({ initial }: { initial: string }) {
  const id = useId();
  const [name, setName] = useState(initial);
  useEffect(() => setName(initial), [initial]);
  const dirty = name.trim() !== initial;

  return (
    <form
      className="flex flex-col gap-3 p-5"
      onSubmit={(e) => {
        e.preventDefault();
        updateSettings({ profileName: name.trim().slice(0, 60) });
        toast.success("Name saved");
      }}
    >
      <label htmlFor={id} className="font-medium">
        Your name
      </label>
      <Input
        id={id}
        value={name}
        maxLength={60}
        autoComplete="name"
        placeholder="How should PRIME OS greet you?"
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" variant="secondary" disabled={!dirty} className="self-end">
        Save name
      </Button>
    </form>
  );
}

function DateFormatRow({ value }: { value: DateFormat }) {
  const id = useId();
  const [now] = useState(() => new Date());
  return (
    <Row label="Date format" description={`Today: ${formatDate(now, value)}`} htmlFor={id}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => updateSettings({ dateFormat: e.target.value as DateFormat })}
          className={cn(inputClasses, "w-40 appearance-none pr-10 text-sm font-semibold")}
        >
          {DATE_FORMATS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
      </div>
    </Row>
  );
}

function SignOutButton() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="destructive"
      className="w-full"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await signOut(queryClient);
          await navigate({ to: "/auth", search: { reason: "signed-out" }, replace: true });
        } catch {
          setBusy(false);
          toast.error("Couldn't sign out. Check your connection and try again.");
        }
      }}
    >
      <LogOut aria-hidden />
      {busy ? "Signing out…" : "Sign out"}
    </Button>
  );
}
