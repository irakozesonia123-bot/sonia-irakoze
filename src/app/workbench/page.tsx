import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/section";
import { BowlVoyageToy } from "@/components/bowl-voyage-toy";
import { publicProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Workbench",
  description: "Sonia Irakoze’s workbench: a Java cooking game, a timber truss bridge, flume experiments, a journal cover, and engineering work in progress.",
  alternates: { canonical: "/workbench" },
};

export default function WorkbenchPage() {
  const bench = publicProjects.filter((p) => p.tier === "archive").sort((a, b) => b.sort - a.sort);
  const inProgress = publicProjects.filter((p) => p.slug === "cubesat-structures" || p.slug === "aero-design-glider");
  return (
    <>
      <PageHeader
        sheet="S-03"
        kicker="Workbench"
        title="Workbench"
        intro="I make things because I like making things. This is the bench: coursework that turned into real projects, a game, a bridge, a lab flume, and a journal cover. It’s less formal than the case studies, and that’s the point."
      />
      <section aria-label="Pinned projects" className="bench border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <ul className="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {bench.map((p) => (
              <li key={p.slug} className="pin relative rounded-xl border border-line-strong bg-surface p-5 pt-6">
                <span className="tape" aria-hidden />
                {p.bench?.sticker && <span className="absolute -right-2 -top-3 rotate-3 rounded-full border border-ink bg-bg px-2.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.1em]">{p.bench.sticker}</span>}
                {p.cover && (
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-surface-2">
                    <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
                  </div>
                )}
                <p className="font-mono text-xs text-ink-3">{p.year} · {p.categories.join(" / ")}</p>
                <h2 className="mt-1 text-xl font-bold leading-snug">
                  <Link href={`/work/${p.slug}`} className="hover:text-lake">{p.title}</Link>
                </h2>
                <p className="mt-2 text-sm text-ink-2">{p.summary}</p>
                {p.slug === "bowl-voyage" && <div className="mt-4"><BowlVoyageToy /></div>}
                <dl className="mt-4 space-y-1.5 border-t border-dashed border-line-strong pt-3 text-sm">
                  {p.challenge && <div><dt className="inline font-mono text-[0.68rem] uppercase tracking-[0.1em] text-survey-ink">Tricky bit · </dt><dd className="inline">{p.challenge}</dd></div>}
                  {p.learned && <div><dt className="inline font-mono text-[0.68rem] uppercase tracking-[0.1em] text-survey-ink">Learned · </dt><dd className="inline">{p.learned}</dd></div>}
                </dl>
                {p.bench?.note && <p className="mt-3 font-display text-[0.98rem] italic text-ink-2">“{p.bench.note}”</p>}
                <Link href={`/work/${p.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-lake hover:text-ink">
                  Open the sheet <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="wip-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="station">Still on the vise</p>
        <h2 id="wip-title" className="mt-2 text-3xl font-extrabold">Aerospace work in progress</h2>
        <p className="mt-3 max-w-2xl text-ink-2">CAD, analysis, and prototype photos are on their way to the bench. For now, here’s what I’m working on.</p>
        <ul className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
          {inProgress.map((p) => (
            <li key={p.slug} className="relative rounded-2xl border border-dashed border-line-strong p-5">
              <p className="font-mono text-xs text-ink-3">{p.year} · {p.role}</p>
              <h3 className="mt-1 text-lg font-bold"><Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 hover:text-lake">{p.title}</Link></h3>
              <p className="mt-1 text-sm text-ink-2">{p.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
