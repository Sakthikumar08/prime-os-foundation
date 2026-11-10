import { RotateCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export function ErrorState({
  title = "This screen didn't load",
  message = "Something went wrong while opening this page. Your data is safe — try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Card role="alert" className="flex flex-col items-center px-6 py-10 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive">
        <TriangleAlert className="size-6" strokeWidth={1.75} aria-hidden />
      </div>
      <h2 className="mt-5 text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{message}</p>
      <Button variant="outline" className="mt-6 w-full max-w-xs" onClick={onRetry}>
        <RotateCcw aria-hidden />
        Retry
      </Button>
    </Card>
  );
}
