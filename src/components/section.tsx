import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

/** A page section with a plain title. The dimension line is the only drafting detail. */
export function Section({ id, title, intro, children, action, className = "", tone = "plain" }: {
  id?: string; title: string; intro?: string; children: ReactNode; action?: { href: string; label: string }; className?: string; tone?: "plain" | "warm";
}) {
  const hid = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={hid} className={`scroll-mt-20 ${tone === "warm" ? "bg-surface-2/70" : ""} ${className}`}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-2xl">
            <span className="dim" aria-hidden />
            <h2 id={hid} className="mt-3 text-[2rem] font-extrabold leading-[1.05] sm:text-[2.6rem]">{title}</h2>
            {intro && <p className="mt-3 text-[1.06rem] text-ink-2">{intro}</p>}
          </div>
          {action && <ArrowLink href={action.href}>{action.label}</ArrowLink>}
        </header>
        {children}
      </div>
    </section>
  );
}

export function PageHeader({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
        <span className="dim" aria-hidden />
        <h1 className="mt-4 text-[clamp(2.6rem,7vw,4.4rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">{title}</h1>
        <p className="mt-5 max-w-[60ch] text-[1.1rem] text-ink-2">{intro}</p>
        {children}
      </div>
    </header>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[0.72rem] text-ink-2">{children}</span>;
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith("http");
  const cls = `group inline-flex items-center gap-1.5 font-semibold text-ink ulink ${className}`;
  const inner = <>{children}<ArrowRight className="h-4 w-4 flex-none transition-transform group-hover:translate-x-0.5" aria-hidden /></>;
  return external ? <a href={href} target="_blank" rel="noopener" className={cls}>{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
}
