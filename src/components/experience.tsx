"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { experience } from "@/content/portfolio";
import { Tag } from "./section";

export function ExperienceList() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <ol className="space-y-4">
      {experience.map((e, i) => {
        const open = openIdx === i;
        const hasMore = (e.details?.length ?? 0) > 0 || e.highlights.length > 2;
        const shown = open ? e.highlights : e.highlights.slice(0, 2);
        return (
          <li key={`${e.company}-${e.role}`} className="group rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong">
            <div className="grid gap-x-8 gap-y-3 p-5 sm:p-6 md:grid-cols-[13rem_minmax(0,1fr)]">
              <div className="md:border-r md:border-line md:pr-6">
                <p className="font-mono text-xs text-ink-3">{e.start} – {e.end}</p>
                <p className="mt-1 text-sm text-ink-2">{e.location}</p>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-bold leading-snug">
                  {e.role} <span className="text-lake">· {e.company}</span>
                </h3>
                {e.team && <p className="text-sm text-ink-2">{e.team}</p>}
                <p className="mt-3 text-ink-2">{e.summary}</p>
                <ul className="mt-3 space-y-1.5">
                  {shown.map((h) => (
                    <li key={h} className="flex gap-2.5"><span className="mt-[0.7rem] h-[3px] w-3 flex-none bg-survey" aria-hidden />{h}</li>
                  ))}
                </ul>
                {open && e.details && (
                  <ul id={`exp-more-${i}`} className="mt-3 space-y-1.5 border-l-2 border-line pl-4 text-[0.95rem] text-ink-2">
                    {e.details.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {e.tech.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {hasMore && (
                    <button
                      type="button"
                      onClick={() => setOpenIdx(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`exp-more-${i}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-lake hover:text-ink"
                    >
                      {open ? "Show less" : "Show details"}
                      <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                  )}
                  {e.link && (
                    <a href={e.link.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">
                      {e.link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
