"use client";

import { useState, type ReactNode } from "react";

export type TourStep = { key: string; label: string; body: string; node: ReactNode };

/** Step through real screenshots of a prototype. Tabs, so keyboard users can move with the arrow keys. */
export function ScreenTour({ steps, title }: { steps: TourStep[]; title: string }) {
  const [i, setI] = useState(0);
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : -1) + steps.length) % steps.length;
    setI(n);
    document.getElementById(`tour-tab-${steps[n].key}`)?.focus();
  };
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)]">
      <div role="tablist" aria-label={title} onKeyDown={onKey} className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {steps.map((s, k) => (
          <button
            key={s.key}
            id={`tour-tab-${s.key}`}
            role="tab"
            type="button"
            aria-selected={k === i}
            aria-controls={`tour-panel-${s.key}`}
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            className={`flex-none rounded-xl border px-4 py-3 text-left transition-colors lg:flex-auto ${k === i ? "border-berry bg-surface" : "border-line hover:border-line-strong"}`}
          >
            <span className="label">Step {k + 1}</span>
            <span className="block font-semibold">{s.label}</span>
            <span className={`mt-1 hidden text-[0.95rem] text-ink-2 lg:block ${k === i ? "" : "lg:hidden"}`}>{s.body}</span>
          </button>
        ))}
      </div>
      {steps.map((s, k) => (
        <div key={s.key} id={`tour-panel-${s.key}`} role="tabpanel" aria-labelledby={`tour-tab-${s.key}`} hidden={k !== i}>
          <p className="mb-3 text-[0.98rem] text-ink-2 lg:hidden">{s.body}</p>
          {s.node}
        </div>
      ))}
    </div>
  );
}
