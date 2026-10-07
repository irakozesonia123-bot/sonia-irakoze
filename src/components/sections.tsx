import Image from "next/image";
import { ArrowUpRight, Award as AwardIcon, Quote } from "lucide-react";
import { about, awards, education, journey, leadership, profile, recommendations, skills } from "@/content/portfolio";
import { Section, Tag } from "./section";
import { CopyEmail } from "./copy-email";
import { GitHubIcon, LinkedInIcon } from "./brand-icons";

const isPlaceholder = (s: string) => s.includes("[ADD");

export function About() {
  return (
    <Section id="about" title="Engineering with both hands" kicker="About">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
        <div className="space-y-5 text-[1.08rem] leading-relaxed">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "font-display text-xl font-medium leading-snug sm:text-[1.4rem]" : "text-ink-2"}>{p}</p>
          ))}
        </div>
        <div className="space-y-6">
          {about.photo && (
            <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="relative aspect-[4/3]">
                <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover object-[50%_25%]" />
              </div>
              <figcaption className="px-4 py-2.5 font-mono text-xs text-ink-3">{about.photo.caption}</figcaption>
            </figure>
          )}
          <div>
            <h3 className="station !text-ink-3">Off the clock</h3>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {about.interests.map((x) => (
                <li key={x.label} className="grid grid-cols-[8.5rem_minmax(0,1fr)] gap-3 py-2.5 text-sm">
                  <span className="font-semibold">{x.label}</span>
                  <span className="text-ink-2">{x.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function EducationSection() {
  return (
    <Section id="education" title="Education & honors" kicker="Education">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <ol className="space-y-5">
          {education.map((e, i) => (
            <li key={e.school} className={`rounded-2xl border bg-surface p-6 ${i === 0 ? "border-ink/70" : "border-line"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-bold">{e.school}</h3>
                <span className="font-mono text-xs text-ink-3">{e.start} – {e.end}</span>
              </div>
              <p className="mt-1 text-ink-2">{e.credential} · {e.location}</p>
              <ul className="mt-4 space-y-1.5 text-[0.97rem]">
                {e.notes.map((n) => (
                  <li key={n} className="flex gap-2.5"><span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-survey" aria-hidden />{n}</li>
                ))}
              </ul>
              {e.coursework && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.coursework.map((c) => <Tag key={c}>{c}</Tag>)}
                </div>
              )}
            </li>
          ))}
        </ol>
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold"><AwardIcon className="h-5 w-5 text-survey" aria-hidden /> Awards & funding</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {awards.map((a) => (
              <li key={a.title} className="py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-semibold leading-snug">
                    {a.href ? (
                      <a href={a.href} target="_blank" rel="noopener" className="underline decoration-line-strong underline-offset-4 hover:decoration-survey">{a.title}</a>
                    ) : a.title}
                  </p>
                  <span className="font-mono text-xs text-ink-3">{a.year}</span>
                </div>
                <p className="text-sm text-ink-2">{a.issuer}{a.note ? ` · ${a.note}` : ""}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function LeadershipSection() {
  return (
    <Section id="leadership" title="Leadership & community" kicker="Volunteering" intro="The work outside class: representing engineers, mentoring students, and starting things.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leadership.map((l) => {
          const ph = isPlaceholder(l.role) || isPlaceholder(l.start);
          return (
            <article key={`${l.org}-${l.role}`} className={`flex flex-col rounded-2xl border p-5 transition-colors hover:border-line-strong ${ph ? "border-dashed border-survey/60 bg-transparent" : "border-line bg-surface"}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="station !text-[0.66rem] !text-lake">{l.kind}</span>
                <span className="font-mono text-[0.7rem] text-ink-3">{l.start}{l.end ? ` – ${l.end}` : ""}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug">{l.role}</h3>
              <p className="text-sm font-semibold text-ink-2">{l.org}</p>
              <p className="mt-2 text-sm text-ink-2">{l.detail}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills" title="Tools I work with" kicker="Skills" intro="Grouped by what I use them for. No percentage bars: each tool here is one I’ve used on real work.">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g) => (
          <div key={g.title} className="bg-surface p-5">
            <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-3">{g.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <li key={s} className="rounded-md bg-surface-2 px-2 py-1 text-sm">{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/** Journey as a surveyed route: stationing down a centerline, milestones as control points. */
export function JourneySection() {
  return (
    <Section id="journey" title="The route so far" kicker="Journey" intro="Kigali to Gashora to Rochester to Denver, surveyed like a road alignment. Orange diamonds are the control points that changed the route.">
      <ol className="relative ml-2 sm:ml-0">
        <span aria-hidden className="absolute bottom-3 left-[5.6rem] top-3 hidden w-[3px] rounded bg-[repeating-linear-gradient(to_bottom,var(--line-strong)_0_10px,transparent_10px_18px)] sm:block" />
        <span aria-hidden className="absolute bottom-3 left-[0.45rem] top-3 w-[3px] rounded bg-[repeating-linear-gradient(to_bottom,var(--line-strong)_0_10px,transparent_10px_18px)] sm:hidden" />
        {journey.map((j) => (
          <li key={j.station} className="relative grid grid-cols-[1.4rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0 sm:grid-cols-[4.6rem_2rem_minmax(0,1fr)] sm:gap-3">
            <span className="hidden pt-1 text-right font-mono text-xs text-ink-3 sm:block">STA {j.station}</span>
            <span aria-hidden className="relative flex justify-center pt-1.5">
              {j.milestone ? (
                <span className="h-3.5 w-3.5 rotate-45 border-2 border-survey bg-survey shadow-[0_0_0_4px_var(--bg)]" />
              ) : (
                <span className="h-3 w-3 rounded-full border-2 border-ink bg-bg shadow-[0_0_0_4px_var(--bg)]" />
              )}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-xs text-ink-3"><span className="sm:hidden">STA {j.station} · </span>{j.date} · {j.place}</p>
              <h3 className={`mt-0.5 text-lg font-bold leading-snug ${j.milestone ? "text-ink" : ""}`}>{j.title}</h3>
              <p className="mt-1 max-w-2xl text-ink-2">{j.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function RecommendationsSection() {
  return (
    <Section id="recommendations" title="What people say" kicker="Recommendations" intro="From supervisors and colleagues, quoted from public LinkedIn recommendations and posts.">
      <div className="columns-1 gap-5 md:columns-2 [&>*]:mb-5">
        {recommendations.map((r) => (
          <figure key={r.name} className={`break-inside-avoid rounded-2xl border p-6 ${r.placeholder ? "border-dashed border-survey/60" : "border-line bg-surface"}`}>
            <Quote className="h-5 w-5 text-survey" aria-hidden />
            <blockquote className="mt-3 font-display text-[1.12rem] leading-relaxed">“{r.quote}”</blockquote>
            <figcaption className="mt-5 border-t border-line pt-4 text-sm">
              <p className="font-semibold">{r.name}</p>
              <p className="text-ink-2">{r.role}</p>
              <p className="mt-1 font-mono text-xs text-ink-3">
                {r.relationship} · {r.date}
                {r.source && (
                  <> · <a href={r.source.href} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-ink">{r.source.label}</a></>
                )}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" title="Let’s talk shop" kicker="Contact">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <p className="max-w-[34ch] font-display text-2xl font-medium leading-snug sm:text-3xl">
            Bridges, water systems, a CAD model, or a web tool your team keeps wishing existed. I’d like to hear about it.
          </p>
          <p className="mt-4 max-w-[50ch] text-ink-2">I’m looking for {profile.lookingFor.charAt(0).toLowerCase() + profile.lookingFor.slice(1)}. Email reaches me fastest.</p>
        </div>
        <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
          <li className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="station !text-ink-3">Email</p>
              <a href={`mailto:${profile.email}`} className="mt-1 block break-all font-mono text-[0.95rem] hover:text-lake">{profile.email}</a>
            </div>
            <CopyEmail email={profile.email} />
          </li>
          <ContactRow label="LinkedIn" href={profile.links.linkedin} text="linkedin.com/in/irakoze-sonia" icon={<LinkedInIcon className="h-4 w-4" />} />
          <ContactRow label="GitHub" href={profile.links.github} text="github.com/irakozesonia123-bot" icon={<GitHubIcon className="h-4 w-4" />} />
          <ContactRow label="Resume" href={profile.links.resume} text="Sonia_Irakoze_Resume.pdf" />
        </ul>
      </div>
    </Section>
  );
}

function ContactRow({ label, href, text, icon }: { label: string; href: string; text: string; icon?: React.ReactNode }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener" className="group flex items-center justify-between gap-3 p-5 transition-colors hover:bg-surface-2">
        <div className="min-w-0">
          <p className="station !text-ink-3">{label}</p>
          <p className="mt-1 flex items-center gap-2 break-all font-mono text-[0.95rem]">{icon}{text}</p>
        </div>
        <ArrowUpRight className="h-5 w-5 flex-none text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-survey" aria-hidden />
      </a>
    </li>
  );
}
