"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Search that expands inline from its icon instead of routing away, keeping the
 * visitor in their browsing flow.
 *
 * The field grows from the icon's footprint, the placeholder fades in, and the
 * caret lands ready. Escape or an empty blur collapses it. Submitting routes to
 * the results page (built in a later stage); until then the interaction is
 * fully wired but the destination will 404.
 */
export function SearchField({ className }: { className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  const collapse = () => {
    setExpanded(false);
    setQuery("");
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      collapse();
      return;
    }
    router.push(`/insights?q=${encodeURIComponent(trimmed)}`);
    collapse();
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      data-expanded={expanded}
      className={cn(
        "group/search relative flex h-9 items-center overflow-hidden rounded-lg border border-transparent transition-[width,background-color,border-color] duration-(--dur-search) ease-editorial",
        expanded
          ? "w-[min(18rem,58vw)] border-border bg-card"
          : "w-9 bg-transparent hover:bg-[color-mix(in_oklab,var(--agp-ink)_5%,transparent)]",
        className,
      )}
    >
      <button
        type={expanded ? "submit" : "button"}
        onClick={() => {
          if (!expanded) setExpanded(true);
        }}
        aria-label={expanded ? "Submit search" : "Open search"}
        aria-expanded={expanded}
        className="grid size-9 shrink-0 place-items-center rounded-lg text-current transition-colors duration-(--dur-icon) ease-editorial"
      >
        <Search aria-hidden="true" className="size-4" />
      </button>

      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") collapse();
        }}
        onBlur={() => {
          if (!query.trim()) collapse();
        }}
        placeholder="Search insights…"
        aria-label="Search insights"
        tabIndex={expanded ? undefined : -1}
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent pr-2 text-body-sm text-foreground outline-none placeholder:text-muted-foreground",
          "transition-opacity duration-(--dur-search) ease-editorial",
          expanded ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {expanded ? (
        <button
          type="button"
          onClick={collapse}
          aria-label="Close search"
          className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors duration-(--dur-icon) ease-editorial hover:text-foreground"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </form>
  );
}
