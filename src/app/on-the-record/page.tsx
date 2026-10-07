import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/section";
import { publicFeatures } from "@/content/record";

export const metadata: Metadata = {
  title: "On the Record",
  description: "Published work and public features: University of Rochester and Projects for Peace announcements, CDOT’s publication of CDOT Compass, a WorldDenver feature, and a Blake Quarterly cover.",
  alternates: { canonical: "/on-the-record" },
};

export default function RecordPage() {
  const items = [...publicFeatures].sort((a, b) => b.sort - a.sort);
  return (
    <>
      <PageHeader
        sheet="S-08"
        kicker="On the record"
        title="On the record"
        intro="Things other people published about my work, and work of mine that was published. Each item is labeled for what it actually is: an announcement, a program feature, an agency publication, a social post, or published work."
      />
      <section aria-label="Features and published work" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <ul className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>li]:mb-6">
          {items.map((f, i) => {
            const body = (
              <article className={`break-inside-avoid overflow-hidden border bg-surface transition-colors ${i === 0 ? "border-ink" : "border-line-strong"} group-hover:border-ink`}>
                <header className="border-b-2 border-double border-ink px-5 pb-3 pt-4">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink-2">{f.outlet}</p>
                  <div className="mt-2 flex items-center justify-between gap-2 font-mono text-[0.66rem] uppercase tracking-[0.12em]">
                    <span className="text-survey-ink">{f.kind}</span><span className="text-ink-3">{f.date}</span>
                  </div>
                </header>
                {f.image && (
                  <div className={`relative ${f.kind === "Published work" ? "aspect-[3/4]" : "aspect-[4/3]"} bg-surface-2`}>
                    <Image src={f.image.src} alt={f.image.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="font-display text-[1.35rem] font-bold leading-tight">{f.headline}</h2>
                  <p className="mt-2 text-[0.96rem] leading-relaxed text-ink-2">{f.excerpt}</p>
                  {f.href && <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">Read it <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></p>}
                </div>
              </article>
            );
            return (
              <li key={f.id}>
                {f.href ? <a href={f.href} target="_blank" rel="noopener" className="group block">{body}</a> : <div className="group">{body}</div>}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
