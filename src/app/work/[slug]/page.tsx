import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, publicProjects } from "@/content/projects";
import { publicExperience } from "@/content/experience";
import { StatusPill } from "@/components/status-pill";
import { Evidence } from "@/components/evidence";
import { Story, blockId } from "@/components/work/story";
import { DataPlate } from "@/components/work/project-cards";

export function generateStaticParams() {
  return publicProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.tagline} ${p.summary}`.slice(0, 300),
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: p.title, description: p.tagline, url: `/work/${p.slug}`, images: p.cover ? [{ url: p.cover.src, alt: p.cover.alt }] : undefined },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = publicProjects.findIndex((x) => x.slug === p.slug);
  const next = publicProjects[(idx + 1) % publicProjects.length];
  const relatedProjects = (p.related?.projects ?? []).map((s) => getProject(s)).filter(Boolean);
  const relatedExp = publicExperience.filter((e) => p.related?.experience?.includes(e.id));
  const toc = (p.story ?? []).map((b) => ({ id: blockId(b), title: "title" in b ? b.title : undefined })).filter((t) => t.id && t.title);
  const tierLabel = p.tier === "flagship" ? "Flagship" : p.tier === "supporting" ? "Supporting" : "Archive";

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="drafting-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-8">
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden /> All work
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="station">Case study · {tierLabel} · {p.year}</span>
            <StatusPill status={p.status} label={p.statusLabel} />
          </div>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">{p.title}</h1>
          <p className="mt-4 max-w-2xl font-display text-xl font-medium leading-snug text-ink-2 sm:text-2xl">{p.tagline}</p>
          <dl className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-2xl border border-line bg-line text-sm sm:grid-cols-3">
            <div className="bg-surface p-4"><dt className="station !text-ink-3">My role</dt><dd className="mt-1">{p.role}{p.team ? <span className="mt-1 block text-ink-2">{p.team}</span> : null}</dd></div>
            <div className="bg-surface p-4"><dt className="station !text-ink-3">Tools & methods</dt><dd className="mt-1">{p.tools.join(", ")}</dd></div>
            <div className="bg-surface p-4">
              <dt className="station !text-ink-3">Links</dt>
              <dd className="mt-1 flex flex-col gap-1">
                {p.links.length ? p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener" className="inline-flex w-fit items-center gap-1 underline decoration-line-strong underline-offset-4 hover:decoration-survey">{l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>
                )) : <span className="text-ink-3">Coursework, proprietary, or private repository</span>}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-line bg-surface-2">
          {p.cover ? <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="(min-width: 1152px) 1088px, 100vw" className="object-cover object-top" /> : <DataPlate p={p} />}
        </div>

        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="min-w-0">
            {p.story ? <Story blocks={p.story} /> : <p className="text-lg text-ink-2">{p.summary}</p>}
            {p.artifacts && p.artifacts.length > 0 && (
              <section aria-label="Evidence" className="mt-14"><Evidence items={p.artifacts} /></section>
            )}
          </div>
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28 space-y-2 text-sm text-ink-2">
              <p className="station !text-ink-3">On this sheet</p>
              {toc.map((t) => <a key={t.id} href={`#${t.id}`} className="block hover:text-ink">{t.title}</a>)}
              {(relatedProjects.length > 0 || relatedExp.length > 0) && (
                <div className="mt-6 border-t border-line pt-4">
                  <p className="station !text-ink-3">Connected to</p>
                  {relatedProjects.map((r) => r && <Link key={r.slug} href={`/work/${r.slug}`} className="mt-2 block hover:text-ink">{r.title}</Link>)}
                  {relatedExp.map((e) => <Link key={e.id} href={`/experience#${e.id}`} className="mt-2 block hover:text-ink">{e.org}</Link>)}
                </div>
              )}
            </nav>
          </aside>
        </div>

        <Link href={`/work/${next.slug}`} className="group mt-20 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 hover:border-line-strong">
          <div>
            <p className="station !text-ink-3">Next sheet</p>
            <p className="mt-1 text-xl font-bold group-hover:text-lake">{next.title}</p>
          </div>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
