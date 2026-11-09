import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronDown, Laptop, Moon, Sunrise, Wrench } from "lucide-react";
import { Section } from "@/components/section";
import { Fig, hasFile, showSlots, willRender } from "@/components/figure";
import { Bouquet, Feather, Flower, Sprig } from "@/components/decor";
import { ArtStack } from "@/components/interactive/art-stack";
import { EagleReveal } from "@/components/interactive/eagle-reveal";
import { artworks, day, eagle, notebook, notes, strip } from "@/content/beyond";

export const metadata: Metadata = {
  title: "Beyond the blueprint",
  description: "The personal side of Sonia Irakoze: art, rowing, karate, choir, writing, faith, mentoring, and an example day.",
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
        <Bouquet className="pointer-events-none absolute -right-8 top-4 h-52 w-52 opacity-70 sm:right-8 sm:h-72 sm:w-72" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20">
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden /> About
          </Link>
          <h1 className="mt-10 text-[clamp(2.8rem,8vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
            Beyond the <span className="script text-berry">blueprint</span>
          </h1>
          <p className="mt-5 max-w-[54ch] text-[1.12rem] text-ink-2">
            The things I do when I’m not designing, debugging, or writing proposals. Have a look around.
          </p>
          <nav aria-label="On this page" className="mt-8">
            <ul className="flex flex-wrap gap-2 text-sm font-semibold">
              {[["#art", "Art"], ["#movement", "Movement and music"], ["#notebook", "Reading and writing"], ["#faith", "Faith"], ["#home", "Rwanda"], ["#day", "An example day"]].map(([h, l]) => (
                <li key={h}><a href={h} className="block rounded-full bg-surface/80 px-3.5 py-1.5 ring-1 ring-line transition-colors hover:ring-berry">{l}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Art: a browsable stack */}
      <Section id="art" title="Painting and design" tone="warm">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="max-w-[46ch] text-[1.08rem] leading-relaxed text-ink-2">
            <p>I paint when there’s time, and I enjoy design work like this cover.</p>
            {art.length > 1 && <p className="mt-4 text-[0.98rem] text-ink-3">Use the arrows to flip through the pile.</p>}
          </div>
          <ArtStack cards={art} />
        </div>
      </Section>

      {/* Movement and music: a photo strip */}
      <Section id="movement" title="Movement and music" tone="sky">
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-10 sm:grid-cols-3 sm:gap-6">
          {strip.map((s, k) => (
            <li key={s.id} className={`rounded-2xl bg-surface p-3 pb-5 shadow-[0_18px_40px_-28px_rgb(40_30_80/0.5)] ring-1 ring-line transition-transform duration-500 hover:rotate-0 ${["-rotate-2", "rotate-1", "-rotate-1"][k % 3]}`}>
              {hasFile(s.figure.src) || showSlots ? (
                <Fig fig={s.figure} aspect="aspect-[4/5]" sizes="(min-width: 640px) 33vw, 90vw" showCaption={false} />
              ) : (
                <div className={`relative grid aspect-[16/9] place-items-center sm:aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br ${hueBg[s.hue]}`} aria-hidden>
                  {k === 1 ? <Feather className="h-32 w-16 rotate-12 text-lav-ink/70" /> : <Flower className="h-24 w-24 text-rose" />}
                </div>
              )}
              <h3 className="mt-4 px-1 text-xl font-semibold">{s.label}</h3>
              <p className="mt-1 px-1 text-[0.98rem] text-ink-2">{s.line}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Reading and writing: a notebook */}
      <Section id="notebook" title="Reading and writing">
        <div className={`grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[1.5rem] ring-1 ring-line shadow-[0_24px_50px_-36px_rgb(60_20_50/0.5)] ${notebook.reading.length || showSlots ? "md:grid-cols-2" : "max-w-3xl"}`}>
          <div className="paper relative px-7 py-8 sm:px-10">
            <span className="absolute inset-y-0 left-4 w-px bg-rose/50" aria-hidden />
            <p className="label">Writing</p>
            <p className="mt-3 font-display text-[1.25rem] leading-[2rem]">{notebook.writing}</p>
          </div>
          {notebook.reading.length > 0 ? (
            <div className="paper border-t border-line px-7 py-8 sm:px-10 md:border-l md:border-t-0">
              <p className="label">Reading</p>
              <ul className="mt-3 space-y-0 font-display text-[1.15rem] leading-[2rem]">
                {notebook.reading.map((b) => <li key={b.title}><span className="italic">{b.title}</span>, {b.author}{b.note ? ` · ${b.note}` : ""}</li>)}
              </ul>
            </div>
          ) : showSlots ? (
            <div className="grid place-items-center border-t-2 border-dashed border-rose/60 bg-rose-soft/50 px-7 py-8 text-center md:border-l-2 md:border-t-0">
              <p className="label !text-rose-ink">Content slot · Reading</p>
              <p className="mt-2 max-w-[34ch] text-sm text-ink">Add books you’d like to share in <code className="font-mono text-[0.75rem]">src/content/beyond.ts</code> → <code className="font-mono text-[0.75rem]">notebook.reading</code>. Hidden on the live site until filled.</p>
            </div>
          ) : null}
        </div>
      </Section>

      {/* Faith: the eagle */}
      <Section id="faith" title="Faith" tone="lav">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-start">
          <EagleReveal line={eagle.line} body={eagle.body} />
          <figure className="relative rounded-2xl bg-surface p-7 ring-1 ring-line">
            <Sprig />
            <blockquote className="mt-3 font-display text-[1.2rem] italic leading-relaxed text-ink">“{eagle.verse.text}”</blockquote>
            <figcaption className="label mt-4">{eagle.verse.cite} ({eagle.verse.translation})</figcaption>
          </figure>
        </div>
      </Section>

      {/* Rwanda and mentoring: expandable notes */}
      <Section id="home" title="Rwanda, and the students coming next">
        <div className="space-y-4">
          {notes.map((n) => (
            <details key={n.id} className="group rounded-2xl bg-surface ring-1 ring-line open:ring-berry/40" open>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3 font-display text-xl font-semibold"><Feather className="h-8 w-4 text-lav-ink" />{n.title}</span>
                <ChevronDown className="h-5 w-5 flex-none text-ink-3 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 px-6 pb-6 md:grid-cols-2">
                <p className="text-[1.06rem] leading-relaxed text-ink-2">{n.body}</p>
                {willRender(n.figure) && <Fig fig={n.figure} aspect="aspect-[4/3]" sizes="(min-width: 768px) 480px, 100vw" />}
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* An example day */}
      <Section id="day" title="A day in my world" intro="An example day, not a fixed routine. Most days hold some of each." tone="warm">
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
