"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { Project, ProjectCategory } from "@/content/types";

type Filter = "All" | "Flagship" | ProjectCategory;
const noop = () => () => {};
const ORDER: ProjectCategory[] = ["Mechanical", "Software", "Water", "Infrastructure", "Aerospace", "Data & AI", "Design", "Entrepreneurship", "Coursework", "Just for fun"];

/** Searchable, filterable index of every public project. Reads ?filter= so ⌘K can deep-link. */
export function Archive({ projects }: { projects: Project[] }) {
  // ?filter= from the URL (e.g. from ⌘K), read without a post-hydration setState
  const urlFilter = useSyncExternalStore(noop, () => new URLSearchParams(window.location.search).get("filter"), () => null) as Filter | null;
  const [picked, setPicked] = useState<Filter | null>(null);
  const filter: Filter = picked ?? urlFilter ?? "All";
  const [q, setQ] = useState("");

  const filters = useMemo<Filter[]>(() => ["All", "Flagship", ...ORDER.filter((c) => projects.some((p) => p.categories.includes(c)))], [projects]);
  const count = (f: Filter) => (f === "All" ? projects.length : f === "Flagship" ? projects.filter((p) => p.tier === "flagship").length : projects.filter((p) => p.categories.includes(f)).length);

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return projects
      .filter((p) => filter === "All" || (filter === "Flagship" ? p.tier === "flagship" : p.categories.includes(filter)))
      .filter((p) => !term || [p.title, p.tagline, p.role, p.summary, ...p.tools, ...p.categories].join(" ").toLowerCase().includes(term))
      .sort((a, b) => b.sort - a.sort);
  }, [projects, filter, q]);

  const choose = (f: Filter) => {
    setPicked(f);
    const url = new URL(window.location.href);
    if (f === "All") url.searchParams.delete("filter"); else url.searchParams.set("filter", f);
    window.history.replaceState(null, "", url);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const on = filter === f;
            return (
              <button key={f} type="button" aria-pressed={on} onClick={() => choose(f)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink"}`}>
                {f} <span className={`ml-0.5 font-mono text-xs ${on ? "opacity-70" : "text-ink-3"}`}>{count(f)}</span>
              </button>
            );
          })}
        </div>
        <label className="relative block w-full lg:w-64">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" aria-hidden />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search tools, topics…"
            className="w-full rounded-xl border border-line bg-surface py-2 pl-9 pr-3 text-sm outline-none placeholder:text-ink-3 focus:border-ink" />
        </label>
      </div>
      <p className="mt-4 font-mono text-xs text-ink-3" aria-live="polite">{rows.length} of {projects.length} projects</p>

      <ol className="mt-3 divide-y divide-line border-y border-line">
        {rows.map((p) => (
          <li key={p.slug} className="group relative grid gap-x-6 gap-y-1 py-4 transition-colors hover:bg-surface sm:grid-cols-[4.5rem_minmax(0,1.3fr)_minmax(0,1fr)_auto] sm:items-baseline sm:px-3">
            <span className="font-mono text-xs text-ink-3">{p.year}</span>
            <div className="min-w-0">
              <Link href={`/work/${p.slug}`} className="font-semibold after:absolute after:inset-0 group-hover:text-lake">
                {p.title}
                {p.tier === "flagship" && <span className="ml-2 align-middle font-mono text-[0.62rem] uppercase tracking-[0.12em] text-survey-ink">flagship</span>}
              </Link>
              <p className="text-sm text-ink-2">{p.tagline}</p>
            </div>
            <p className="text-sm text-ink-2"><span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-3">Challenge </span>{p.challenge}</p>
            <span className="hidden flex-wrap justify-end gap-1 sm:flex">
              {p.categories.slice(0, 2).map((c) => <span key={c} className="rounded border border-line px-1.5 font-mono text-[0.66rem] text-ink-3">{c}</span>)}
              <ArrowRight className="ml-1 h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-survey" aria-hidden />
            </span>
          </li>
        ))}
        {rows.length === 0 && <li className="py-10 text-center text-ink-3">Nothing matches. Try another filter or word.</li>}
      </ol>
    </div>
  );
}
