"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Command, Menu, X } from "lucide-react";
import { nav, profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./command-palette";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const reduce = useReducedMotion();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-line bg-surface/85 px-3 py-2 shadow-[0_8px_30px_-18px_rgba(15,36,39,0.45)] backdrop-blur-md">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 font-display text-[1.02rem] font-bold">
            <Logo className="h-7 w-7" />
            <span className="sr-only sm:not-sr-only">{profile.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5 text-[0.88rem]">
              {nav.map((n) => {
                const active = isActive(n.href);
                return (
                  <li key={n.href} className="relative">
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative z-10 block rounded-lg px-2.5 py-1.5 transition-colors ${active ? "text-ink" : "text-ink-2 hover:text-ink"}`}
                    >
                      {n.label}
                    </Link>
                    {active && (
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
              aria-label="Open quick search (Command K)"
            >
              <Command className="h-3.5 w-3.5" aria-hidden /> K
            </button>
            <ThemeToggle />
            <a href={profile.links.resume} target="_blank" rel="noopener" className="hidden rounded-lg bg-ink px-3 py-1.5 text-sm font-semibold text-bg transition-colors hover:bg-lake sm:block">
              Resume
            </a>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-lg border border-line xl:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="site-menu" className="fixed inset-0 z-40 overflow-y-auto bg-bg/97 px-4 pb-10 pt-24 backdrop-blur-sm xl:hidden">
          <nav aria-label="Main" className="mx-auto max-w-lg">
            <p className="station mb-3">Sheet index</p>
            <ol className="divide-y divide-line border-y border-line">
              <li>
                <Link href="/" onClick={() => setOpen(false)} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-display text-2xl font-bold">Home</span>
                  <span className="font-mono text-xs text-ink-3">S-01</span>
                </Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setOpen(false)} aria-current={isActive(n.href) ? "page" : undefined} className="flex items-baseline justify-between gap-4 py-3">
                    <span>
                      <span className={`block font-display text-2xl font-bold ${isActive(n.href) ? "text-lake" : ""}`}>{n.label}</span>
                      <span className="block text-sm text-ink-2">{n.blurb}</span>
                    </span>
                    <span className="font-mono text-xs text-ink-3">{n.sheet}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a href={profile.links.resume} target="_blank" rel="noopener" className="rounded-xl bg-ink py-3 text-center font-semibold text-bg">Resume</a>
              <button type="button" onClick={() => { setOpen(false); setPaletteOpen(true); }} className="rounded-xl border border-line py-3 font-semibold">Quick search</button>
            </div>
          </nav>
        </div>
      )}

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
