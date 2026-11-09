import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, Tag } from "@/components/section";
import { publicExperience, publicLeadership, recsFor } from "@/content/experience";
import { education, profile, skills } from "@/content/profile";
import { getProject } from "@/content/projects";

export const metadata: Metadata = {
  title: "Experience",
  description: "Sonia Irakoze’s internships at CDOT, AGR Sensors, the Ugandan Water Project, and River Campus Libraries; campus roles; leadership; education; and skills.",
  alternates: { canonical: "/experience" },
};

const dates = (start: string, end: string) => (start && end ? `${start} – ${end}` : start || end);

export default function ExperiencePage() {
  return (
    <>
      <PageHeader title="Experience" intro="Internships in infrastructure, data, water, and publishing; campus jobs where I grew into training others; and the roles I lead.">
        <a href={profile.links.resume} target="_blank" rel="noopener" className="ulink mt-6 inline-block font-semibold">Download my resume (PDF)</a>
      </PageHeader>

      <Section id="work-history" title="Work">
        <ol className="space-y-14">
          {publicExperience.map((e) => {
            const recs = recsFor(e.id);
            return (
              <li key={e.id} id={e.id} className="scroll-mt-24 grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-3 border-t border-line pt-6 md:grid-cols-[15rem_minmax(0,1fr)]">
                <div>
                  <h3 className="text-xl font-semibold leading-snug">{e.org}</h3>
                  {e.team && <p className="text-ink-2">{e.team}</p>}
                  <p className="label mt-1.5">{e.location}</p>
                </div>
                <div className="min-w-0">
                  <ol className="space-y-1">
                    {e.roles.map((r) => (
                      <li key={r.title} className="flex flex-wrap items-baseline gap-x-3">
                        <span className="text-lg font-bold">{r.title}</span>
                        <span className="label">{dates(r.start, r.end)}</span>
                        {r.note && <span className="label !text-rose-ink">{r.note}</span>}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-2 text-ink-2">{e.summary}</p>
                  {e.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {e.highlights.map((h) => <li key={h} className="flex gap-3"><span className="mt-[0.7rem] h-[2px] w-3 flex-none bg-rose" aria-hidden />{h}</li>)}
                    </ul>
                  )}
                  {e.tools.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{e.tools.map((t) => <Tag key={t}>{t}</Tag>)}</div>}
                  {e.relatedProjects && (
                    <p className="mt-4 text-[0.96rem]">
                      <span className="label mr-2">Projects</span>
                      {e.relatedProjects.map((s, k) => { const p = getProject(s); return p ? <span key={s}>{k > 0 && " · "}<Link href={`/work/${s}`} className="ulink font-semibold">{p.title}</Link></span> : null; })}
                    </p>
                  )}
                  {recs.map((r) => (
                    <figure key={r.name} className="mt-5 border-l-2 border-berry pl-4">
                      <blockquote className="text-[0.98rem] leading-relaxed">“{r.quote}”</blockquote>
                      <figcaption className="mt-2 text-sm text-ink-2">
                        <span className="font-semibold text-ink">{r.name}</span>, {r.role}. {r.relationship}, {r.date}
                        {r.source && <> · <a href={r.source.href} target="_blank" rel="noopener" className="ulink">{r.source.label}</a></>}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section id="leadership" title="Leadership" tone="warm">
        <ul className="divide-y divide-line border-y border-line">
          {publicLeadership.map((l) => (
            <li key={l.id} className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-1 py-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <div>
                <p className="font-bold leading-snug">{l.role}</p>
                <p className="text-ink-2">{l.org}</p>
                <p className="label mt-1">{l.how} · {dates(l.start, l.end)}</p>
              </div>
              <p className="text-ink-2">
                {l.detail}
                {l.project && <> <Link href={`/work/${l.project}`} className="ulink font-semibold text-ink">Read the case study</Link></>}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="education" title="Education">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-2">
          {education.map((e) => (
            <div key={e.school}>
              <h3 className="text-xl font-semibold">{e.school}</h3>
              <p className="text-ink-2">{e.credential}</p>
              <p className="label mt-1">{e.start} – {e.end} · {e.location}</p>
              <ul className="mt-4 space-y-1.5">{e.notes.map((n) => <li key={n} className="flex gap-3"><span className="mt-[0.7rem] h-[2px] w-3 flex-none bg-rose" aria-hidden />{n}</li>)}</ul>
              {e.coursework && <div className="mt-4 flex flex-wrap gap-1.5">{e.coursework.map((c) => <Tag key={c}>{c}</Tag>)}</div>}
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills" tone="warm">
        <dl className="grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-6 sm:grid-cols-2">
          {skills.map((g) => (
            <div key={g.title}>
              <dt className="label !text-berry">{g.title}</dt>
              <dd className="mt-1.5">{g.items.join(" · ")}</dd>
              {g.seenIn && (
                <dd className="mt-1.5 text-[0.92rem] text-ink-3">
                  See it in:{" "}
                  {g.seenIn.map((x, k) => <span key={x.href}>{k > 0 && " · "}<Link href={x.href} className="ulink font-semibold text-ink-2">{x.label}</Link></span>)}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
