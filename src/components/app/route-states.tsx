import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { useEffect } from "react";

import { ErrorState } from "@/components/app/error-state";
import { reportLovableError } from "@/lib/lovable-error-reporting";

/** Route-level error boundary: readable message with Retry. */
export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "prime_route_error" });
  }, [error]);

  return (
    <ErrorState
      onRetry={() => {
        void router.invalidate();
        reset();
      }}
    />
  );
}
