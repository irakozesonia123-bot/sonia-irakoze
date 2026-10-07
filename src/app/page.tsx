import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { StatusPill } from "@/components/status-pill";
import { CopyEmail } from "@/components/copy-email";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { DataPlate } from "@/components/work/project-cards";
import { nav, profile } from "@/content/profile";
import { publicProjects } from "@/content/projects";
import { publicExperience, recommendations } from "@/content/experience";
import { publicFieldNotes, publicRecognition } from "@/content/field-notes";
import { publicFeatures, turningPoints } from "@/content/record";

export default function Home() {
  const flagship = publicProjects.filter((p) => p.tier === "flagship");
  const [lead, ...rest] = flagship;
  const now = publicExperience.filter((e) => e.current && ["agr", "it-center"].includes(e.id));
  const doors = turningPoints.filter((t) => ["ggast", "techgirls", "p4p", "cdot"].includes(t.id));
  const recog = publicRecognition.filter((r) => ["p4p", "handler", "eac-essay"].includes(r.id));
  const quote = recommendations.find((r) => r.name === "David Beyerlein");
  const counts: Record<string, string> = {
    "/work": `${publicProjects.length} projects`,
    "/workbench": `${publicProjects.filter((p) => p.tier === "archive").length} pinned`,
    "/experience": `${publicExperience.length} roles`,
    "/journey": `${turningPoints.length} turning points`,
    "/field-notes": `${publicFieldNotes.length} entries`,
    "/recognition": `${publicRecognition.length} items`,
    "/on-the-record": `${publicFeatures.length} features`,
    "/about": "story + scrapbook",
  };

  return (
    <>
      <Hero />

      <Section id="work" station="01+00" kicker="Selected work" title="Start here" intro="Four projects that show the range: water infrastructure, transportation data, software, and AI." action={{ href: "/work", label: "All work and the archive" }}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-2">
          <Link href={`/work/${lead.slug}`} className="group relative overflow-hidden rounded-3xl border border-line bg-surface transition-colors hover:border-line-strong lg:row-span-3">
            <div className="relative aspect-[16/10] lg:aspect-[4/3.6]">
              {lead.cover && <Image src={lead.cover.src} alt={lead.cover.alt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />}
              <span className="absolute left-4 top-4 rounded-md bg-bg/85 px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] backdrop-blur">Flagship · {lead.year}</span>
            </div>
            <div className="p-6">
              <StatusPill status={lead.status} label={lead.statusLabel} />
              <h3 className="mt-3 text-3xl font-extrabold group-hover:text-lake">{lead.title}</h3>
              <p className="mt-2 font-display text-lg leading-snug">{lead.tagline}</p>
              <p className="mt-2 text-ink-2">{lead.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-semibold">Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
            </div>
          </Link>
          {rest.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-strong sm:grid-cols-[11rem_minmax(0,1fr)]">
              <div className="relative aspect-[16/9] bg-surface-2 sm:aspect-auto sm:min-h-[150px]">
                {p.cover ? <Image src={p.cover.src} alt="" fill sizes="(min-width: 640px) 176px, 100vw" className="object-cover object-top" /> : <DataPlate p={p} compact />}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs text-ink-3">{p.year}</span><StatusPill status={p.status} label={p.statusLabel} /></div>
                <h3 className="mt-2 text-xl font-bold group-hover:text-lake">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-2">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="now" station="02+00" kicker="Now" title="On the bench this fall" intro="What I’m doing week to week, alongside a full mechanical engineering course load.">
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          <li className="bg-surface p-5">
            <p className="font-mono text-xs text-ink-3">Founder · since 2023</p>
            <p className="mt-1 font-bold">SAquaSolve Rwanda</p>
            <p className="mt-1 text-sm text-ink-2">Waiting on Lake Mirayi lab results to start the engineering design.</p>
          </li>
          {now.map((e) => (
            <li key={e.id} className="bg-surface p-5">
              <p className="font-mono text-xs text-ink-3">{e.roles[0].title}</p>
              <p className="mt-1 font-bold">{e.org}</p>
              <p className="mt-1 text-sm text-ink-2">{e.summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-2">Just finished: an engineering internship at the Colorado Department of Transportation. <Link href="/experience" className="font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">Full experience →</Link></p>
      </Section>

      <section aria-labelledby="interlude-title" className="border-t border-line bg-surface-2/60">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex gap-3">
            {["/images/techgirls-virginia-tech.jpg", "/images/sonia-saa-portrait.jpg", "/images/eac-award-2.jpg"].map((src, i) => (
              <div key={src} className={`relative aspect-[3/4] flex-1 overflow-hidden bg-surface p-1.5 shadow-[0_14px_30px_-18px_rgba(15,36,39,0.6)] ring-1 ring-line ${i === 1 ? "-translate-y-3 rotate-1" : i === 0 ? "-rotate-2" : "rotate-2"}`}>
                <div className="relative h-full w-full"><Image src={src} alt="" fill sizes="160px" className="object-cover object-[50%_30%]" /></div>
              </div>
            ))}
          </div>
          <div>
            <p className="station">Interlude</p>
            <h2 id="interlude-title" className="mt-2 text-3xl font-extrabold sm:text-4xl">Rwanda, a lake, bridges, and a rowing shell</h2>
            <p className="mt-4 max-w-[56ch] text-ink-2">I’m from Kigali and went to school next to Lake Mirayi. These days I’m in Rochester on the women’s rowing team, training in Shotokan karate, singing in my church choir, and painting when I can.</p>
            <Link href="/about" className="mt-5 inline-flex items-center gap-1.5 font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">More about me <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </div>
      </section>

      <Section id="road" station="03+00" kicker="Journey" title="Doors that opened" intro="Each step made the next one possible." action={{ href: "/journey", label: "See every turning point, and the map" }}>
        <ol className="grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-4">
          {doors.map((t, i) => (
            <li key={t.id} className="relative rounded-2xl border border-line bg-surface p-5">
              <p className="font-mono text-xs text-ink-3">STA {i}+00 · {t.year}</p>
              <h3 className="mt-2 font-bold leading-snug">{t.moment}</h3>
              <p className="mt-3 border-t border-dashed border-line-strong pt-3 text-sm text-ink-2"><span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-survey-ink">Led to → </span>{t.led}</p>
              {i < doors.length - 1 && <span aria-hidden className="absolute -right-3 top-1/2 hidden h-px w-3 bg-survey md:block" />}
            </li>
          ))}
        </ol>
      </Section>

      <Section id="recognition" station="04+00" kicker="Recognition" title="A few that mattered" action={{ href: "/recognition", label: "Recognition, with context" }}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <ul className="divide-y divide-line border-y border-line">
            {recog.map((r) => (
              <li key={r.id} className="py-4">
                <p className="font-mono text-xs text-ink-3">{r.year} · {r.issuer}</p>
                <p className="mt-0.5 text-lg font-bold">{r.title}</p>
                <p className="text-ink-2">{r.why}</p>
              </li>
            ))}
          </ul>
          {quote && (
            <figure className="self-start rounded-2xl border border-line bg-surface p-6">
              <Quote className="h-5 w-5 text-survey" aria-hidden />
              <blockquote className="mt-3 font-display text-xl leading-snug">“{quote.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-ink-2"><span className="font-semibold text-ink">{quote.name}</span> · {quote.relationship}</figcaption>
            </figure>
          )}
        </div>
      </Section>

      <Section id="index" station="05+00" kicker="Sheet index" title="The rest of the field book" intro="Thirty seconds gets you the highlights. Ten minutes gets you everything.">
        <ol className="divide-y divide-line border-y border-ink/70">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-baseline gap-4 py-4 transition-colors hover:bg-surface sm:grid-cols-[4.5rem_minmax(0,14rem)_minmax(0,1fr)_auto] sm:px-3">
                <span className="font-mono text-xs text-ink-3">{n.sheet}</span>
                <span className="font-display text-xl font-bold group-hover:text-lake">{n.label}</span>
                <span className="hidden text-ink-2 sm:block">{n.blurb}</span>
                <span className="flex items-center gap-2 font-mono text-xs text-ink-3">{counts[n.href]}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-survey" aria-hidden /></span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contact" station="06+00" kicker="Contact" title="Let’s talk shop">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="max-w-[34ch] font-display text-2xl font-medium leading-snug sm:text-3xl">Bridges, water systems, an aircraft structure, or a web tool your team keeps wishing existed. I’d like to hear about it.</p>
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
            {[
              { label: "LinkedIn", href: profile.links.linkedin, text: "linkedin.com/in/irakoze-sonia", icon: <LinkedInIcon className="h-4 w-4" /> },
              { label: "GitHub", href: profile.links.github, text: "github.com/irakozesonia123-bot", icon: <GitHubIcon className="h-4 w-4" /> },
              { label: "Resume", href: profile.links.resume, text: "Sonia_Irakoze_Resume.pdf" },
            ].map((r) => (
              <li key={r.label}>
                <a href={r.href} target="_blank" rel="noopener" className="group flex items-center justify-between gap-3 p-5 transition-colors hover:bg-surface-2">
                  <div className="min-w-0">
                    <p className="station !text-ink-3">{r.label}</p>
                    <p className="mt-1 flex items-center gap-2 break-all font-mono text-[0.95rem]">{r.icon}{r.text}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 flex-none text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-survey" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
