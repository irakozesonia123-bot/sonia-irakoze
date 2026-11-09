import { ChevronDown } from "lucide-react";
import type { Figure, StoryBlock } from "@/content/types";
import { Fig, willRender } from "../figure";

const stateLabel = { done: "Done", underway: "Underway", next: "Next" } as const;
const stateCls = { done: "text-teal", underway: "text-coral-ink", next: "text-ink-3" } as const;

function H({ children, id }: { children: React.ReactNode; id?: string }) {
  return <h2 id={id} className="scroll-mt-24 text-[1.65rem] font-extrabold leading-tight sm:text-[2rem]">{children}</h2>;
}

const slug = (t: string) => t.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Text beside the image it explains. Without a renderable image, text runs full width. */
function WithFigure({ figure, side = "right", children }: { figure?: Figure; side?: "left" | "right"; children: React.ReactNode }) {
  if (!willRender(figure)) return <div className="max-w-[68ch]">{children}</div>;
  const tall = figure?.fit === "contain";
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 md:grid-cols-2 md:gap-12">
      <div className={side === "left" ? "md:order-2" : ""}>{children}</div>
      <Fig fig={figure} aspect={tall ? "aspect-[4/3]" : "aspect-[4/3]"} sizes="(min-width: 768px) 520px, 100vw" />
    </div>
  );
}

export function Story({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="space-y-20">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "text":
            return (
              <section key={i} aria-labelledby={slug(b.title)}>
                <WithFigure figure={b.figure} side={b.figureSide}>
                  <H id={slug(b.title)}>{b.title}</H>
                  <div className="mt-4 space-y-4 text-[1.06rem] leading-relaxed text-ink-2">{b.body.map((p, j) => <p key={j}>{p}</p>)}</div>
                </WithFigure>
              </section>
            );
          case "list":
            return (
              <section key={i} aria-labelledby={slug(b.title)}>
                <WithFigure figure={b.figure}>
                  <H id={slug(b.title)}>{b.title}</H>
                  {b.intro && <p className="mt-3 text-ink-2">{b.intro}</p>}
                  <ul className="mt-4 space-y-2.5 text-[1.04rem] text-ink-2">
                    {b.items.map((x) => <li key={x} className="flex gap-3"><span className="mt-[0.7rem] h-[2px] w-3 flex-none bg-coral" aria-hidden /><span>{x}</span></li>)}
                  </ul>
                </WithFigure>
              </section>
            );
          case "steps":
            return (
              <section key={i} aria-labelledby={slug(b.title)}>
                <H id={slug(b.title)}>{b.title}</H>
                {b.intro && <p className="mt-3 max-w-[66ch] text-ink-2">{b.intro}</p>}
                <ol className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-7 md:grid-cols-2">
                  {b.steps.map((s) => (
                    <li key={s.title} className="border-t border-line pt-4">
                      <p className="label !text-coral-ink">{s.label}</p>
                      <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                      <p className="mt-1 text-ink-2">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "contribution":
            return (
              <section key={i} aria-labelledby={`contrib-${i}`} className="rounded-2xl bg-surface-2/70 p-6 sm:p-8">
                <H id={`contrib-${i}`}>{b.title ?? "Team work and my part"}</H>
                <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="label !text-teal">{b.teamLabel ?? "The team"}</h3>
                    <ul className="mt-3 space-y-2 text-ink-2">{b.team.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                  <div>
                    <h3 className="label !text-coral-ink">My part</h3>
                    <ul className="mt-3 space-y-2">
                      {b.me.map((t) => <li key={t} className="flex gap-3"><span className="mt-[0.7rem] h-[2px] w-3 flex-none bg-coral" aria-hidden /><span>{t}</span></li>)}
                    </ul>
                  </div>
                </div>
              </section>
            );
          case "figures": {
            const shown = b.items.filter((f) => willRender(f));
            if (!shown.length && !b.intro) return null;
            const id = b.title ? slug(b.title) : undefined;
            return (
              <section key={i} aria-labelledby={id}>
                {b.title && <H id={id}>{b.title}</H>}
                {b.intro && <p className="mt-3 max-w-[68ch] text-[1.06rem] leading-relaxed text-ink-2">{b.intro}</p>}
                {shown.length > 0 && (
                  <div className={`mt-7 grid grid-cols-[minmax(0,1fr)] gap-6 ${shown.length === 1 ? "md:max-w-2xl" : shown.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                    {shown.map((f) => <Fig key={f.src} fig={f} sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw" />)}
                  </div>
                )}
              </section>
            );
          }
          case "compare":
            return (
              <section key={i} aria-labelledby={slug(b.title)}>
                <H id={slug(b.title)}>{b.title}</H>
                {b.intro && <p className="mt-3 max-w-[70ch] text-[1.06rem] leading-relaxed text-ink-2">{b.intro}</p>}
                <div className="mt-7 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2">
                  {[b.before, b.after].map((img, k) => (
                    <div key={img.src}>
                      <p className={`label mb-2 ${k === 1 ? "!text-coral-ink" : ""}`}>{k === 0 ? "Before" : "After"} · {img.label}</p>
                      <Fig fig={{ ...img, caption: undefined }} aspect="aspect-[3/2]" sizes="(min-width: 768px) 520px, 100vw" />
                    </div>
                  ))}
                </div>
              </section>
            );
          case "status":
            return (
              <section key={i} aria-labelledby={slug(b.title)}>
                <H id={slug(b.title)}>{b.title}</H>
                {b.intro && <p className="mt-3 max-w-[66ch] text-ink-2">{b.intro}</p>}
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {b.rows.map((r) => (
                    <li key={r.text} className="grid grid-cols-[minmax(0,1fr)] gap-1 py-3.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
                      <span className={`label ${stateCls[r.state]}`}>{stateLabel[r.state]}</span>
                      <span>{r.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          case "quote":
            return (
              <blockquote key={i} className="max-w-3xl">
                <p className="font-display text-[1.6rem] font-medium leading-snug sm:text-[1.9rem]">“{b.quote}”</p>
                <footer className="label mt-4">{b.cite}</footer>
              </blockquote>
            );
          case "lesson":
            return (
              <section key={i} aria-labelledby={`lesson-${i}`} className="border-l-[3px] border-coral pl-6">
                <h2 id={`lesson-${i}`} className="text-xl font-extrabold">{b.title}</h2>
                <p className="mt-2 max-w-[66ch] text-[1.08rem] leading-relaxed">{b.body}</p>
              </section>
            );
          case "details":
            return (
              <details key={i} className="group border-y border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl font-bold [&::-webkit-details-marker]:hidden">
                  {b.title}
                  <ChevronDown className="h-5 w-5 flex-none text-ink-3 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <div className="pb-6">
                  {b.intro && <p className="max-w-[66ch] text-ink-2">{b.intro}</p>}
                  <dl className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-4 sm:grid-cols-2">
                    {b.items.map((d) => (
                      <div key={d.label}>
                        <dt className="label !text-teal">{d.label}</dt>
                        <dd className="mt-0.5">{d.detail}</dd>
                      </div>
                    ))}
                  </dl>
                  {b.caption && <p className="mt-4 text-sm text-ink-3">{b.caption}</p>}
                </div>
              </details>
            );
        }
      })}
    </div>
  );
}
