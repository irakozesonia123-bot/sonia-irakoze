import type { ReactNode } from "react";
import { nav } from "@/content/portfolio";

export function Section({ id, title, kicker, children, intro }: { id: string; title: string; kicker?: string; intro?: string; children: ReactNode }) {
  const station = nav.find((n) => n.id === id)?.station ?? "00";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <header className="mb-10 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-end">
          <div>
            <p className="station flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-survey" aria-hidden />
              STA {station}+00{kicker ? ` · ${kicker}` : ""}
            </p>
            <h2 id={`${id}-title`} className="mt-3 text-4xl font-extrabold sm:text-5xl">{title}</h2>
          </div>
          {intro && <p className="max-w-xl text-ink-2 md:justify-self-end">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[0.72rem] text-ink-2">{children}</span>;
}
