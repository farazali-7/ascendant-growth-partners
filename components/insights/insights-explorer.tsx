"use client";

import { useMemo, useState } from "react";

import { InsightCard } from "@/components/sections/insight-card";
import { EmptyState } from "@/components/shared";
import { cn } from "@/lib/utils";
import {
  allInsights,
  insightCategories,
  type InsightCategory,
} from "./insights-data";

/**
 * The Insights index: a working category filter over the catalogue, an
 * editorial empty state, and a pagination placeholder.
 *
 * Filtering is real (the data is static, so it costs nothing) rather than
 * decorative — the page behaves like a living publication. The chip row is a
 * single-select group announced to assistive technology via aria-pressed.
 */
export function InsightsExplorer() {
  const [active, setActive] = useState<InsightCategory>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? allInsights
        : allInsights.filter((article) => article.category === active),
    [active],
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Filters */}
      <div
        role="group"
        aria-label="Filter insights by category"
        className="flex flex-wrap gap-2"
      >
        {insightCategories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={cn(
                "rounded-lg border px-4 py-2 text-body-sm transition-colors duration-(--dur-color) ease-editorial",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-ink-secondary hover:border-border-strong hover:text-foreground",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <li key={article.href} className="flex">
                <InsightCard article={article} />
              </li>
            ))}
          </ul>

          {/* Pagination placeholder — visual, for when the catalogue grows. */}
          <nav
            aria-label="Insights pages"
            className="flex items-center justify-center gap-1 pt-2"
          >
            <span className="cursor-not-allowed px-3 py-2 text-body-sm text-muted-foreground">
              Previous
            </span>
            <span
              aria-current="page"
              className="grid size-9 place-items-center rounded-md bg-secondary text-body-sm font-medium text-foreground"
            >
              1
            </span>
            <span className="grid size-9 place-items-center rounded-md text-body-sm text-muted-foreground">
              2
            </span>
            <span className="grid size-9 place-items-center rounded-md text-body-sm text-muted-foreground">
              3
            </span>
            <span className="px-3 py-2 text-body-sm text-ink-secondary">
              Next
            </span>
          </nav>
        </>
      ) : (
        <EmptyState
          title="New insights coming soon."
          description="We publish deliberately rather than often. Nothing in this category yet — check back shortly."
        />
      )}
    </div>
  );
}
