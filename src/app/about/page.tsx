import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, Section } from "@/components/section";
import { publicInterests } from "@/content/record";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: "Who Sonia Irakoze is: from Kigali and Gashora to mechanical engineering at Rochester, plus rowing, karate, singing, painting, and writing.",
  alternates: { canonical: "/about" },
};

const story = [
  "I’m from Rwanda. I spent three years as a boarding student at Gashora Girls Academy of Science and Technology, beside Lake Mirayi, a lake many nearby residents use even though the water isn’t safe to drink. That gap between having water nearby and having safe water is the problem I keep coming back to.",
  "In 2023, TechGirls took me to Virginia Tech, where I ran flume experiments and wrote my first Python, and then to a two-day job shadow at the Colorado Department of Transportation. I remember quietly wishing I could come back. In 2026 I did, as an engineering intern on the team that tracks Colorado’s bridges.",
  "At the University of Rochester I study mechanical engineering and keep ending up as the person on the team who also builds the software: a web tool CDOT published, the website for my own water project, and data checks for an AI that diagnoses crop disease. I like work where the physical system and the information about it both have to be right.",
  "Next I want internships and research where mechanical design meets infrastructure, water, energy, or aerospace, especially where better tools help engineers make better decisions.",
];

const scrapbook = [
  { src: "/images/eac-award-1.jpg", alt: "Sonia receiving an award from an official in Arusha", caption: "Arusha, 2022. An essay prize, my first time representing Rwanda.", tilt: "-rotate-2" },
  { src: "/images/techgirls-virginia-tech.jpg", alt: "Sonia on the Virginia Tech campus at sunset", caption: "Virginia Tech, 2023. TechGirls.", tilt: "rotate-1" },
  { src: "/images/nsbe-chicago-2025.jpg", alt: "Sonia and a friend at the NSBE 50th anniversary backdrop", caption: "Chicago, 2025. First NSBE convention.", tilt: "-rotate-1" },
  { src: "/images/sonia-saa-portrait.jpg", alt: "Sonia smiling, chin resting on her hand", caption: "Rochester. Student Alumni Ambassador portraits.", tilt: "rotate-2" },
  { src: "/images/cdot-field-site.jpg", alt: "Sonia in a hard hat at a construction site in Colorado", caption: "Colorado, 2026. Back at CDOT.", tilt: "-rotate-1" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader sheet="S-09" kicker="About" title="The person behind the field book" intro="Engineering student, founder, and the person on the team who also writes the code. Also: a rower, a karateka, a singer, and a painter." />
      <Section id="story" station="09+10" kicker="Story" title="How I got here">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)]">
          <div className="space-y-5 text-[1.08rem] leading-relaxed">
            {story.map((p, i) => <p key={i} className={i === 0 ? "font-display text-xl font-medium leading-snug sm:text-[1.4rem]" : "text-ink-2"}>{p}</p>)}
            <p className="pt-2"><Link href="/journey" className="font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">Follow the whole route on the Journey page →</Link></p>
          </div>
          <aside aria-labelledby="clock-title" className="rounded-2xl border border-line bg-surface p-6">
            <p className="station">Margin notes</p>
            <h2 id="clock-title" className="mt-2 text-2xl font-bold">When I’m not engineering</h2>
            <ul className="mt-5 space-y-5">
              {publicInterests.map((x) => (
                <li key={x.id} className="relative border-l-2 border-dashed border-line-strong pl-4">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-survey-ink">{x.label}</p>
                  <p className="mt-1 text-ink-2">{x.line}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>
      <section aria-labelledby="scrap-title" className="border-t border-line bg-surface-2/60">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="station">Scrapbook</p>
          <h2 id="scrap-title" className="mt-2 text-3xl font-extrabold">A few pages from the field book</h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
            {scrapbook.map((s) => (
              <li key={s.src} className={`${s.tilt} transition-transform duration-300 hover:rotate-0 motion-reduce:rotate-0`}>
                <figure className="bg-surface p-2.5 pb-3 shadow-[0_14px_30px_-18px_rgba(15,36,39,0.6)] ring-1 ring-line">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-2"><Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 210px, 45vw" className="object-cover object-[50%_30%]" /></div>
                  <figcaption className="mt-2 font-mono text-[0.68rem] leading-snug text-ink-2">{s.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-12 sm:px-8">
          <p className="max-w-xl font-display text-2xl font-medium leading-snug">Want to talk about bridges, water, aircraft, or a tool your team keeps wishing existed?</p>
          <a href={`mailto:${profile.email}`} className="rounded-xl bg-ink px-5 py-3 font-semibold text-bg hover:bg-lake">Email me</a>
        </div>
      </section>
    </>
  );
}
