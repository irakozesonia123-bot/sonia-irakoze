import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, Section } from "@/components/section";
import { publicRecognition } from "@/content/field-notes";

export const metadata: Metadata = {
  title: "Recognition",
  description: "Grants, scholarships, and awards Sonia Irakoze has received, including a Davis Projects for Peace grant and the Handler Scholarship, and what each one led to.",
  alternates: { canonical: "/recognition" },
};

export default function RecognitionPage() {
  const list = [...publicRecognition].sort((a, b) => b.sort - a.sort);
  const major = list.filter((r) => r.opened);
  const minor = list.filter((r) => !r.opened);
  return (
    <>
      <PageHeader
        sheet="S-07"
        kicker="Recognition"
        title="Recognition, with context"
        intro="Not a trophy wall. Each one says why it mattered and what it made possible next."
        meta={[
          { label: "Grants", value: String(list.filter((r) => r.kind === "Grant").length) },
          { label: "Scholarships", value: String(list.filter((r) => r.kind === "Scholarship").length) },
          { label: "Awards", value: String(list.filter((r) => r.kind === "Award").length) },
          { label: "Since", value: "2022" },
        ]}
      />
      <Section id="milestones" station="07+10" kicker="Milestones" title="The ones that opened doors">
        <ol className="space-y-5">
          {major.map((r) => (
            <li key={r.id} className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <div className="p-6">
                <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-3"><span className="rounded border border-survey px-1.5 uppercase tracking-[0.1em] text-survey-ink">{r.kind}</span>{r.year} · {r.issuer}</p>
                <h2 className="mt-2 text-2xl font-bold leading-snug">
                  {r.href ? <a href={r.href} target="_blank" rel="noopener" className="underline decoration-line-strong underline-offset-[6px] hover:decoration-survey">{r.title}<ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden /></a> : r.title}
                </h2>
                <p className="mt-3 text-ink-2">{r.why}</p>
                <div className="mt-4 rounded-xl bg-surface-2 px-4 py-3">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-survey-ink">Door it opened →</p>
                  <p className="mt-1">{r.opened}</p>
                </div>
              </div>
              {r.image ? (
                <div className="relative min-h-[220px] bg-surface-2"><Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" /></div>
              ) : (
                <div className="relative hidden min-h-[220px] place-items-center bg-surface-2 md:grid"><div className="drafting-grid absolute inset-0" aria-hidden /><span className="relative font-display text-6xl font-extrabold text-lake/80">{r.year}</span></div>
              )}
            </li>
          ))}
        </ol>
      </Section>
      <Section id="also" station="07+20" kicker="Also" title="Honors & funding">
        <ul className="divide-y divide-line border-y border-line">
          {minor.map((r) => (
            <li key={r.id} className="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-1 py-4 sm:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1.2fr)] sm:items-baseline">
              <span className="font-mono text-xs text-ink-3">{r.year}</span>
              <div><p className="font-semibold">{r.title}</p><p className="text-sm text-ink-2">{r.issuer}</p></div>
              <p className="text-ink-2">{r.why}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
