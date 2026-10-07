import Image from "next/image";
import { ArrowUpRight, Box, Camera, Code2, FileText, Film, Globe, Image as ImageIcon, Megaphone, PenTool, ScrollText } from "lucide-react";
import type { Artifact, ArtifactKind } from "@/content/types";

const icons: Partial<Record<ArtifactKind, typeof Camera>> = {
  photo: Camera, diagram: PenTool, drawing: PenTool, screenshot: ImageIcon, cad: Box, fea: Box, code: Code2, demo: Globe,
  video: Film, presentation: FileText, report: FileText, certificate: ScrollText, publication: ScrollText, article: Megaphone, post: Megaphone,
};

/** "Show the receipts": an expandable drawer of artifacts. Pure HTML <details>, no JS. */
export function Evidence({ items, title = "Evidence" }: { items: Artifact[]; title?: string }) {
  if (!items.length) return null;
  return (
    <details className="group rounded-2xl border border-line bg-surface open:border-line-strong">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-surface-2 font-mono text-xs">{items.length}</span>
          <span><span className="font-semibold">{title}</span><span className="ml-2 font-mono text-xs text-ink-3">photos, links, documents</span></span>
        </span>
        <span className="font-mono text-xs text-ink-3 group-open:hidden">Open drawer ↓</span>
        <span className="hidden font-mono text-xs text-ink-3 group-open:inline">Close ↑</span>
      </summary>
      <ul className="grid gap-3 border-t border-line p-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => {
          const Icon = icons[a.kind] ?? FileText;
          const body = (
            <>
              {a.src ? (
                <span className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-surface-2">
                  <Image src={a.src} alt="" fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover object-top" />
                </span>
              ) : null}
              <span className="mt-2 flex items-start gap-2">
                <Icon className="mt-0.5 h-4 w-4 flex-none text-survey" aria-hidden />
                <span className="min-w-0">
                  <span className="block font-semibold leading-snug">{a.label}</span>
                  <span className="block font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-3">{a.kind}{a.note ? ` · ${a.note}` : ""}</span>
                </span>
                {a.href && <ArrowUpRight className="ml-auto h-4 w-4 flex-none text-ink-3" aria-hidden />}
              </span>
            </>
          );
          return (
            <li key={a.label}>
              {a.href ? (
                <a href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="block rounded-xl p-2 transition-colors hover:bg-surface-2">{body}</a>
              ) : (
                <div className="rounded-xl p-2">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </details>
  );
}
