"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Drag (or use the arrow keys on the slider) to wipe between two real images of the same subject.
 * Both images sit in identical boxes so the comparison lines up.
 */
export function CompareSlider({ before, after, beforeLabel, afterLabel, aspect = "aspect-[3/2]" }: {
  before: ReactNode; after: ReactNode; beforeLabel: string; afterLabel: string; aspect?: string;
}) {
  const [v, setV] = useState(50);
  const id = useId();
  return (
    <div>
      <div className={`relative ${aspect} overflow-hidden rounded-2xl bg-surface ring-1 ring-line`}>
        <div className="absolute inset-0">{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>{before}</div>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-berry" style={{ left: `${v}%` }} aria-hidden>
          <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-berry text-bg shadow-lg">⟷</span>
        </div>
        <span className="label absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 !text-ink">Before</span>
        <span className="label absolute right-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 !text-rose-ink">After</span>
      </div>
      <label htmlFor={id} className="sr-only">Compare {beforeLabel} with {afterLabel}</label>
      <input id={id} type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="mt-4 w-full accent-[var(--berry)]" />
      <div className="mt-1 flex justify-between gap-4 text-sm text-ink-2">
        <span>{beforeLabel}</span>
        <span className="text-right">{afterLabel}</span>
      </div>
    </div>
  );
}
