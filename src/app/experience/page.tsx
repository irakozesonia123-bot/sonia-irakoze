import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { PageHeader, Section, Tag } from "@/components/section";
import { publicExperience, publicLeadership, recsFor } from "@/content/experience";
import { education, skills } from "@/content/profile";
import { getProject } from "@/content/projects";
import type { LeadershipLevel } from "@/content/types";

export const metadata: Metadata = {
  title: "Experience",
  description: "Sonia Irakoze’s internships at CDOT, AGR Sensors, the Ugandan Water Project, and River Campus Libraries; campus roles; leadership in NSBE and the University of Rochester; education and skills.",
  alternates: { canonical: "/experience" },
};

const levelStyle: Record<LeadershipLevel, string> = {
  Elected: "border-survey text-survey-ink",
  Appointed: "border-lake text-lake",
  Selected: "border-lake/60 text-lake",
  Hired: "border-line-strong text-ink-2",
  "Co-founder": "border-ink text-ink",
  Mentor: "border-line-strong text-ink-2",
  Volunteer: "border-line-strong text-ink-2",
  Member: "border-line text-ink-3",
};

export default function ExperiencePage() {
  const groups = ["Engineering community", "University", "Mentoring & teaching", "Global"] as const;
  return (
    <>
      <PageHeader
        sheet="S-04"
        kicker="Experience"
        title="Where I’ve worked and led"
        intro="Internships in infrastructure, AI data, water, and publishing; campus jobs where I grew into leading others; and roles I was elected or chosen for. Recommendations sit next to the work they describe."
        meta={[
          { label: "Internships", value: String(publicExperience.filter((e) => e.kind === "Internship").length) },
          { label: "Campus roles", value: String(publicExperience.filter((e) => e.kind === "Campus job").length) },
          { label: "Leadership", value: String(publicLeadership.length) },
          { label: "Since", value: "2023" },
        ]}
      />

      <Section id="professional" station="04+10" kicker="Professional" title="Internships & campus work">
        <ol className="space-y-5">
          {publicExperience.map((e) => {
            const recs = recsFor(e.id);
            return (
              <li key={e.id} id={e.id} className="scroll-mt-28 rounded-2xl border border-line bg-surface">
                <div className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-4 p-5 sm:p-6 md:grid-cols-[14rem_minmax(0,1fr)]">
                  <div className="md:border-r md:border-line md:pr-6">
                    <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">
                      {e.kind}{e.current && <span className="rounded-full bg-ok/12 px-1.5 text-ok">current</span>}
                    </p>
                    <h2 className="mt-1 text-lg font-bold leading-snug">{e.org}</h2>
                    {e.team && <p className="text-sm text-ink-2">{e.team}</p>}
                    <p className="mt-1 text-sm text-ink-3">{e.location}</p>
                  </div>
                  <div className="min-w-0">
                    <ol className={e.roles.length > 1 ? "relative space-y-3 border-l-2 border-line pl-4" : ""}>
                      {e.roles.map((r, k) => (
                        <li key={r.title} className="relative">
                          {e.roles.length > 1 && <span className={`absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${k === 0 ? "border-survey bg-survey" : "border-ink-3 bg-bg"}`} aria-hidden />}
                          <p className="text-lg font-bold leading-snug">{r.title} {r.note && <span className="ml-1 align-middle font-mono text-[0.66rem] uppercase tracking-[0.12em] text-survey-ink">{r.note}</span>}</p>
                          <p className="font-mono text-xs text-ink-3">{r.start ? `${r.start} – ${r.end}` : r.end === "Present" ? "Current" : r.end}</p>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 text-ink-2">{e.summary}</p>
                    <ul className="mt-3 space-y-1.5">
                      {e.highlights.map((h) => <li key={h} className="flex gap-2.5"><span className="mt-[0.7rem] h-[3px] w-3 flex-none bg-survey" aria-hidden />{h}</li>)}
                    </ul>
                    {e.details && (
                      <details className="group mt-3">
                        <summary className="cursor-pointer list-none text-sm font-semibold text-lake hover:text-ink [&::-webkit-details-marker]:hidden">
                          <span className="group-open:hidden">Show details ↓</span><span className="hidden group-open:inline">Hide details ↑</span>
                        </summary>
                        <ul className="mt-2 space-y-1.5 border-l-2 border-line pl-4 text-[0.96rem] text-ink-2">{e.details.map((d) => <li key={d}>{d}</li>)}</ul>
                      </details>
                    )}
                    <div className="mt-4 flex flex-wrap gap-1.5">{e.tools.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                    {e.relatedProjects && (
                      <p className="mt-4 text-sm">
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-3">Case studies · </span>
                        {e.relatedProjects.map((s, k) => { const p = getProject(s); return p ? <span key={s}>{k > 0 && " · "}<Link href={`/work/${s}`} className="font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">{p.title}</Link></span> : null; })}
                      </p>
                    )}
                    {recs.length > 0 && (
                      <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-2">
                        {recs.map((r) => (
                          <figure key={r.name} className="rounded-xl bg-surface-2 p-4">
                            <Quote className="h-4 w-4 text-survey" aria-hidden />
                            <blockquote className="mt-2 text-[0.96rem] leading-relaxed">“{r.quote}”</blockquote>
                            <figcaption className="mt-3 text-xs text-ink-2"><span className="font-semibold text-ink">{r.name}</span> · {r.role}<br /><span className="font-mono text-ink-3">{r.relationship} · {r.date}{r.source && <> · <a href={r.source.href} target="_blank" rel="noopener" className="underline">{r.source.label}</a></>}</span></figcaption>
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section id="leadership" station="04+20" kicker="Leadership" title="Leadership & community" intro="Each role is labeled for how I got it or what it is: elected, appointed, selected, co-founded, mentor, volunteer, or member.">
        <div className="space-y-10">
          {groups.map((g) => {
            const items = publicLeadership.filter((l) => l.group === g);
            if (!items.length) return null;
            return (
              <div key={g}>
                <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-3">{g}</h3>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {items.map((l) => (
                    <li key={l.id} className="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-1 py-4 sm:grid-cols-[6.5rem_minmax(0,1fr)_minmax(0,1.3fr)] sm:items-baseline">
                      <span className={`w-fit rounded border px-1.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.1em] ${levelStyle[l.level]}`}>{l.level}</span>
                      <div>
                        <p className="font-semibold leading-snug">{l.role}</p>
                        <p className="text-sm text-ink-2">{l.org}</p>
                        {(l.start || l.end) && <p className="font-mono text-xs text-ink-3">{l.start}{l.end ? ` – ${l.end}` : ""}</p>}
                      </div>
                      <p className="text-[0.96rem] text-ink-2">{l.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="education" station="04+30" kicker="Education" title="Education">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {education.map((e, i) => (
            <div key={e.school} className={`rounded-2xl border bg-surface p-6 ${i === 0 ? "border-ink/70" : "border-line"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-xl font-bold">{e.school}</h3>
                <span className="font-mono text-xs text-ink-3">{e.start} – {e.end}</span>
              </div>
              <p className="mt-1 text-ink-2">{e.credential} · {e.location}</p>
              <ul className="mt-4 space-y-1.5">{e.notes.map((n) => <li key={n} className="flex gap-2.5"><span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-survey" aria-hidden />{n}</li>)}</ul>
              {e.coursework && <div className="mt-4 flex flex-wrap gap-1.5">{e.coursework.map((c) => <Tag key={c}>{c}</Tag>)}</div>}
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills" station="04+40" kicker="Skills" title="Tools I’ve used on real work">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.title} className="bg-surface p-5">
              <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">{g.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">{g.items.map((s) => <li key={s} className="rounded-md bg-surface-2 px-2 py-1 text-sm">{s}</li>)}</ul>
            </div>
          ))}
          <div className="hidden bg-surface lg:block" aria-hidden />
        </div>
      </Section>
    </>
  );
}
