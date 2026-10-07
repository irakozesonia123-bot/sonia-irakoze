import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mic } from "lucide-react";
import { PageHeader, Section } from "@/components/section";
import { publicFieldNotes } from "@/content/field-notes";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Conferences, talks, and programs: NSBE conventions in Chicago and Baltimore, workshops in Gashora, TechGirls, and the fellowships that shaped Sonia Irakoze’s path.",
  alternates: { canonical: "/field-notes" },
};

const CODE: Record<string, string> = { "Baltimore, MD": "BAL", "Chicago, IL": "CHI", "Albany, NY": "ALB", "Denver, CO": "DEN" };

export default function FieldNotesPage() {
  const conferences = publicFieldNotes.filter((f) => f.type === "conference").sort((a, b) => b.sort - a.sort);
  const speaking = publicFieldNotes.filter((f) => f.type === "speaking").sort((a, b) => b.sort - a.sort);
  const programs = publicFieldNotes.filter((f) => f.type === "program").sort((a, b) => b.sort - a.sort);
  return (
    <>
      <PageHeader
        sheet="S-06"
        kicker="Field notes"
        title="Rooms I’ve learned in"
        intro="A lot of my education happened outside lectures: national conventions, a workshop hall in Gashora, a lab flume in Virginia, and programs that put me in rooms I wouldn’t have found alone."
        meta={[
          { label: "Conferences", value: String(conferences.length) },
          { label: "Talks & pitches", value: String(speaking.length) },
          { label: "Programs", value: String(programs.length) },
          { label: "Cities", value: String(new Set(publicFieldNotes.map((f) => f.place)).size) },
        ]}
      />

      <Section id="conferences" station="06+10" kicker="Conferences" title="Event passes">
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
          {conferences.map((c) => (
            <li key={c.id} className="relative overflow-hidden rounded-2xl border border-ink/70 bg-surface">
              <div className="flex items-center justify-between border-b border-dashed border-line-strong px-5 py-3">
                <span className="mx-auto h-2 w-14 rounded-full bg-bg ring-1 ring-line-strong" aria-hidden />
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 p-5">
                <div className="min-w-0">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">{c.org}</p>
                  <h3 className="mt-1 text-xl font-bold leading-snug">{c.title}</h3>
                  <p className="mt-1 font-mono text-xs text-ink-2">{c.date} · {c.place}</p>
                  <p className="mt-3 w-fit rounded bg-survey/12 px-2 py-0.5 text-sm font-semibold text-survey-ink">{c.role}</p>
                </div>
                <p className="font-display text-4xl font-extrabold tracking-tight text-lake" aria-hidden>{CODE[c.place] ?? ""}</p>
              </div>
              {c.image && (
                <div className="relative mx-5 aspect-[16/9] overflow-hidden rounded-xl bg-surface-2">
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover object-[50%_30%]" />
                </div>
              )}
              <div className="p-5">
                <p className="text-ink-2">{c.note}</p>
                {c.takeaway && <p className="mt-3 border-l-2 border-survey pl-3 font-display">{c.takeaway}</p>}
                {c.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">{l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="speaking" station="06+20" kicker="Speaking" title="At the microphone" intro="Talks, workshops, and pitches where I was the one presenting.">
        <ol className="divide-y divide-line border-y border-line">
          {speaking.map((s) => (
            <li key={s.id} className="grid grid-cols-[minmax(0,1fr)] gap-4 py-6 md:grid-cols-[10rem_minmax(0,1fr)_14rem] md:items-start">
              <div>
                <p className="flex items-center gap-2 font-mono text-xs text-ink-3"><Mic className="h-3.5 w-3.5 text-survey" aria-hidden />{s.date}</p>
                <p className="mt-1 text-sm text-ink-2">{s.place}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold leading-snug">{s.title}</h3>
                <p className="text-sm text-ink-2">{s.org} · <span className="font-semibold text-ink">{s.role}</span></p>
                <p className="mt-2 text-ink-2">{s.note}</p>
                {s.links?.map((l) => (
                  l.href.startsWith("/") ? <Link key={l.href} href={l.href} className="mt-2 inline-block text-sm font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">{l.label} →</Link>
                  : <a key={l.href} href={l.href} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">{l.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>
                ))}
              </div>
              {s.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-2">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 224px, 100vw" className="object-cover" />
                </div>
              ) : <div className="hidden md:block" />}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="programs" station="06+30" kicker="Programs" title="Programs & fellowships" intro="Selective programs that came with mentors, training, or a first door into something.">
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {programs.map((p, i) => (
            <li key={p.id} className={`bg-surface p-5 ${p.id === "techgirls-2023" || (i === programs.length - 1 && programs.length % 2 === 0) ? "md:col-span-2" : ""}`}>
              <div className={p.id === "techgirls-2023" && p.image ? "grid gap-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" : ""}>
                <div>
                  <p className="font-mono text-xs text-ink-3">{p.date} · {p.place}</p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{p.title}</h3>
                  <p className="text-sm text-ink-2">{p.org} · <span className="font-semibold text-ink">{p.role}</span></p>
                  <p className="mt-2 text-ink-2">{p.note}</p>
                  {p.takeaway && <p className="mt-3 border-l-2 border-survey pl-3 font-display">{p.takeaway}</p>}
                  {p.links?.map((l) => <Link key={l.href} href={l.href} className="mt-2 inline-block text-sm font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">{l.label} →</Link>)}
                </div>
                {p.id === "techgirls-2023" && p.image && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-2">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
