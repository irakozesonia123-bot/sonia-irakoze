"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type StackCard = { key: string; title: string; note: string; node: ReactNode };

/** A small pile of artworks. The top card is in focus; Previous / Next (or arrow keys) shuffle the pile. */
export function ArtStack({ cards }: { cards: StackCard[] }) {
  const [i, setI] = useState(0);
  const n = cards.length;
  if (n === 0) return null;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const cur = cards[i];
  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Art and design"
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}
    >
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
        {cards.map((c, k) => {
          const depth = (k - i + n) % n;
          const rot = [0, 5, -6, 3][depth] ?? 0;
          return (
            <div
              key={c.key}
              className="stack-card absolute inset-0 rounded-2xl bg-surface p-3 shadow-[0_18px_40px_-24px_rgb(60_20_50/0.45)] ring-1 ring-line"
              style={{ transform: `rotate(${rot}deg) translateY(${depth * 6}px)`, zIndex: n - depth, opacity: depth > 2 ? 0 : 1 }}
              aria-hidden={depth !== 0}
              inert={depth !== 0}
            >
              {c.node}
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex items-start justify-between gap-4">
        <div aria-live="polite" className="min-w-0">
          <p className="font-display text-xl font-semibold">{cur.title}</p>
          <p className="mt-1 text-[0.96rem] text-ink-2">{cur.note}</p>
        </div>
        {n > 1 && (
          <div className="flex flex-none items-center gap-2">
            <button type="button" onClick={() => go(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface hover:border-ink" aria-label="Previous artwork"><ChevronLeft className="h-4 w-4" aria-hidden /></button>
            <span className="label">{i + 1} / {n}</span>
            <button type="button" onClick={() => go(1)} className="grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface hover:border-ink" aria-label="Next artwork"><ChevronRight className="h-4 w-4" aria-hidden /></button>
          </div>
        )}
      </div>
    </div>
  );
}
