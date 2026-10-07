import Image from "next/image";
import type { StoryBlock } from "@/content/types";

export const blockId = (b: StoryBlock) =>
  "title" in b && b.title ? b.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : undefined;

const stateStyle = {
  done: { label: "Done", cls: "text-ok bg-ok/12 border-ok/30", dot: "bg-current" },
  underway: { label: "Underway", cls: "text-wip bg-wip/12 border-wip/35", dot: "bg-current" },
  next: { label: "Next", cls: "text-lake bg-lake/10 border-lake/30", dot: "border border-current" },
  "not-started": { label: "Not started", cls: "text-ink-3 bg-surface-2 border-line-strong", dot: "border border-current" },
} as const;

function H({ id, children }: { id?: string; children: React.ReactNode }) {
  return <h2 id={id} className="scroll-mt-28 text-2xl font-bold sm:text-[1.75rem]">{children}</h2>;
}

export function Story({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="space-y-14">
      {blocks.map((b, i) => {
        const id = blockId(b);
        switch (b.type) {
          case "stats":
            return (
              <dl key={i} className={`grid gap-px overflow-hidden rounded-2xl border border-line bg-line ${b.stats.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : b.stats.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2"}`}>
                {b.stats.map((s) => (
                  <div key={s.label} className="bg-surface p-5">
                    <dd className="font-display text-4xl font-extrabold tracking-tight text-lake">{s.value}</dd>
                    <dt className="mt-1 text-sm leading-snug">{s.label}</dt>
                    {s.note && <dd className="mt-1 font-mono text-[0.68rem] text-ink-3">{s.note}</dd>}
                  </div>
                ))}
              </dl>
            );
          case "text":
            return (
              <section key={i} aria-labelledby={id}>
                <H id={id}>{b.title}</H>
                <div className="mt-4 space-y-4 text-[1.06rem] leading-relaxed text-ink-2">{b.body.map((p, j) => <p key={j} className="max-w-[68ch]">{p}</p>)}</div>
              </section>
            );
          case "list":
            return (
              <section key={i} aria-labelledby={id}>
                <H id={id}>{b.title}</H>
                <ul className="mt-4 space-y-2.5 text-[1.04rem] text-ink-2">
                  {b.items.map((x) => <li key={x} className="flex gap-3"><span className="mt-[0.72rem] h-[3px] w-3 flex-none bg-survey" aria-hidden /><span className="max-w-[66ch]">{x}</span></li>)}
                </ul>
              </section>
            );
          case "steps":
            return (
              <section key={i} aria-labelledby={id}>
                <H id={id}>{b.title}</H>
                {b.intro && <p className="mt-3 max-w-[66ch] text-ink-2">{b.intro}</p>}
                <ol className="relative mt-6 space-y-6 border-l-2 border-dashed border-line-strong pl-6">
                  {b.steps.map((s) => (
                    <li key={s.title} className="relative">
                      <span className="absolute -left-[1.98rem] top-1.5 h-3 w-3 rotate-45 border-2 border-survey bg-bg" aria-hidden />
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-survey-ink">{s.label}</p>
                      <h3 className="mt-0.5 text-lg font-bold">{s.title}</h3>
                      <p className="mt-1 max-w-[64ch] text-ink-2">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "architecture":
            return (
              <section key={i} aria-labelledby={id}>
                <H id={id}>{b.title}</H>
                {b.intro && <p className="mt-3 max-w-[66ch] text-ink-2">{b.intro}</p>}
                <ol className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {b.parts.map((a, k) => (
                    <li key={a.label} className="rounded-xl border border-line bg-surface p-4">
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-survey-ink">{String(k + 1).padStart(2, "0")} · {a.label}</p>
                      <p className="mt-1">{a.detail}</p>
                    </li>
                  ))}
                </ol>
                {b.caption && <p className="mt-3 font-mono text-xs text-ink-3">{b.caption}</p>}
              </section>
            );
          case "compare":
            return (
              <section key={i} aria-labelledby={id}>
                <H id={id}>{b.title}</H>
                {b.intro && <p className="mt-3 max-w-[70ch] text-ink-2">{b.intro}</p>}
                <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                  {[b.before, b.after].map((img, k) => (
                    <figure key={img.src} className={`overflow-hidden rounded-2xl border bg-surface ${k === 1 ? "border-ink/70" : "border-line"}`}>
                      <a href={img.src} target="_blank" rel="noopener" className="relative block aspect-[3/2] bg-surface-2" aria-label={`Open full image: ${img.label}`}>
                        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
                      </a>
                      <figcaption className="flex items-center gap-2 px-4 py-3 text-sm">
                        <span className={`font-mono text-[0.68rem] uppercase tracking-[0.12em] ${k === 1 ? "text-survey-ink" : "text-ink-3"}`}>{k === 0 ? "Before" : "After"}</span>
                        <span>{img.label}</span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            );
          case "status":
            return (
              <section key={i} aria-labelledby={id}>
                <H id={id}>{b.title}</H>
                <ul className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface">
                  {b.rows.map((r) => {
                    const s = stateStyle[r.state];
                    return (
                      <li key={r.text} className="grid grid-cols-[minmax(0,1fr)] gap-2 px-4 py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:items-baseline">
                        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.cls}`}><span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />{s.label}</span>
                        <span>{r.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          case "gallery":
            return (
              <section key={i} aria-labelledby={id}>
                <H id={id}>{b.title}</H>
                <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {b.images.map((g) => (
                    <figure key={g.src} className="overflow-hidden rounded-2xl border border-line bg-surface">
                      <a href={g.src} target="_blank" rel="noopener" className="relative block aspect-[4/3] bg-surface-2" aria-label={`Open full image: ${g.caption ?? g.alt}`}>
                        <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw" className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]" />
                      </a>
                      {g.caption && <figcaption className="px-4 py-2.5 text-sm text-ink-2">{g.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              </section>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-[3px] border-survey pl-6">
                <p className="max-w-[40ch] font-display text-2xl font-medium leading-snug sm:text-[1.7rem]">“{b.quote}”</p>
                <footer className="mt-3 font-mono text-xs text-ink-3">{b.cite}</footer>
              </blockquote>
            );
          case "lesson":
            return (
              <section key={i} aria-labelledby={id} className="rounded-2xl border border-ink/70 bg-surface p-6 sm:p-8">
                <p className="station">Field note</p>
                <h2 id={id} className="mt-2 text-2xl font-bold">{b.title}</h2>
                <p className="mt-3 max-w-[66ch] text-[1.08rem] leading-relaxed">{b.body}</p>
                {b.differently && <p className="mt-4 max-w-[66ch] text-ink-2"><span className="font-semibold text-ink">What I’d do differently: </span>{b.differently}</p>}
              </section>
            );
        }
      })}
    </div>
  );
}
