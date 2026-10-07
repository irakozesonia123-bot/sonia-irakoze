import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { StatusPill } from "../status-pill";
import { Tag } from "../section";

/** Big, alternating editorial treatment for flagship projects. */
export function FlagshipFeature({ p, index }: { p: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="group grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-line-strong lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <Link href={`/work/${p.slug}`} tabIndex={-1} aria-hidden className={`relative block aspect-[16/10] overflow-hidden bg-surface-2 lg:aspect-auto lg:min-h-[400px] ${flip ? "lg:order-2" : ""}`}>
        {p.cover ? (
          <Image src={p.cover.src} alt="" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
        ) : (
          <DataPlate p={p} />
        )}
        <span className="absolute left-4 top-4 rounded-md bg-bg/85 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink backdrop-blur">Flagship · {p.categories[0]}</span>
      </Link>
      <div className="flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-ink-3">{p.year}</span>
          <StatusPill status={p.status} label={p.statusLabel} />
        </div>
        <h3 className="mt-3 text-3xl font-extrabold leading-tight">
          <Link href={`/work/${p.slug}`} className="hover:text-lake">{p.title}</Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-ink-2">{p.role}</p>
        <p className="mt-4 font-display text-lg leading-snug">{p.tagline}</p>
        <p className="mt-3 text-ink-2">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">{p.tools.slice(0, 6).map((x) => <Tag key={x}>{x}</Tag>)}</div>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <Link href={`/work/${p.slug}`} className="inline-flex items-center gap-1.5 font-semibold hover:text-lake">
            Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          {p.links.slice(0, 2).map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-survey">
              {l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Image stand-in for projects whose work is proprietary or still awaiting photos. */
export function DataPlate({ p, compact = false }: { p: Project; compact?: boolean }) {
  const stats = p.story?.find((b) => b.type === "stats");
  if (compact) {
    const s = stats && stats.type === "stats" ? stats.stats[0] : null;
    return (
      <div className="absolute inset-0 flex flex-col justify-end bg-[radial-gradient(circle_at_70%_30%,var(--lake-soft),transparent_70%)] p-4">
        <div className="drafting-grid absolute inset-0" aria-hidden />
        {s && <p className="relative font-display text-4xl font-extrabold text-lake">{s.value}</p>}
        {s && <p className="relative text-xs leading-snug text-ink-2">{s.label}</p>}
      </div>
    );
  }
  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_70%_30%,var(--lake-soft),transparent_60%)] p-8">
      <div className="drafting-grid absolute inset-0 opacity-70" aria-hidden />
      <dl className="relative grid w-full max-w-sm grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink/60 bg-ink/60">
        {stats && stats.type === "stats" ? stats.stats.slice(0, 4).map((s) => (
          <div key={s.label} className="bg-surface p-4">
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-display text-3xl font-extrabold text-lake">{s.value}</dd>
            <dd className="mt-1 text-xs leading-snug text-ink-2">{s.label}</dd>
          </div>
        )) : <div className="col-span-2 bg-surface p-6 font-mono text-sm text-ink-2">{p.challenge}</div>}
      </dl>
    </div>
  );
}

/** Compact card for supporting projects. */
export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong">
      {p.cover ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
          <Image src={p.cover.src} alt="" fill sizes="(min-width: 768px) 360px, 100vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      ) : (
        <div className="relative flex aspect-[16/9] items-end bg-surface-2 p-4">
          <div className="drafting-grid absolute inset-0" aria-hidden />
          <p className="relative font-mono text-xs leading-relaxed text-ink-2"><span className="text-survey-ink">Challenge ·</span> {p.challenge}</p>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-ink-3">{p.year}</span>
          <StatusPill status={p.status} label={p.statusLabel} />
        </div>
        <h3 className="mt-3 text-xl font-bold leading-snug">
          <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 hover:text-lake">{p.title}</Link>
        </h3>
        <p className="mt-1 text-sm text-ink-2">{p.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">{p.tools.slice(0, 4).map((x) => <Tag key={x}>{x}</Tag>)}</div>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-lake">
          Case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </article>
  );
}
