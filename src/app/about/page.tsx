import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader, Section } from "@/components/section";
import { Fig, showSlots, willRender } from "@/components/figure";
import { events, features, places, recognition, story, values } from "@/content/about";
import { PlacesMap } from "@/components/interactive/places-map";
import { Feather, Flower } from "@/components/decor";
import type { Visibility } from "@/content/types";

export const metadata: Metadata = {
  title: "About me",
  description: "Sonia Irakoze’s story from Kigali and Gashora to mechanical engineering at Rochester, with recognition, conferences, media, and life outside engineering.",
  alternates: { canonical: "/about" },
};

const visible = (v: Visibility) => v === "public" || (v === "slot" && showSlots);

export default function AboutPage() {
  const recog = recognition.filter((r) => visible(r.visibility)).sort((a, b) => b.sort - a.sort);
  const evts = events.filter((e) => visible(e.visibility)).sort((a, b) => b.sort - a.sort);
  const media = features.filter((f) => f.visibility === "public").sort((a, b) => b.sort - a.sort);
  const placeFigs = Object.fromEntries(places.map((p) => [p.id, willRender(p.figure) ? <Fig fig={{ ...p.figure!, caption: p.figure!.caption }} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 440px, 100vw" /> : null]));

  return (
    <>
      <PageHeader title="About me" intro="Where I come from, places I’ve lived and worked, and recognition along the way." />

      <section aria-labelledby="story-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="order-2 mx-auto grid w-full max-w-sm gap-6 md:order-none md:max-w-none">
            <Fig fig={{ src: "/images/nsbe-albany.jpg", alt: "Sonia smiling in a blazer at an engineering conference", pos: "50% 25%" }} aspect="aspect-[4/5]" sizes="(min-width: 768px) 420px, 100vw" zoom={false} />
          </div>
          <div>
            <h2 id="story-title" className="text-[2rem] font-semibold leading-[1.05] sm:text-[2.4rem]">Where I come from</h2>
            <div className="mt-6 space-y-5 text-[1.1rem] leading-relaxed text-ink-2">
              {story.map((p, i) => <p key={i} className={i === 0 ? "text-ink" : ""}>{p}</p>)}
            </div>

            <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v.title}>
                  <Link href={v.href} className={`group block h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5 ${{ rose: "bg-rose-soft/70", lav: "bg-lav", sky: "bg-sky" }[v.hue]}`}>
                    <span className="font-display text-xl font-semibold">{v.title}</span>
                    <span className="mt-1 block text-[0.98rem] text-ink-2">{v.text}</span>
                    <span className="mt-2 inline-flex items-center gap-1 text-[0.9rem] font-semibold text-berry">{v.link} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <span id="journey" className="block scroll-mt-20" aria-hidden />
      <Section id="places" title="Places" intro="Select a place to read more." tone="sky">
        <PlacesMap places={places} figs={placeFigs} />
      </Section>

      <Section id="recognition" title="Recognition" tone="warm">
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-8 md:grid-cols-2">
          {recog.map((r) => {
            const thumb = willRender(r.figure);
            return (
              <li key={r.id} className={`grid items-start gap-5 ${thumb ? "grid-cols-[7rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)]" : "grid-cols-[minmax(0,1fr)]"}`}>
                {thumb && <Fig fig={r.figure} aspect="aspect-square" sizes="144px" showCaption={false} />}
                <div>
                  <p className="label">{r.year}{r.year ? " · " : ""}{r.issuer}</p>
                  <h3 className="mt-1 text-lg font-bold leading-snug">{r.title}</h3>
                  <p className="mt-1 text-ink-2">{r.why}</p>
                  {r.href && <Link href={r.href} className="ulink mt-2 inline-block text-[0.95rem] font-semibold">Related project</Link>}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="events" title="Conferences and events">
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {evts.map((e) => (
            <li key={e.id}>
              {willRender(e.figure) ? (
                <Fig fig={e.figure} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" showCaption={false} />
              ) : (
                <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-lav to-rose-soft p-5" aria-hidden>
                  <Flower className="h-9 w-9 text-rose" />
                  <Feather className="absolute -right-3 -top-4 h-32 w-16 rotate-[24deg] text-lav-ink/50" />
                  <span className="font-display text-3xl font-semibold leading-tight text-ink">{e.date}</span>
                </div>
              )}
              <p className="label mt-4">{e.date} · {e.place}</p>
              <h3 className="mt-1 text-lg font-bold leading-snug">{e.title}</h3>
              <p className="text-[0.95rem] font-semibold text-berry">{e.role}</p>
              <p className="mt-1.5 text-ink-2">{e.note}</p>
              {e.links && (
                <p className="mt-2 flex flex-wrap gap-x-4 text-[0.95rem]">
                  {e.links.map((l) => l.href.startsWith("/") ? <Link key={l.href} href={l.href} className="ulink font-semibold">{l.label}</Link> : <a key={l.href} href={l.href} target="_blank" rel="noopener" className="ulink font-semibold">{l.label}</a>)}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="media" title="In the news" tone="lav">
        <ul className="divide-y divide-line border-y border-line">
          {media.map((f) => (
            <li key={f.id}>
              <a href={f.href} target="_blank" rel="noopener" className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 py-4 sm:grid-cols-[6rem_minmax(0,1fr)_minmax(0,14rem)_auto]">
                <span className="label hidden sm:block">{f.date}</span>
                <span className="font-bold group-hover:text-berry">{f.headline}</span>
                <span className="col-span-2 row-start-2 text-ink-2 sm:col-span-1 sm:row-start-auto">{f.outlet}</span>
                <ArrowUpRight className="col-start-2 row-start-1 h-4 w-4 text-ink-3 group-hover:text-berry sm:col-start-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <section id="interests" aria-labelledby="beyond-cta" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Link href="/about/beyond" className="group relative block overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-soft via-lav to-sky p-8 sm:p-12">
            <Feather className="absolute -right-2 -top-6 h-40 w-20 rotate-[28deg] text-lav-ink/50 transition-transform duration-700 group-hover:rotate-[16deg]" />
            <Flower className="h-10 w-10 text-rose transition-transform duration-700 group-hover:rotate-[72deg]" />
            <h2 id="beyond-cta" className="mt-4 text-[2.1rem] font-semibold leading-tight sm:text-[2.8rem]">Outside <span className="script text-berry">work</span></h2>
            <p className="mt-3 max-w-[50ch] text-[1.08rem] text-ink-2">Art, rowing, karate, music, faith, writing, and service.</p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-ink">See more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
