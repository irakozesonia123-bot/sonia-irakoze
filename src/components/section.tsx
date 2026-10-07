import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/** In-page section with a survey-station label. */
export function Section({ id, station, kicker, title, intro, children, action, className = "" }: {
  id?: string; station: string; kicker: string; title: string; intro?: string; children: ReactNode; action?: { href: string; label: string }; className?: string;
}) {
  const hid = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={hid} className={`scroll-mt-24 border-t border-line ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <header className="mb-9 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-end">
          <div>
            <p className="station flex items-center gap-3"><span className="inline-block h-px w-8 bg-survey" aria-hidden />STA {station} · {kicker}</p>
            <h2 id={hid} className="mt-3 text-3xl font-extrabold sm:text-[2.6rem] sm:leading-[1.05]">{title}</h2>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            {intro && <p className="max-w-xl text-ink-2 md:text-right">{intro}</p>}
            {action && <ArrowLink href={action.href}>{action.label}</ArrowLink>}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}

/** Top of every inner page: a drawing-sheet title block. */
export function PageHeader({ sheet, kicker, title, intro, meta }: { sheet: string; kicker: string; title: string; intro: string; meta?: { label: string; value: string }[] }) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="drafting-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-12 pt-12 sm:px-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:items-end md:pt-16">
        <div>
          <p className="station">Sheet {sheet} · {kicker}</p>
          <h1 className="mt-4 text-[clamp(2.5rem,7vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">{title}</h1>
          <p className="mt-5 max-w-[60ch] text-[1.08rem] text-ink-2">{intro}</p>
        </div>
        {meta && (
          <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-ink/70 bg-surface text-sm">
            {meta.map((m, i) => (
              <div key={m.label} className={`border-line px-4 py-2.5 ${i % 2 === 0 ? "border-r" : ""} ${i < meta.length - 2 ? "border-b" : ""}`}>
                <dt className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink-3">{m.label}</dt>
                <dd className="mt-0.5 font-mono text-[0.85rem]">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-[0.72rem] text-ink-2">{children}</span>;
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith("http");
  const cls = `group inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-line-strong underline-offset-[5px] transition-colors hover:decoration-survey ${className}`;
  const inner = <>{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></>;
  return external ? <a href={href} target="_blank" rel="noopener" className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}
