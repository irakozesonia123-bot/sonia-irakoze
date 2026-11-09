"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import type { Place } from "@/content/about";

/**
 * Two simple panels (East Africa, United States), each a plain longitude/latitude grid with pins.
 * The list of place buttons is the accessible control; the pins mirror it for pointer users.
 */
const BOUNDS = {
  "east-africa": { lon: [28.5, 38], lat: [-4.5, 0], label: "East Africa" },
  us: { lon: [-108, -72], lat: [35.5, 45.5], label: "United States" },
} as const;

function pos(p: Place) {
  const b = BOUNDS[p.region];
  const [dx, dy] = p.nudge ?? [0, 0];
  return { x: ((p.lon - b.lon[0]) / (b.lon[1] - b.lon[0])) * 100 + dx, y: ((b.lat[1] - p.lat) / (b.lat[1] - b.lat[0])) * 100 + dy };
}

export function PlacesMap({ places, figs }: { places: Place[]; figs: Record<string, ReactNode> }) {
  const [sel, setSel] = useState(places[0].id);
  const cur = places.find((p) => p.id === sel)!;
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      <div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2" aria-hidden>
          {(["east-africa", "us"] as const).map((r) => (
            <div key={r} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface ring-1 ring-line [background-image:radial-gradient(var(--line-strong)_1px,transparent_1.2px)] [background-size:16px_16px]">
              <span className="label absolute left-3 top-3">{BOUNDS[r].label}</span>
              {places.filter((p) => p.region === r).map((p) => {
                const { x, y } = pos(p);
                const on = p.id === sel;
                return (
                  <button
                    key={p.id}
                    type="button"
                    tabIndex={-1}
                    onClick={() => setSel(p.id)}
                    className="absolute -translate-x-1/2 -translate-y-full"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <MapPin className={`h-7 w-7 drop-shadow transition-transform ${on ? "scale-125 fill-berry text-surface" : "fill-rose-soft text-rose-ink hover:scale-110"}`} strokeWidth={1.6} />
                    <span className={`absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-0.5 text-[0.72rem] font-semibold ${on ? "bg-berry text-bg" : "bg-surface/90 text-ink-2"}`}>{p.name.split(",")[0]}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Places">
          {places.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                aria-pressed={p.id === sel}
                onClick={() => setSel(p.id)}
                className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm font-semibold transition-colors hover:border-ink aria-pressed:border-berry aria-pressed:bg-berry aria-pressed:text-bg"
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-3">Panels are simplified and not to the same scale.</p>
      </div>
      <div aria-live="polite" className="rounded-2xl bg-surface p-5 ring-1 ring-line">
        {figs[cur.id] && <div key={cur.id} className="pop">{figs[cur.id]}</div>}
        <p className="label mt-4">{cur.when}</p>
        <h3 className="mt-1 text-2xl font-semibold">{cur.name}</h3>
        <p className="mt-2 text-ink-2">{cur.text}</p>
        {cur.link && (
          <Link href={cur.link.href} className="group mt-4 inline-flex items-center gap-1.5 font-semibold text-berry">
            {cur.link.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
