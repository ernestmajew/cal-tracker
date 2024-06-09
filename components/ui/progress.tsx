"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  color?: string;
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color = "bg-primary", ...props }, ref) => {
  const progressValue = Math.min(value || 0, 100);
  const overflowValue = (value || 0) > 100 ? value - 100 : 0;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-slate-300",
        className
      )}
      {...props}
    >
      <div className="relative h-full flex w-full">
        <ProgressPrimitive.Indicator
          className={cn("h-full transition-all", color)}
          style={{ width: `${progressValue}%` }}
        />
        {overflowValue > 0 && (
          <div
            className="absolute h-full bg-red-700 transition-all rounded-full"
            style={{
              width: `${overflowValue}%`,
            }}
          />
        )}
      </div>
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
