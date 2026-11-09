import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Camera } from "lucide-react";
import type { Figure } from "@/content/types";
import { ZoomImage } from "./zoom-image";

/**
 * Photo slots are visible on local dev and Vercel preview builds so Sonia can see where
 * evidence belongs. Production never shows an empty slot.
 * Force them on anywhere with NEXT_PUBLIC_SHOW_SLOTS=1.
 */
export const showSlots =
  process.env.NEXT_PUBLIC_SHOW_SLOTS === "1" ||
  (process.env.VERCEL_ENV ? process.env.VERCEL_ENV !== "production" : process.env.NODE_ENV !== "production");

const cache = new Map<string, boolean>();
export function hasFile(src: string) {
  if (!src.startsWith("/")) return true;
  if (!cache.has(src)) cache.set(src, existsSync(path.join(process.cwd(), "public", src)));
  return cache.get(src)!;
}

/** True when the figure will render something: a real file, or a slot on preview builds. */
export const willRender = (fig?: Figure) => Boolean(fig && (hasFile(fig.src) || showSlots));

export function Slot({ fig, aspect = "aspect-[4/3]", compact = false }: { fig: Figure; aspect?: string; compact?: boolean }) {
  return (
    <div className={`${aspect} flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-rose/60 bg-rose-soft/50 p-4 text-center`}>
      <Camera className="h-5 w-5 text-rose-ink" aria-hidden />
      <p className="label !text-rose-ink">Photo slot{fig.tag ? ` · ${fig.tag}` : ""}</p>
      {!compact && fig.want && <p className="max-w-[34ch] text-sm leading-snug text-ink">{fig.want}</p>}
      <p className="max-w-full break-all font-mono text-[0.68rem] text-ink-2">public{fig.src}</p>
    </div>
  );
}

export function Fig({
  fig,
  sizes,
  aspect = "aspect-[4/3]",
  zoom = true,
  priority = false,
  showCaption = true,
  className = "",
}: {
  fig?: Figure;
  sizes: string;
  aspect?: string;
  zoom?: boolean;
  priority?: boolean;
  showCaption?: boolean;
  className?: string;
}) {
  if (!fig) return null;
  const exists = hasFile(fig.src);
  if (!exists && !showSlots) return null;
  const fit = fig.fit === "contain" ? "object-contain" : "object-cover";
  const caption = showCaption && (fig.caption || fig.tag) ? (
    <figcaption className="mt-2.5 flex flex-wrap items-baseline gap-x-2 text-sm leading-snug text-ink-2">
      {fig.tag && <span className="label !text-berry">{fig.tag}</span>}
      {fig.caption && <span>{fig.caption}</span>}
    </figcaption>
  ) : null;

  return (
    <figure className={className}>
      {!exists ? (
        <Slot fig={fig} aspect={aspect} />
      ) : zoom ? (
        <ZoomImage src={fig.src} alt={fig.alt} sizes={sizes} aspect={aspect} fit={fit} pos={fig.pos} priority={priority} contain={fig.fit === "contain"} />
      ) : (
        <div className={`relative ${aspect} overflow-hidden rounded-xl ${fig.fit === "contain" ? "bg-surface-2" : ""}`}>
          <Image src={fig.src} alt={fig.alt} fill sizes={sizes} priority={priority} className={fit} style={{ objectPosition: fig.pos }} />
        </div>
      )}
      {caption}
    </figure>
  );
}
