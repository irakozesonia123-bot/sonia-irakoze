"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, FileText, Hash, Mail, Moon, Search } from "lucide-react";
import { nav, profile, projects } from "@/content/portfolio";

type Item = { id: string; label: string; group: string; hint?: string; icon: "hash" | "file" | "link" | "mail" | "theme"; run: () => void };

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
    return [
      ...nav.map((n) => ({ id: `s-${n.id}`, label: n.label, group: "Sections", hint: `STA ${n.station}+00`, icon: "hash" as const, run: go(`/#${n.id}`) })),
      ...projects.map((p) => ({ id: `p-${p.slug}`, label: p.title, group: "Projects", hint: p.year, icon: "file" as const, run: go(`/projects/${p.slug}`) })),
      { id: "a-email", label: "Copy email address", group: "Actions", hint: profile.email, icon: "mail", run: () => { navigator.clipboard?.writeText(profile.email).then(() => setNote("Email copied"), () => setNote(profile.email)); } },
      { id: "a-resume", label: "Open resume (PDF)", group: "Actions", icon: "file", run: ext(profile.links.resume) },
      { id: "a-linkedin", label: "LinkedIn", group: "Actions", icon: "link", run: ext(profile.links.linkedin) },
      { id: "a-github", label: "GitHub", group: "Actions", icon: "link", run: ext(profile.links.github) },
      {
        id: "a-theme", label: "Toggle light / dark theme", group: "Actions", icon: "theme",
        run: () => {
          const r = document.documentElement; const t = r.getAttribute("data-theme") === "dark" ? "light" : "dark";
          r.setAttribute("data-theme", t); try { localStorage.setItem("theme", t); } catch {}
        },
      },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q)) : items;
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

  const activate = (item?: Item) => {
    if (!item) return;
    item.run();
    if (item.id !== "a-email") onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); activate(filtered[index]); }
  };

  const Icon = ({ k }: { k: Item["icon"] }) => {
    const c = "h-4 w-4 text-ink-3";
    if (k === "hash") return <Hash className={c} aria-hidden />;
    if (k === "file") return <FileText className={c} aria-hidden />;
    if (k === "mail") return <Mail className={c} aria-hidden />;
    if (k === "theme") return <Moon className={c} aria-hidden />;
    return <ArrowUpRight className={c} aria-hidden />;
  };

  let lastGroup = "";
  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-label="Quick navigation"
      className="m-auto mt-[12vh] w-[min(560px,calc(100vw-24px))] rounded-2xl border border-line-strong bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4">
        <Search className="h-4 w-4 text-ink-3" aria-hidden />
        <label htmlFor="cmdk-input" className="sr-only">Search sections, projects, and actions</label>
        <input
          id="cmdk-input"
          ref={input}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
          onKeyDown={onKeyDown}
          placeholder="Jump to a section, project, or action…"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={filtered[index] ? `cmdk-${filtered[index].id}` : undefined}
          className="h-14 w-full bg-transparent text-base outline-none placeholder:text-ink-3 focus-visible:outline-none"
        />
        <kbd className="rounded border border-line px-1.5 font-mono text-[0.7rem] text-ink-3">esc</kbd>
      </div>
      <ul id="cmdk-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
        {filtered.length === 0 && <li className="px-3 py-6 text-center text-ink-3">No matches</li>}
        {filtered.map((item, i) => {
          const header = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          return (
            <li key={item.id} role="presentation">
              {header && <p className="station px-3 pb-1 pt-3 !text-ink-3">{header}</p>}
              <div
                id={`cmdk-${item.id}`}
                role="option"
                aria-selected={i === index}
                onMouseMove={() => setIndex(i)}
                onClick={() => activate(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${i === index ? "bg-surface-2" : ""}`}
              >
                <Icon k={item.icon} />
                <span className="flex-1">{item.label}</span>
                {item.hint && <span className="font-mono text-xs text-ink-3">{item.hint}</span>}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-line px-4 py-2 font-mono text-[0.7rem] text-ink-3" aria-live="polite">
        {note || "↑ ↓ to move · enter to open"}
      </p>
    </dialog>
  );
}
