import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { getProject, publicProjects } from "@/content/projects";
import { publicExperience } from "@/content/experience";
import { Story } from "@/components/work/story";
import { ProjectCover } from "@/components/work/project-card";
import { Tag } from "@/components/section";

export function generateStaticParams() {
  return publicProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.kind} ${p.outcome}.`.slice(0, 300),
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: p.title, description: p.kind, url: `/work/${p.slug}` },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const main = publicProjects.filter((x) => x.prominence === p.prominence);
  const next = main[(main.findIndex((x) => x.slug === p.slug) + 1) % main.length];
  const relatedProjects = (p.related?.projects ?? []).map((s) => getProject(s)).filter((x) => x !== undefined);
  const relatedExp = publicExperience.filter((e) => p.related?.experience?.includes(e.id));

  return (
    <article>
      <header className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden /> All projects
        </Link>
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="label">{p.area}</p>
            <h1 className="mt-3 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.03em]">{p.title}</h1>
            <p className="mt-4 max-w-[46ch] font-display text-xl font-medium leading-snug text-ink-2 sm:text-[1.4rem]">{p.kind}</p>

            <div className="mt-7 rounded-xl bg-rose-soft/70 px-5 py-4">
              <p className="label !text-rose-ink">Key outcome</p>
              <p className="mt-1 text-[1.08rem] font-semibold leading-snug">{p.outcome}</p>
            </div>

            <dl className="mt-7 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-4 text-[0.98rem] sm:grid-cols-2">
              <div><dt className="label">My role</dt><dd className="mt-0.5">{p.role}</dd></div>
              <div><dt className="label">Dates</dt><dd className="mt-0.5">{p.dates}</dd></div>
              {p.team && <div className="sm:col-span-2"><dt className="label">Team</dt><dd className="mt-0.5 text-ink-2">{p.team}</dd></div>}
              <div><dt className="label">Status</dt><dd className="mt-0.5">{p.status}</dd></div>
            </dl>

            {p.links.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {p.links.map((l, i) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener" className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors ${i === 0 ? "bg-ink text-bg hover:bg-berry-strong" : "border border-line-strong hover:border-ink"}`}>
                      {l.label} <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ProjectCover p={p} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 540px, 100vw" priority />
        </div>
      </header>

      {p.facts && (
        <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-y border-line py-7 md:grid-cols-4">
            {p.facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-[2.2rem] font-semibold leading-none tracking-tight text-berry">{f.value}</dd>
                <dd className="mt-2 text-[0.95rem] leading-snug text-ink-2">{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8">
        {p.story && <Story blocks={p.story} />}

        <div className="mt-20 grid grid-cols-[minmax(0,1fr)] gap-10 border-t border-line pt-10 md:grid-cols-3">
          <div>
            <h2 className="label">Tools & methods</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">{p.tools.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </div>
          {p.documents && p.documents.length > 0 && (
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="label">Supporting documents ({p.documents.length})</h2>
                <ChevronDown className="h-4 w-4 text-ink-3 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ul className="mt-3 space-y-2">
                {p.documents.map((d) => (
                  <li key={d.href}><a href={d.href} target={d.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="ulink">{d.label}</a></li>
                ))}
              </ul>
            </details>
          )}
          {(relatedProjects.length > 0 || relatedExp.length > 0) && (
            <div>
              <h2 className="label">Related</h2>
              <ul className="mt-3 space-y-2">
                {relatedProjects.map((r) => <li key={r.slug}><Link href={`/work/${r.slug}`} className="ulink">{r.title}</Link></li>)}
                {relatedExp.map((e) => <li key={e.id}><Link href={`/experience#${e.id}`} className="ulink">{e.org}</Link></li>)}
              </ul>
            </div>
          )}
        </div>

        {next && next.slug !== p.slug && (
          <Link href={`/work/${next.slug}`} className="group mt-16 flex items-center justify-between gap-4 border-y border-line py-6">
            <span>
              <span className="label">Next project</span>
              <span className="mt-1 block font-display text-2xl font-semibold group-hover:text-berry">{next.title}</span>
            </span>
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
}
