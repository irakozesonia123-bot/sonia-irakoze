"use client";

import { useState } from "react";

const ORDERS = ["Rwanda", "Côte d’Ivoire", "Korea", "India"] as const;

/** A tiny nod to Bowl Voyage: take the next order. No real recipes are invented here. */
export function BowlVoyageToy() {
  const [i, setI] = useState(-1);
  const [served, setServed] = useState(0);
  const current = i >= 0 ? ORDERS[i % ORDERS.length] : null;
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-bg/60 p-4">
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 64 48" className="h-12 w-16 flex-none text-ink" aria-hidden>
          <path d="M6 22h52c0 13-11.6 22-26 22S6 35 6 22Z" fill="var(--lake-soft)" stroke="currentColor" strokeWidth="2" />
          <path d="M4 22h56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {current && [20, 32, 44].map((x, k) => (
            <path key={x} className="steam" style={{ animationDelay: `${k * 180}ms` }} d={`M${x} 16c-3-4 3-6 0-10`} fill="none" stroke="var(--survey)" strokeWidth="2" strokeLinecap="round" />
          ))}
        </svg>
        <div className="min-w-0 flex-1" aria-live="polite">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-3">Order up</p>
          <p className="font-semibold">{current ? `A dish from ${current}` : "Kitchen’s open"}</p>
          <p className="font-mono text-xs text-ink-3">{served} served</p>
        </div>
        <button type="button" onClick={() => { setI((v) => v + 1); setServed((s) => s + (i >= 0 ? 1 : 0)); }}
          className="rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-bg transition-colors hover:bg-lake">
          {current ? "Serve & next" : "Take an order"}
        </button>
      </div>
    </div>
  );
}
