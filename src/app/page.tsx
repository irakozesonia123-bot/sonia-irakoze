import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, FileText } from "lucide-react";
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
      {/* 1. Introduction */}
      <section aria-labelledby="hero-title" className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-16">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:gap-14">
          <div className="rise">
            <span className="dim" aria-hidden />
            <h1 id="hero-title" className="mt-4 text-[clamp(3rem,8vw,5.6rem)] font-extrabold leading-[0.92] tracking-[-0.04em]">
              Sonia Irakoze
            </h1>
            <p className="mt-5 text-lg font-semibold text-teal sm:text-xl">
              {profile.program} · {profile.school} · {profile.classOf}
            </p>
            <p className="mt-4 max-w-[54ch] text-[1.12rem] leading-relaxed text-ink-2">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#work" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-bg transition-colors hover:bg-teal-strong">
                Explore my work <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </Link>
              <a href={profile.links.resume} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-semibold transition-colors hover:border-ink">
                <FileText className="h-4 w-4" aria-hidden /> Resume
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[15rem] sm:max-w-[20rem] md:max-w-none">
            <div className="absolute -right-3 -top-3 h-full w-full rounded-[1.75rem] bg-coral-soft sm:-right-4 sm:-top-4" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface-2">
              <Image src={profile.headshot.src} alt={profile.headshot.alt} fill priority sizes="(min-width: 768px) 400px, 352px" className="object-cover object-[50%_25%]" />
            </div>
            <p className="label mt-3 text-right">From {profile.origin} · In {profile.location}</p>
          </div>
        </div>
      </section>

      {/* 2. Selected work */}
      <Section id="work" title="Selected work" action={{ href: "/work", label: "All projects" }} className="border-t border-line">
        {lead && <ProjectCard p={lead} size="lg" />}
        <ul className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => <li key={p.slug}><ProjectCard p={p} /></li>)}
        </ul>
      </Section>

      {/* 3. Experience preview */}
      <Section id="experience" title="Experience" action={{ href: "/experience", label: "Full experience" }} className="border-t border-line">
        <ul className="divide-y divide-line border-y border-line">
          {roles.map((e) => (
            <li key={e.id}>
              <Link href={`/experience#${e.id}`} className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-0.5 py-5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_10rem_auto]">
                <span className="font-display text-xl font-bold group-hover:text-teal">{e.org}</span>
                <span className="col-span-2 row-start-2 text-ink-2 sm:col-span-1 sm:row-start-auto">{e.roles[0].title}</span>
                <span className="label col-span-2 row-start-3 sm:col-span-1 sm:row-start-auto">{e.roles.at(-1)!.start && e.roles[0].end ? `${e.roles.at(-1)!.start} – ${e.roles[0].end}` : e.roles[0].start}</span>
                <ArrowRight className="col-start-2 row-start-1 h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-teal sm:col-start-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. Personal */}
      <section aria-labelledby="me-title" className="bg-surface-2/70">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-end gap-4">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image src="/images/sonia-saa-portrait.jpg" alt="Sonia smiling, chin resting on her hand" fill sizes="(min-width: 768px) 260px, 50vw" className="object-cover object-[50%_25%]" />
              </div>
            </figure>
            <figure className="mb-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image src="/images/eac-award-2.jpg" alt="Sonia, in her school uniform, receiving her East African Community essay prize in Arusha" fill sizes="(min-width: 768px) 220px, 45vw" className="object-cover object-[94%_35%]" />
              </div>
              <figcaption className="label mt-2">Arusha, 2023, representing Rwanda</figcaption>
            </figure>
          </div>
          <div>
            <span className="dim" aria-hidden />
            <h2 id="me-title" className="mt-3 text-[2rem] font-extrabold leading-[1.05] sm:text-[2.6rem]">A little more about me</h2>
            <p className="mt-5 max-w-[56ch] text-[1.1rem] leading-relaxed text-ink-2">
              I grew up in Kigali and went to boarding school in Gashora, beside the lake that started SAquaSolve. An essay prize first took me abroad, to represent Rwanda in Arusha. These days I row, train in Shotokan karate, sing in my church choir, and mentor students back home who are applying to university.
            </p>
            <ArrowLink href="/about" className="mt-6">More about me</ArrowLink>
          </div>
        </div>
      </section>

      {/* 5. Contact */}
      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 border-t border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-5 py-20 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <span className="dim" aria-hidden />
            <h2 id="contact-title" className="mt-3 text-[2rem] font-extrabold leading-[1.05] sm:text-[2.6rem]">Get in touch</h2>
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
                  <span className="mt-1 flex items-center gap-2 font-display text-xl font-bold group-hover:text-teal"><LinkedInIcon className="h-4 w-4" /> irakoze-sonia</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-ink-3 group-hover:text-teal" aria-hidden />
              </a>
            </li>
            <li>
              <a href={profile.links.resume} target="_blank" rel="noopener" className="group flex items-center justify-between gap-3 py-5">
                <span>
                  <span className="label block">Resume</span>
                  <span className="mt-1 block font-display text-xl font-bold group-hover:text-teal">Download PDF</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-ink-3 group-hover:text-teal" aria-hidden />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
