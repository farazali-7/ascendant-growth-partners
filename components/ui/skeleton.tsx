import { cn } from "@/lib/utils";

/**
 * Loading placeholder. A calm pulse on the sunken surface — no shimmer sweep,
 * which reads busier than it should. Decorative, so it is hidden from assistive
 * technology; announce loading state at the region level instead.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-secondary", className)}
      {...props}
    />
  );
}

export { Skeleton };
