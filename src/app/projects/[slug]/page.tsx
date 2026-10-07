import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/content/portfolio";
import { StatusPill } from "@/components/status-pill";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.tagline,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.tagline, url: `/projects/${p.slug}`, images: p.cover ? [{ url: p.cover.src, alt: p.cover.alt }] : undefined },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-8">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
        <ArrowLeft className="h-4 w-4" aria-hidden /> All projects
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="station">Case study · {p.year}</span>
          <StatusPill status={p.status} label={p.statusLabel} />
        </div>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">{p.title}</h1>
        <p className="mt-4 max-w-2xl font-display text-xl font-medium leading-snug text-ink-2 sm:text-2xl">{p.tagline}</p>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line text-sm sm:grid-cols-3">
          <div className="bg-surface p-4"><dt className="station !text-ink-3">Role</dt><dd className="mt-1">{p.role}</dd></div>
          <div className="bg-surface p-4"><dt className="station !text-ink-3">Stack & methods</dt><dd className="mt-1">{p.tech.join(", ")}</dd></div>
          <div className="bg-surface p-4">
            <dt className="station !text-ink-3">Links</dt>
            <dd className="mt-1 flex flex-col gap-1">
              {p.links.length ? p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 underline decoration-line-strong underline-offset-4 hover:decoration-survey">
                  {l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              )) : <span className="text-ink-3">Private or proprietary</span>}
            </dd>
          </div>
        </dl>
      </header>

      {p.cover && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-surface-2">
          <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover object-top" />
        </div>
      )}

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="space-y-12">
          <Block title="The problem"><p>{p.problem}</p></Block>
          <Block title="What I did"><List items={p.approach} /></Block>
          {p.architecture && (
            <Block title="How it fits together">
              <ol className="grid gap-2 sm:grid-cols-2">
                {p.architecture.map((a, i) => (
                  <li key={a.label} className="rounded-xl border border-line bg-surface p-4">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-survey-ink">{String(i + 1).padStart(2, "0")} · {a.label}</p>
                    <p className="mt-1">{a.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>
          )}
          <Block title="Constraints & challenges"><List items={p.challenges} /></Block>
          <Block title="Results & current status"><List items={p.outcome} /></Block>
          <Block title="What I learned">
            <p className={`border-l-[3px] border-survey pl-5 font-display text-xl leading-snug ${p.lessons.includes("[ADD") ? "text-survey-ink" : ""}`}>{p.lessons}</p>
          </Block>
        </div>
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28 space-y-2 text-sm text-ink-2">
            <p className="station !text-ink-3">On this page</p>
            {["The problem", "What I did", p.architecture && "How it fits together", "Constraints & challenges", "Results & current status", "What I learned", p.gallery.length > 0 && "Gallery"].filter(Boolean).map((t) => (
              <a key={t as string} href={`#${slugify(t as string)}`} className="block hover:text-ink">{t}</a>
            ))}
          </nav>
        </aside>
      </div>

      {p.gallery.length > 0 ? (
        <section id="gallery" aria-labelledby="gallery-title" className="mt-16 scroll-mt-28">
          <h2 id="gallery-title" className="text-2xl font-bold">Gallery</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {p.gallery.map((g) => (
              <figure key={g.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
                <a href={g.src} target="_blank" rel="noopener" className="relative block aspect-[4/3] bg-surface-2" aria-label={`Open full image: ${g.caption}`}>
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 640px) 480px, 100vw" className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]" />
                </a>
                <figcaption className="px-4 py-3 text-sm text-ink-2">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : p.slug === "cubesat-and-aero-design" ? (
        <div className="mt-16 rounded-2xl border border-dashed border-survey/60 p-8 text-center font-mono text-sm text-survey-ink">[ADD PROJECT SCREENSHOT — CAD model, FEA plot, or prototype photo]</div>
      ) : null}

      <Link href={`/projects/${next.slug}`} className="group mt-20 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-6 hover:border-line-strong">
        <div>
          <p className="station !text-ink-3">Next project</p>
          <p className="mt-1 text-xl font-bold group-hover:text-lake">{next.title}</p>
        </div>
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section id={slugify(title)} aria-labelledby={`${slugify(title)}-h`} className="scroll-mt-28">
      <h2 id={`${slugify(title)}-h`} className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="text-[1.05rem] leading-relaxed text-ink-2 [&_p]:max-w-[68ch]">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((x) => (
        <li key={x} className="flex gap-3"><span className="mt-[0.72rem] h-[3px] w-3 flex-none bg-survey" aria-hidden /><span className="max-w-[66ch]">{x}</span></li>
      ))}
    </ul>
  );
}
