import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, FileText, MapPinned } from "lucide-react";
import { profile } from "@/content/profile";
import { ContourField } from "./contour-field";
import { GitHubIcon, LinkedInIcon } from "./brand-icons";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-[4.5rem] overflow-hidden pt-[4.5rem]">
      <div className="drafting-grid pointer-events-none absolute inset-0" aria-hidden />
      <ContourField className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 sm:px-8 md:pt-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16 lg:pb-24">
        <div>
          <p className="station">STA 00+00 · {profile.coordinates}</p>
          <h1 id="hero-title" className="mt-5 text-[clamp(3.2rem,9vw,6.6rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            Sonia
            <br />
            <span className="text-lake">Irakoze</span>
          </h1>
          <p className="mt-6 text-lg font-semibold">{profile.descriptor}</p>
          <p className="mt-1 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-ink-2">{profile.builderLine}</p>
          <p className="mt-6 max-w-[34ch] font-display text-[clamp(1.3rem,2.5vw,1.7rem)] font-medium leading-snug">{profile.positioning}</p>
          <p className="mt-4 max-w-[58ch] text-ink-2">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/work" className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 font-semibold text-bg transition-colors hover:bg-lake">
              See the work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden />
            </Link>
            <Link href="/journey#map" className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-surface/70 px-5 py-3 font-semibold transition-colors hover:border-ink">
              <MapPinned className="h-4 w-4 text-survey" aria-hidden /> Explore my map
            </Link>
            <a href={profile.links.resume} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-xl px-3 py-3 font-semibold text-ink-2 underline decoration-line-strong underline-offset-4 hover:text-ink">
              <FileText className="h-4 w-4" aria-hidden /> Resume
            </a>
            <span className="flex gap-2">
              <a href={profile.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/70 transition-colors hover:border-ink">
                <LinkedInIcon className="h-[18px] w-[18px]" />
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener" aria-label="GitHub profile" className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/70 transition-colors hover:border-ink">
                <GitHubIcon className="h-[18px] w-[18px]" />
              </a>
            </span>
          </div>
        </div>

        <aside aria-label="At a glance" className="rise w-full max-w-sm justify-self-start overflow-hidden rounded-2xl border border-ink/80 bg-surface shadow-[0_24px_60px_-30px_rgba(15,36,39,0.55)] lg:justify-self-end">
          <div className="relative aspect-[4/3.4]">
            <Image src={profile.headshot.src} alt={profile.headshot.alt} fill priority sizes="(min-width: 1024px) 384px, 90vw" className="object-cover object-[50%_22%]" />
          </div>
          <dl className="grid grid-cols-2 border-t border-ink/80 text-sm">
            <div className="col-span-2 border-b border-line px-4 py-2.5">
              <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-3">Now</dt>
              <dd className="mt-1 space-y-0.5 leading-snug">{profile.now.map((n) => <span key={n} className="block">{n}</span>)}</dd>
            </div>
            <div className="border-r border-line px-4 py-2.5"><dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-3">From</dt><dd className="mt-0.5">{profile.origin}</dd></div>
            <div className="px-4 py-2.5"><dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-3">Based in</dt><dd className="mt-0.5">{profile.location}</dd></div>
            <div className="col-span-2 border-t border-line px-4 py-2.5">
              <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-3">Looking for</dt>
              <dd className="mt-0.5 leading-snug">{profile.lookingFor}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
