"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, FileText, Filter, Hash, Mail, Moon, Search, Shuffle, Sparkles, X } from "lucide-react";
import { nav, profile } from "@/content/profile";
import { publicProjects } from "@/content/projects";

type Icon = "hash" | "file" | "link" | "mail" | "theme" | "filter" | "shuffle" | "spark";
type Item = { id: string; label: string; group: string; hint?: string; icon: Icon; keywords?: string; secret?: boolean; keepOpen?: boolean; run: () => void };

const icons: Record<Icon, typeof Hash> = { hash: Hash, file: FileText, link: ArrowUpRight, mail: Mail, theme: Moon, filter: Filter, shuffle: Shuffle, spark: Sparkles };

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
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
      { id: "beyond", label: "Outside work", group: "Pages", icon: "hash", keywords: "personal hobbies art painting rowing taekwondo choir faith eagle favorites", run: go("/about/beyond") },
      { id: "news", label: "News and mentions", group: "Pages", icon: "hash", keywords: "press articles profiles media coverage announcements in the news", run: go("/about#media") },
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
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setQuery(""); setIndex(0); setNote("");
      d.showModal();
      requestAnimationFrame(() => input.current?.focus());
    } else if (!open && d.open) d.close();
  }, [open]);

  // While open, size the dialog to the visible viewport so the onscreen keyboard never hides the results.
  useEffect(() => {
    const d = dialog.current;
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    if (!open || !d || !vv) return;
    const fit = () => d.style.setProperty("--vvh", `${Math.round(vv.height)}px`);
    fit();
    vv.addEventListener("resize", fit);
    return () => { vv.removeEventListener("resize", fit); d.style.removeProperty("--vvh"); };
  }, [open]);

  // One way out: close the dialog, sync React state, and return focus to whatever opened search.
  // Safe to call more than once. The native "close" event (Escape) also routes here, but the
  // close button, backdrop, and results call it directly rather than relying on that event.
  const dismiss = useCallback(
    (restoreFocus = true) => {
      const d = dialog.current;
      if (d?.open) d.close();
      onClose();
      const o = opener.current;
      opener.current = null;
      if (restoreFocus && o && o.isConnected) requestAnimationFrame(() => o.focus());
    },
    [onClose],
  );

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const handle = () => dismiss();
    const cancel = (e: Event) => { e.preventDefault(); dismiss(); };
    d.addEventListener("close", handle);
    d.addEventListener("cancel", cancel);
    return () => { d.removeEventListener("close", handle); d.removeEventListener("cancel", cancel); };
  }, [dismiss]);

  const activate = (item?: Item) => {
    if (!item) return;
    item.run();
    if (!item.keepOpen) dismiss(false);
  };

  // Escape is handled here so closing never depends on the browser's close event, which Chrome
  // does not always fire after repeated Escape presses. Tab stays inside the dialog: the search
  // field and the close button are its only tab stops.
  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); dismiss(); return; }
    if (e.key !== "Tab") return;
    const stops = [input.current, closeBtn.current].filter((x): x is HTMLInputElement | HTMLButtonElement => !!x);
    const at = stops.indexOf(document.activeElement as HTMLInputElement | HTMLButtonElement);
    e.preventDefault();
    stops[(at + (e.shiftKey ? stops.length - 1 : 1)) % stops.length]?.focus();
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
      onClick={(e) => e.target === dialog.current && dismiss()}
      aria-label="Search"
      onKeyDown={onDialogKeyDown}
      className="cmdk m-auto mt-3 w-[min(580px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-2xl open:flex backdrop:bg-black/50 backdrop:backdrop-blur-[2px] sm:mt-[10vh]"
    >
      <div className="flex items-center gap-2 border-b border-line p-3">
        <div className="cmdk-field flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-xl bg-surface-2/60 px-3.5 ring-1 ring-line">
          <Search className="h-4 w-4 flex-none text-ink-3" aria-hidden />
          <label htmlFor="cmdk-input" className="sr-only">Search pages, projects, and actions</label>
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
          className="cmdk-input h-full min-w-0 flex-1 bg-transparent text-base placeholder:text-ink-3"
          />
        </div>
        <button
          ref={closeBtn}
          type="button"
          onClick={() => dismiss()}
          aria-label="Close search"
          className="grid h-12 w-12 flex-none place-items-center rounded-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
      {note && <p className="border-b border-line bg-surface-2 px-4 py-3 text-[0.95rem]" role="status">{note}</p>}
      <ul id="cmdk-list" role="listbox" aria-label="Results" className="cmdk-list min-h-0 overflow-y-auto overscroll-contain p-2">
        {filtered.length === 0 && <li role="presentation" className="px-3 py-6 text-center text-ink-2">No matches. Try another word.</li>}
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
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${i === index ? "bg-rose-soft text-ink shadow-[inset_3px_0_0_0_var(--berry)]" : ""}`}
              >
                <I className={`h-4 w-4 ${i === index ? "text-rose-ink" : "text-ink-3"}`} aria-hidden />
                <span className="flex-1">{item.label}</span>
                {item.hint && <span className="font-mono text-xs text-ink-2">{item.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="hidden border-t border-line px-4 py-2 font-mono text-[0.7rem] text-ink-3 sm:block">↑ ↓ to move · enter to open · esc to close</p>
    </dialog>
  );
}
