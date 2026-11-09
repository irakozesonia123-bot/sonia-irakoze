"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, FileText, Filter, Hash, Mail, Moon, Search, Shuffle, Sparkles } from "lucide-react";
import { nav, profile } from "@/content/profile";
import { publicProjects } from "@/content/projects";

type Icon = "hash" | "file" | "link" | "mail" | "theme" | "filter" | "shuffle" | "spark";
type Item = { id: string; label: string; group: string; hint?: string; icon: Icon; keywords?: string; secret?: boolean; keepOpen?: boolean; run: () => void };

const icons: Record<Icon, typeof Hash> = { hash: Hash, file: FileText, link: ArrowUpRight, mail: Mail, theme: Moon, filter: Filter, shuffle: Shuffle, spark: Sparkles };

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [note, setNote] = useState("");

  const items = useMemo<Item[]>(() => {
    const go = (path: string) => () => router.push(path);
    const ext = (url: string) => () => window.open(url, "_blank", "noopener");
    // Full navigation so the Work page reads ?filter= on load
    const hard = (path: string) => () => window.location.assign(path);
    const show = (label: string, filter: string, kw: string): Item => ({ id: `f-${filter}`, label, group: "Show me", icon: "filter", keywords: kw, run: hard(`/work?filter=${encodeURIComponent(filter)}`) });
    const more = publicProjects.filter((p) => p.prominence === "more");
    return [
      { id: "home", label: "Home", group: "Pages", icon: "hash", run: go("/") },
      ...nav.map((n) => ({ id: `n-${n.href}`, label: n.label, group: "Pages", icon: "hash" as const, run: go(n.href) })),
      { id: "beyond", label: "Beyond the blueprint", group: "Pages", icon: "hash", keywords: "personal hobbies art painting rowing karate choir faith eagle", run: go("/about/beyond") },
      show("Engineering projects", "Engineering", "mechanical cad structures aerospace water bridge"),
      show("Software & data projects", "Software & Data", "code web react python sql"),
      show("Ventures & community projects", "Ventures & Community", "startup nonprofit saquasolve hackathon"),
      ...publicProjects.map((p) => ({ id: `w-${p.slug}`, label: p.title, group: "Projects", hint: p.dates, icon: "file" as const, keywords: `${p.area} ${p.tools.join(" ")}`, run: go(`/work/${p.slug}`) })),
      { id: "a-random", label: "Show me something unexpected", group: "Ask", icon: "shuffle", keywords: "random surprise", run: () => { const p = more[Math.floor(Math.random() * more.length)]; router.push(`/work/${p.slug}`); } },
      { id: "a-email", label: "Copy email address", group: "Contact", hint: profile.email, icon: "mail", keepOpen: true, keywords: "contact sonia", run: () => { navigator.clipboard?.writeText(profile.email).then(() => setNote("Email copied.")).catch(() => setNote(profile.email)); } },
      { id: "a-resume", label: "Open resume (PDF)", group: "Contact", icon: "file", run: ext(profile.links.resume) },
      { id: "a-linkedin", label: "LinkedIn", group: "Contact", icon: "link", run: ext(profile.links.linkedin) },
      { id: "a-github", label: "GitHub", group: "Contact", icon: "link", run: ext(profile.links.github) },
      {
        id: "a-theme", label: "Toggle light / dark theme", group: "Settings", icon: "theme", keepOpen: true, keywords: "dark light mode",
        run: () => { const r = document.documentElement; const t = r.getAttribute("data-theme") === "dark" ? "light" : "dark"; r.setAttribute("data-theme", t); try { localStorage.setItem("theme", t); } catch {} },
      },
      // Easter egg: only appears when you search for it.
      { id: "x-row", label: "Hold the stroke rate", group: "Off the clock", icon: "spark", secret: true, keepOpen: true, keywords: "row rowing stroke oar erg crew", run: () => setNote("Catch, drive, finish, recover. Steady at 24, then back to work.") },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.filter((i) => !i.secret);
    // Label matches rank above keyword-only matches
    const hits = items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase().includes(q));
    return [...hits.filter((i) => i.label.toLowerCase().includes(q)), ...hits.filter((i) => !i.label.toLowerCase().includes(q))];
  }, [items, query]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery(""); setIndex(0); setNote("");
      d.showModal();
      requestAnimationFrame(() => input.current?.focus());
    } else if (!open && d.open) d.close();
  }, [open]);

  // Keep React state in sync however the dialog closes (Escape, backdrop, or code).
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const handle = () => onClose();
    d.addEventListener("close", handle);
    return () => d.removeEventListener("close", handle);
  }, [onClose]);

  const activate = (item?: Item) => {
    if (!item) return;
    item.run();
    if (!item.keepOpen) onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); activate(filtered[index]); }
  };

  let lastGroup = "";
  return (
    <dialog
      ref={dialog}
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
      aria-label="Quick search"
      className="m-auto mt-[10vh] w-[min(580px,calc(100vw-24px))] rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4">
        <Search className="h-4 w-4 text-ink-3" aria-hidden />
        <label htmlFor="cmdk-input" className="sr-only">Search pages, projects, places, and actions</label>
        <input
          id="cmdk-input"
          ref={input}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIndex(0); setNote(""); }}
          onKeyDown={onKeyDown}
          placeholder="Search projects and pages…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={filtered[index] ? `cmdk-${filtered[index].id}` : undefined}
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-ink-3 focus-visible:outline-none"
        />
        <kbd className="rounded border border-line px-1.5 font-mono text-[0.7rem] text-ink-3">esc</kbd>
      </div>
      {note && <p className="border-b border-line bg-surface-2 px-4 py-3 text-[0.95rem]" role="status">{note}</p>}
      <ul id="cmdk-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
        {filtered.length === 0 && <li className="px-3 py-6 text-center text-ink-3">No matches. Try another word.</li>}
        {filtered.map((item, i) => {
          const header = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          const I = icons[item.icon];
          return (
            <li key={item.id} role="presentation">
              {header && <p className="label px-3 pb-1 pt-3">{header}</p>}
              <div
                id={`cmdk-${item.id}`}
                role="option"
                aria-selected={i === index}
                onMouseMove={() => setIndex(i)}
                onClick={() => activate(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${i === index ? "bg-surface-2" : ""}`}
              >
                <I className="h-4 w-4 text-ink-3" aria-hidden />
                <span className="flex-1">{item.label}</span>
                {item.hint && <span className="font-mono text-xs text-ink-3">{item.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-line px-4 py-2 font-mono text-[0.7rem] text-ink-3">↑ ↓ to move · enter to open · esc to close</p>
    </dialog>
  );
}
