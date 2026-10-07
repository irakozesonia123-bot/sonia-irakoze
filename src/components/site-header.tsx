"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Command, Menu, X } from "lucide-react";
import { nav, profile } from "@/content/portfolio";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./command-palette";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!onHome) return;
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-line bg-surface/80 px-3 py-2 shadow-[0_8px_30px_-18px_rgba(15,36,39,0.45)] backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 font-display text-[1.02rem] font-bold">
            <Logo className="h-7 w-7" />
            <span className="sr-only sm:not-sr-only">{profile.name}</span>
          </Link>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 text-[0.9rem]">
              {nav.map((n) => {
                const isActive = onHome && active === n.id;
                return (
                  <li key={n.id} className="relative">
                    <a
                      href={href(n.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative z-10 block rounded-lg px-2.5 py-1.5 transition-colors ${isActive ? "text-ink" : "text-ink-2 hover:text-ink"}`}
                    >
                      {n.label}
                    </a>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-lg bg-surface-2"
                        aria-hidden
                      >
                        <span className="absolute -bottom-[3px] left-1/2 h-[3px] w-3 -translate-x-1/2 rounded-full bg-survey" />
                      </motion.span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 font-mono text-xs text-ink-2 transition-colors hover:border-line-strong hover:text-ink sm:flex"
              aria-label="Open quick navigation"
            >
              <Command className="h-3.5 w-3.5" aria-hidden /> K
            </button>
            <ThemeToggle />
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener"
              className="hidden rounded-lg bg-ink px-3 py-1.5 text-sm font-semibold text-bg transition-colors hover:bg-lake sm:block"
            >
              Resume
            </a>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-nav" className="fixed inset-0 z-40 bg-bg/95 px-4 pb-8 pt-24 backdrop-blur-sm lg:hidden">
          <nav aria-label="Sections">
            <ol className="mx-auto max-w-md divide-y divide-line border-y border-line">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={href(n.id)} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-3.5">
                    <span className="font-display text-2xl font-bold">{n.label}</span>
                    <span className="station">STA {n.station}+00</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mx-auto mt-6 flex max-w-md gap-3">
              <a href={profile.links.resume} target="_blank" rel="noopener" className="flex-1 rounded-xl bg-ink py-3 text-center font-semibold text-bg">Resume</a>
              <button type="button" onClick={() => { setOpen(false); setPaletteOpen(true); }} className="flex-1 rounded-xl border border-line py-3 font-semibold">Quick jump</button>
            </div>
          </nav>
        </div>
      )}

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
