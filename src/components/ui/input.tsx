import * as React from "react";

import { cn } from "@/lib/utils";

export const inputClasses =
  "flex h-12 w-full rounded-control border border-input bg-surface-raised px-4 text-base text-foreground transition-[border-color,background-color] duration-200 ease-snappy placeholder:text-muted-foreground hover:border-border-strong focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return <input type={type} className={cn(inputClasses, className)} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

export { Input };
