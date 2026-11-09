"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";

const FILTERS = ["All", "Engineering", "Software & Data", "Ventures & Community"] as const;
type F = (typeof FILTERS)[number];
type Item = { id: string; filters: string[]; node: ReactNode };

const noop = () => () => {};

/** One collection, four filters. Cards are rendered on the server and passed in. */
export function WorkFilters({ main, more }: { main: Item[]; more: Item[] }) {
  const fromUrl = useSyncExternalStore(noop, () => new URLSearchParams(window.location.search).get("filter"), () => null);
  const [picked, setPicked] = useState<F | null>(null);
  const active: F = picked ?? (FILTERS.includes(fromUrl as F) ? (fromUrl as F) : "All");

  const choose = (f: F) => {
    setPicked(f);
    const url = new URL(window.location.href);
    if (f === "All") url.searchParams.delete("filter");
    else url.searchParams.set("filter", f);
    window.history.replaceState(null, "", url);
  };

  const match = (i: Item) => active === "All" || i.filters.includes(active);
  const shownMain = main.filter(match);
  const shownMore = more.filter(match);
  const count = (f: F) => [...main, ...more].filter((i) => f === "All" || i.filters.includes(f)).length;

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => choose(f)}
            className={`rounded-full border px-4 py-2 text-[0.95rem] font-semibold transition-colors ${active === f ? "border-ink bg-ink text-bg" : "border-line-strong text-ink-2 hover:border-ink hover:text-ink"}`}
          >
            {f} <span className={`ml-1 font-mono text-xs ${active === f ? "text-bg/75" : "text-ink-3"}`}>{count(f)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{`Showing ${shownMain.length + shownMore.length} projects`}</p>

      <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {shownMain.map((i) => <li key={i.id}>{i.node}</li>)}
      </ul>

      {shownMore.length > 0 && (
        <section aria-labelledby="more-title" className="mt-20">
          <h2 id="more-title" className="text-2xl font-extrabold">Earlier and smaller work</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {shownMore.map((i) => <li key={i.id}>{i.node}</li>)}
          </ul>
        </section>
      )}
    </>
  );
}
