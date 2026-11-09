import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader, Section } from "@/components/section";
import { Fig, showSlots, willRender } from "@/components/figure";
import { events, features, interests, milestones, recognition, story } from "@/content/about";
import type { Visibility } from "@/content/types";

export const metadata: Metadata = {
  title: "About",
  description: "Sonia Irakoze’s story from Kigali and Gashora to mechanical engineering at Rochester, with recognition, conferences, media, and life outside engineering.",
  alternates: { canonical: "/about" },
};

const visible = (v: Visibility) => v === "public" || (v === "slot" && showSlots);

export default function AboutPage() {
  const recog = recognition.filter((r) => visible(r.visibility)).sort((a, b) => b.sort - a.sort);
  const evts = events.filter((e) => visible(e.visibility)).sort((a, b) => b.sort - a.sort);
  const media = features.filter((f) => f.visibility === "public").sort((a, b) => b.sort - a.sort);
  const hobbies = interests.filter((i) => i.visibility === "public");

  return (
    <>
      <PageHeader title="About" intro="An engineering student from Rwanda who likes building things people depend on, and who keeps ending up in charge of them." />

      <section aria-labelledby="story-title" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="grid gap-6">
            <Fig fig={{ src: "/images/nsbe-albany.jpg", alt: "Sonia smiling in a blazer at an engineering conference", pos: "50% 25%" }} aspect="aspect-[4/5]" sizes="(min-width: 768px) 420px, 100vw" zoom={false} />
            <Fig fig={{ src: "/images/about/rwanda.jpg", alt: "Sonia at home in Rwanda", caption: "Home, in Rwanda.", tag: "Fieldwork", want: "A photo of you in Rwanda: Gashora, Lake Mirayi, or Kigali." }} aspect="aspect-[4/3]" sizes="(min-width: 768px) 420px, 100vw" />
          </div>
          <div>
            <h2 id="story-title" className="text-[2rem] font-extrabold leading-[1.05] sm:text-[2.4rem]">How I got here</h2>
            <div className="mt-6 space-y-5 text-[1.1rem] leading-relaxed text-ink-2">
              {story.map((p, i) => <p key={i} className={i === 0 ? "text-ink" : ""}>{p}</p>)}
            </div>

            <h3 id="journey" className="mt-12 scroll-mt-24 font-display text-xl font-extrabold">Along the way</h3>
            <ol className="mt-4 border-l border-line-strong">
              {milestones.map((m) => (
                <li key={m.text} className="relative py-2 pl-6">
                  <span className="absolute -left-[4px] top-[1.05rem] h-[7px] w-[7px] rounded-full bg-coral" aria-hidden />
                  <span className="label mr-3">{m.year} · {m.place}</span>
                  <span className="block sm:inline">{m.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

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
              <Fig fig={e.figure} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" showCaption={false} />
              <p className="label mt-4">{e.date} · {e.place}</p>
              <h3 className="mt-1 text-lg font-bold leading-snug">{e.title}</h3>
              <p className="text-[0.95rem] font-semibold text-teal">{e.role}</p>
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

      <Section id="media" title="In the news" tone="warm">
        <ul className="divide-y divide-line border-y border-line">
          {media.map((f) => (
            <li key={f.id}>
              <a href={f.href} target="_blank" rel="noopener" className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 py-4 sm:grid-cols-[6rem_minmax(0,1fr)_minmax(0,14rem)_auto]">
                <span className="label hidden sm:block">{f.date}</span>
                <span className="font-bold group-hover:text-teal">{f.headline}</span>
                <span className="col-span-2 row-start-2 text-ink-2 sm:col-span-1 sm:row-start-auto">{f.outlet}</span>
                <ArrowUpRight className="col-start-2 row-start-1 h-4 w-4 text-ink-3 group-hover:text-teal sm:col-start-4" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="interests" title="Outside engineering">
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {hobbies.map((h) => (
            <li key={h.id}>
              {willRender(h.figure) && <Fig fig={h.figure} aspect="aspect-[4/3]" sizes="(min-width: 1024px) 360px, 50vw" showCaption={false} className="mb-4" />}
              <h3 className="text-lg font-bold">{h.label}</h3>
              <p className="mt-1 text-ink-2">{h.line}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
