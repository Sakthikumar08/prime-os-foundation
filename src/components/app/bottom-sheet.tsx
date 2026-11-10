import type { ReactNode } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/** Forms and quick actions open here. Slides from the bottom; centred and narrow on desktop. */
export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: BottomSheetProps) {
  return (
    <DrawerPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-overlay" />
        <DrawerPrimitive.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[90dvh] w-full max-w-lg flex-col rounded-t-sheet border border-b-0 border-border-strong bg-card shadow-sheet outline-none",
            className,
          )}
        >
          <div className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-border-strong" />
          <div className="px-page pt-4 pb-2">
            <DrawerPrimitive.Title className="font-display text-lg font-semibold">
              {title}
            </DrawerPrimitive.Title>
            {description ? (
              <DrawerPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                {description}
              </DrawerPrimitive.Description>
            ) : (
              <DrawerPrimitive.Description className="sr-only">{title}</DrawerPrimitive.Description>
            )}
          </div>
          <div className="overflow-y-auto px-page pb-6 pb-safe">{children}</div>
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
}
