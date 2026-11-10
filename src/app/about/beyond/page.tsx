import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Laptop, Moon, Sunrise, Wrench } from "lucide-react";
import { Section } from "@/components/section";
import { Fig, hasFile, showSlots, willRender } from "@/components/figure";
import { Bouquet, Feather, Flower, Sprig } from "@/components/decor";
import { ArtStack } from "@/components/interactive/art-stack";
import { EagleReveal } from "@/components/interactive/eagle-reveal";
import { artworks, day, eagle, movement, music, service, words } from "@/content/beyond";

export const metadata: Metadata = {
  title: "Outside work",
  description: "The personal side of Sonia Irakoze: painting and sketching, rowing, karate, dance, choir, writing and speaking, faith, service, and an example day.",
  alternates: { canonical: "/about/beyond" },
};

const hueBg = { rose: "from-rose-soft to-lav", lav: "from-lav to-sky", sky: "from-sky to-rose-soft" } as const;
const dayIcon = { sunrise: Sunrise, book: BookOpen, laptop: Laptop, wrench: Wrench, moon: Moon } as const;

export default function BeyondPage() {
  const art = artworks
    .filter((a) => a.visibility === "public" || (a.visibility === "slot" && showSlots))
    .map((a) => ({ key: a.src, title: a.title, note: a.note, node: <Fig fig={a} aspect="aspect-[4/5]" sizes="(min-width: 640px) 360px, 85vw" showCaption={false} /> }));

  return (
    <>
      <header className="relative overflow-hidden border-b border-line bg-gradient-to-br from-rose-soft/70 via-lav/60 to-sky/70">
        <Bouquet className="pointer-events-none absolute right-8 top-4 hidden h-72 w-72 opacity-70 md:block" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20">
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden /> About
          </Link>
          <h1 className="mt-10 text-[clamp(2.8rem,8vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
            Outside <span className="script text-berry">work</span>
          </h1>
          <p className="mt-5 max-w-[54ch] text-[1.12rem] text-ink-2">
            What I do outside class and work.
          </p>
          <nav aria-label="On this page" className="mt-8">
            <ul className="flex flex-wrap gap-2 text-sm font-semibold">
              {[["#art", "Art"], ["#movement", "Rowing, karate, and dance"], ["#faith", "Music and faith"], ["#words", "Writing"], ["#service", "Service"], ["#day", "A day with me"]].map(([h, l]) => (
                <li key={h}><a href={h} className="block rounded-full bg-surface/80 px-3.5 py-1.5 ring-1 ring-line transition-colors hover:ring-berry">{l}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Art: a browsable stack */}
      <Section id="art" title="Art" tone="warm">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="max-w-[46ch] text-[1.08rem] leading-relaxed text-ink-2">
            <p>Painting, sketching, and design are another part of how I think. Sometimes I’m working within the structure of a journal cover; other times, I want the freedom of making something of my own. I want this space to hold both.</p>
            {art.length > 1 && <p className="mt-4 text-[0.98rem] text-ink-3">Use the arrows to flip through the pile.</p>}
          </div>
          <ArtStack cards={art} />
        </div>
      </Section>

      {/* Rowing, karate, and dance: annotated photographs, alternating sides */}
      <Section id="movement" title="Rowing, karate, and dance" tone="sky">
        <ul className="space-y-12 sm:space-y-16">
          {movement.map((m, k) => {
            const photo = hasFile(m.figure.src) || showSlots;
            return (
              <li key={m.id} className={`grid grid-cols-[minmax(0,1fr)] items-center gap-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-10 ${k % 2 ? "sm:[&>*:first-child]:order-2" : ""}`}>
                <div className={`rounded-2xl bg-surface p-2.5 shadow-[0_18px_40px_-28px_rgb(40_30_80/0.5)] ring-1 ring-line ${k % 2 ? "sm:rotate-1" : "sm:-rotate-1"}`}>
                  {photo ? (
                    <Fig fig={m.figure} aspect="aspect-[4/3]" sizes="(min-width: 640px) 45vw, 90vw" showCaption={false} />
                  ) : (
                    <div className={`grid aspect-[16/9] place-items-center rounded-xl bg-gradient-to-br ${hueBg[m.hue]}`} aria-hidden>
                      {k === 1 ? <Feather className="h-28 w-14 rotate-12 text-lav-ink/70" /> : <Flower className="h-20 w-20 text-rose" />}
                    </div>
                  )}
                </div>
                <div>
                  <span className="label">{String(k + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-[1.7rem] font-semibold leading-tight">{m.label}</h3>
                  {m.line && <p className="mt-3 max-w-[50ch] text-[1.06rem] leading-relaxed text-ink-2">{m.line}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Singing and faith: the eagle */}
      <Section id="faith" title="Music and faith" tone="lav">
        <p className="-mt-4 mb-10 max-w-[56ch] text-[1.08rem] text-ink-2">{music.line}</p>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start">
          <EagleReveal line={eagle.line} body={eagle.body} />
          <figure className="relative rounded-2xl bg-surface p-7 ring-1 ring-line">
            <Sprig />
            <blockquote className="mt-3 font-display text-[1.2rem] italic leading-relaxed text-ink">“{eagle.verse.text}”</blockquote>
            <figcaption className="label mt-4">{eagle.verse.cite} ({eagle.verse.translation})</figcaption>
          </figure>
        </div>
        {willRender(music.figure) && <Fig fig={music.figure} aspect="aspect-[16/9]" sizes="(min-width: 768px) 720px, 100vw" className="mt-12 max-w-3xl" />}
      </Section>

      {/* Words: a notebook page for writing, a short record of speaking */}
      <Section id="words" title="Writing and speaking">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[1.5rem] shadow-[0_24px_50px_-36px_rgb(60_20_50/0.5)] ring-1 ring-line">
            <div className="paper relative px-7 py-8 sm:px-10">
              <span className="absolute inset-y-0 left-4 w-px bg-rose/50" aria-hidden />
              <p className="label">Writing</p>
              <p className="mt-3 font-display text-[1.22rem] leading-[2rem]">{words.writing}</p>
              {words.reading.length > 0 && (
                <>
                  <p className="label mt-6">Reading</p>
                  <ul className="mt-2 font-display text-[1.1rem] leading-[2rem]">
                    {words.reading.map((b) => <li key={b.title}><span className="italic">{b.title}</span>, {b.author}{b.note ? ` · ${b.note}` : ""}</li>)}
                  </ul>
                </>
              )}
            </div>
          </div>
          <div>
            <p className="label">Speaking</p>
            <ol className="mt-3 space-y-4 border-l-2 border-rose/50 pl-5">
              {words.speaking.map((w) => (
                <li key={w.text}>
                  <span className="label !text-rose-ink">{w.when}</span>
                  <p className="text-[1.02rem] text-ink-2">{w.text}</p>
                </li>
              ))}
            </ol>
            <Fig fig={words.speakingFigure} aspect="aspect-[16/10]" sizes="(min-width: 1024px) 520px, 100vw" className="mt-6" />
          </div>
        </div>
      </Section>

      {/* Service: then and now */}
      <Section id="service" title="Service" tone="warm">
        <ol className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.map((v, k) => (
            <li key={v.text} className="relative rounded-2xl bg-surface p-5 ring-1 ring-line">
              <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[0.72rem] ${["bg-sky text-sky-ink", "bg-lav text-lav-ink", "bg-rose-soft text-rose-ink"][k % 3]}`}>{v.when}</span>
              <p className="mt-3 text-[1rem] text-ink-2">{v.text}</p>
              {v.href && <Link href={v.href} className="mt-3 inline-flex items-center gap-1 text-[0.95rem] font-semibold text-berry">Read more <ArrowRight className="h-4 w-4" aria-hidden /></Link>}
            </li>
          ))}
        </ol>
      </Section>

      {/* An example day */}
      <Section id="day" title="A day with me" intro="An example day, not a fixed routine. Most days hold some of each." tone="sky">
        <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {day.map((d, k) => {
            const Icon = dayIcon[d.icon];
            return (
              <li key={d.title} className="group relative rounded-2xl bg-surface p-5 ring-1 ring-line transition-transform duration-300 hover:-translate-y-1">
                <span className={`grid h-11 w-11 place-items-center rounded-full ${["bg-sky text-sky-ink", "bg-lav text-lav-ink", "bg-rose-soft text-rose-ink"][k % 3]}`}>
                  <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12" aria-hidden />
                </span>
                <p className="label mt-4">{d.when}</p>
                <h3 className="mt-1 text-lg font-semibold">{d.title}</h3>
                <p className="mt-1 text-[0.96rem] text-ink-2">{d.body}</p>
              </li>
            );
          })}
        </ol>
      </Section>
    </>
  );
}
