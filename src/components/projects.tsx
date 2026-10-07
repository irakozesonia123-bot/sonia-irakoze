"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/portfolio";
import type { ProjectCategory } from "@/content/types";
import { StatusPill } from "./status-pill";
import { Tag } from "./section";

const categories: ("All" | ProjectCategory)[] = ["All", "Software", "Mechanical", "Water & Infrastructure", "Data", "Design"];

export function ProjectsGrid() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const reduce = useReducedMotion();
  const visible = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);
  const t = reduce ? { duration: 0 } : { duration: 0.25, ease: [0.2, 0.7, 0.2, 1] as const };

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => {
          const count = c === "All" ? projects.length : projects.filter((p) => p.categories.includes(c)).length;
          const on = filter === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${on ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink"}`}
            >
              {c} <span className={`ml-1 font-mono text-xs ${on ? "opacity-70" : "text-ink-3"}`}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">{visible.length} projects shown</p>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {featured.map((p, i) => (
            <motion.article
              layout={!reduce}
              key={p.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={t}
              className="group grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-line-strong lg:grid-cols-2"
            >
              <Link href={`/projects/${p.slug}`} className={`relative block aspect-[16/10] overflow-hidden bg-surface-2 lg:aspect-auto lg:min-h-[380px] ${i % 2 ? "lg:order-2" : ""}`} tabIndex={-1} aria-hidden>
                {p.cover && <Image src={p.cover.src} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />}
              </Link>
              <div className="flex flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="station !text-[0.66rem]">Featured · {p.year}</span>
                  <StatusPill status={p.status} label={p.statusLabel} />
                </div>
                <h3 className="mt-3 text-3xl font-extrabold leading-tight">
                  <Link href={`/projects/${p.slug}`} className="hover:text-lake">{p.title}</Link>
                </h3>
                <p className="mt-1 text-sm font-semibold text-ink-2">{p.role}</p>
                <p className="mt-4 text-[1.05rem]">{p.tagline}</p>
                <p className="mt-3 line-clamp-3 text-ink-2">{p.problem}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">{p.tech.slice(0, 6).map((x) => <Tag key={x}>{x}</Tag>)}</div>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
                  <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-lake">
                    Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                  {p.links.slice(0, 2).map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-survey">
                      {l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {rest.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {rest.map((p) => (
                <motion.article
                  layout={!reduce}
                  key={p.slug}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={t}
                  className="group relative flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-ink-3">{p.year}</span>
                    <StatusPill status={p.status} label={p.statusLabel} />
                  </div>
                  <h3 className="mt-3 text-xl font-bold leading-snug">
                    <Link href={`/projects/${p.slug}`} className="after:absolute after:inset-0 hover:text-lake">{p.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-ink-2">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{p.tech.slice(0, 4).map((x) => <Tag key={x}>{x}</Tag>)}</div>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-lake">
                    Case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
