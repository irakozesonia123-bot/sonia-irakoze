import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { Bouquet, Feather, Flower, Sprig } from "@/components/decor";
import { Intro } from "@/components/interactive/intro";
import { NameMark } from "@/components/interactive/name-mark";
import { PortraitHello } from "@/components/interactive/portrait-hello";
import { Section, ArrowLink } from "@/components/section";
import { CopyEmail } from "@/components/copy-email";
import { LinkedInIcon } from "@/components/brand-icons";
import { ProjectCard } from "@/components/work/project-card";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { publicExperience } from "@/content/experience";

export default function Home() {
  const [lead, ...others] = featuredProjects;
  const roles = publicExperience.filter((e) => e.preview);

  return (
    <>
      <Intro />
      {/* 1. Introduction */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-gradient-to-br from-rose-soft/70 via-bg to-lav/80">
        <Bouquet className="pointer-events-none absolute -left-10 bottom-0 hidden h-64 w-64 opacity-50 md:block" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 pb-16 pt-12 sm:px-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-14 md:pb-24 md:pt-16">
          <div className="rise">
            <Sprig />
            <NameMark name={profile.name} note={`Born and raised in ${profile.origin}. Studying in ${profile.location}.`} />
            <p className="mt-5 text-lg font-semibold text-berry sm:text-xl">
              {profile.program} · {profile.school} · {profile.classOf}
            </p>
            <p className="mt-4 max-w-[54ch] text-[1.12rem] leading-relaxed text-ink-2">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#work" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-bg transition-colors hover:bg-berry-strong">
                Explore my projects <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </Link>
              <a href={profile.links.resume} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/70 px-6 py-3 font-semibold transition-colors hover:border-ink">
                <FileText className="h-4 w-4" aria-hidden /> Resume
              </a>
            </div>
          </div>
          <PortraitHello src={profile.headshot.src} alt={profile.headshot.alt} />
        </div>
      </section>

      {/* 2. Selected work */}
      <Section id="work" title="Selected projects" action={{ href: "/work", label: "All projects" }}>
        {lead && <ProjectCard p={lead} size="lg" />}
        <ul className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => <li key={p.slug}><ProjectCard p={p} /></li>)}
        </ul>
      </Section>

      {/* 3. Experience preview */}
      <Section id="experience" title="Experience" action={{ href: "/experience", label: "Full experience" }} tone="sky">
        <ul className="divide-y divide-line-strong/60 border-y border-line-strong/60">
          {roles.map((e) => (
            <li key={e.id}>
              <Link href={`/experience#${e.id}`} className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-0.5 py-5 transition-[padding] duration-300 hover:pl-2 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_10rem_auto]">
                <span className="font-display text-xl font-bold group-hover:text-berry">{e.org}</span>
                <span className="col-span-2 row-start-2 text-ink-2 sm:col-span-1 sm:row-start-auto">{e.roles[0].title}</span>
                <span className="label col-span-2 row-start-3 sm:col-span-1 sm:row-start-auto">{e.roles.at(-1)!.start && e.roles[0].end ? `${e.roles.at(-1)!.start} – ${e.roles[0].end}` : e.roles[0].start}</span>
                <ArrowRight className="col-start-2 row-start-1 h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-berry sm:col-start-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Beyond the blueprint teaser */}
      <section aria-labelledby="me-title" className="relative overflow-hidden bg-lav/70">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Link href="/about/beyond" className="group relative mx-auto block w-full max-w-sm" aria-label="Beyond the blueprint: painting, music, faith, and home">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-[2rem] bg-sky transition-transform duration-500 group-hover:rotate-6" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] ring-4 ring-surface">
              <Image src="/images/sonia-saa-portrait.jpg" alt="" fill sizes="(min-width: 768px) 384px, 90vw" className="object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <Flower className="absolute -right-4 -top-4 h-14 w-14 text-rose transition-transform duration-700 group-hover:rotate-[72deg]" />
            <Feather className="absolute -bottom-6 -left-3 h-20 w-10 text-lav-ink transition-transform duration-700 group-hover:-rotate-12" />
          </Link>
          <div>
            <Sprig />
            <h2 id="me-title" className="mt-2 text-[2.1rem] font-semibold leading-[1.05] sm:text-[2.7rem]">Beyond the <span className="script text-berry">blueprint</span></h2>
            <p className="mt-5 max-w-[52ch] text-[1.1rem] leading-relaxed text-ink-2">
              Painting, choir, karate, rowing, writing, faith, and the students I mentor back home. The parts of my life that don’t fit on a resume have their own page.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Interests">
              {["Painting", "Rowing", "Shotokan karate", "Choir", "Reading", "Writing", "Faith", "Mentoring"].map((t, k) => (
                <li key={t} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${["bg-rose-soft text-rose-ink", "bg-sky text-sky-ink", "bg-surface text-lav-ink"][k % 3]}`}>{t}</li>
              ))}
            </ul>
            <ArrowLink href="/about/beyond" className="mt-7">Step inside</ArrowLink>
          </div>
        </div>
      </section>

      {/* 5. Contact */}
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Sprig />
            <h2 id="contact-title" className="mt-3 text-[2rem] font-semibold leading-[1.05] sm:text-[2.6rem]">Get in touch</h2>
            <p className="mt-5 max-w-[46ch] text-[1.1rem] leading-relaxed text-ink-2">{profile.lookingFor} Email reaches me fastest.</p>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            <li className="flex flex-wrap items-center justify-between gap-3 py-5">
              <div className="min-w-0">
                <p className="label">Email</p>
                <a href={`mailto:${profile.email}`} className="ulink mt-1 block break-all font-display text-xl font-bold">{profile.email}</a>
              </div>
              <CopyEmail email={profile.email} />
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener" className="group flex items-center justify-between gap-3 py-5">
                <span>
                  <span className="label block">LinkedIn</span>
                  <span className="mt-1 flex items-center gap-2 font-display text-xl font-bold group-hover:text-berry"><LinkedInIcon className="h-4 w-4" /> irakoze-sonia</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-ink-3 group-hover:text-berry" aria-hidden />
              </a>
            </li>
            <li>
              <a href={profile.links.resume} target="_blank" rel="noopener" className="group flex items-center justify-between gap-3 py-5">
                <span>
                  <span className="label block">Resume</span>
                  <span className="mt-1 block font-display text-xl font-bold group-hover:text-berry">Download PDF</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-ink-3 group-hover:text-berry" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
