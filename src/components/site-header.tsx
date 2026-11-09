"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { nav, profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette } from "./command-palette";
import { Logo } from "./logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-bg/95 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-lg py-1 font-display text-[1.05rem] font-bold">
            <Logo className="h-7 w-7 text-ink" />
            <span>{profile.name}</span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 text-[0.95rem]">
              {nav.map((n) => {
                const active = isActive(n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-md px-3 py-2 transition-colors ${active ? "font-semibold text-ink" : "text-ink-2 hover:text-ink"}`}
                    >
                      {n.label}
                      {active && <span className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-coral" aria-hidden />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              className="hidden h-9 items-center gap-1.5 rounded-full px-2.5 text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink lg:flex"
              aria-label="Quick search (Command K)"
            >
              <Search className="h-4 w-4" aria-hidden /><kbd className="font-mono text-[0.7rem]">⌘K</kbd>
            </button>
            <ThemeToggle />
            <a href={profile.links.resume} target="_blank" rel="noopener" className="hidden rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-bg transition-colors hover:bg-teal-strong sm:block">
              Resume
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-surface-2 md:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="site-menu" aria-label="Main" className="border-t border-line bg-bg px-4 pb-6 pt-2 md:hidden">
            <ul className="divide-y divide-line">
              {[{ href: "/", label: "Home" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(n.href) || (n.href === "/" && pathname === "/") ? "page" : undefined}
                    className="block py-3.5 font-display text-2xl font-bold aria-[current=page]:text-teal"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={profile.links.resume} target="_blank" rel="noopener" className="mt-4 block rounded-full bg-ink py-3 text-center font-semibold text-bg">
              Resume (PDF)
            </a>
          </nav>
        )}
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
