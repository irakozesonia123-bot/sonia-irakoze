"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import type { Place } from "@/content/types";

/**
 * Schematic survey sheet: two insets (East Africa, North America) joined by an
 * Atlantic leg. Positions are drawn, not projected, so close places stay legible.
 * Real coordinates are shown for each stop.
 */
const POS: Record<string, { x: number; y: number; label: "l" | "r" }> = {
  kigali: { x: 15, y: 36, label: "r" },
  gashora: { x: 20, y: 56, label: "r" },
  arusha: { x: 31, y: 72, label: "l" },
  denver: { x: 49, y: 52, label: "r" },
  chicago: { x: 69, y: 38, label: "l" },
  rochester: { x: 82, y: 27, label: "l" },
  albany: { x: 92, y: 20, label: "l" },
  baltimore: { x: 89, y: 52, label: "l" },
  blacksburg: { x: 81, y: 66, label: "l" },
};

const noop = () => () => {};
const fmt = (lat: number, lon: number) => `${Math.abs(lat).toFixed(4)}° ${lat < 0 ? "S" : "N"}, ${Math.abs(lon).toFixed(4)}° ${lon < 0 ? "W" : "E"}`;

export function JourneyMap({ places }: { places: Place[] }) {
  const urlPlace = useSyncExternalStore(noop, () => new URLSearchParams(window.location.search).get("place"), () => null);
  const [picked, setPicked] = useState<string | null>(null);
  const sel = picked ?? (urlPlace && places.some((x) => x.id === urlPlace) ? urlPlace : "gashora");

  const choose = (id: string) => {
    setPicked(id);
    const url = new URL(window.location.href);
    url.searchParams.set("place", id);
    window.history.replaceState(null, "", url);
  };

  const current = places.find((p) => p.id === sel) ?? places[0];
  const hub = POS.rochester;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="relative self-start overflow-hidden rounded-2xl border border-ink/70 bg-surface">
        <div className="relative aspect-[10/7] sm:aspect-[10/6]">
          <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M40 0H0V40" fill="none" stroke="var(--contour)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="1000" height="600" fill="url(#mapgrid)" />
            {/* inset frames */}
            <rect x="30" y="70" width="345" height="470" rx="10" fill="none" stroke="var(--line-strong)" strokeDasharray="6 6" />
            <rect x="415" y="70" width="560" height="470" rx="10" fill="none" stroke="var(--line-strong)" strokeDasharray="6 6" />
            {/* contours, East Africa (lakes) */}
            {[1, 2, 3, 4, 5].map((k) => <ellipse key={`e${k}`} cx="200" cy="360" rx={k * 28} ry={k * 20} fill="none" stroke="var(--lake)" opacity={0.28 - k * 0.04} />)}
            {[1, 2, 3, 4, 5, 6].map((k) => <ellipse key={`n${k}`} cx="740" cy="280" rx={k * 42} ry={k * 26} fill="none" stroke="var(--lake)" opacity={0.22 - k * 0.03} />)}
            {/* East Africa legs */}
            <polyline points={`${POS.kigali.x * 10},${POS.kigali.y * 6} ${POS.gashora.x * 10},${POS.gashora.y * 6} ${POS.arusha.x * 10},${POS.arusha.y * 6}`} fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeDasharray="4 5" />
            {/* Rochester as base: spokes */}
            {["denver", "chicago", "albany", "baltimore", "blacksburg"].map((id) => (
              <line key={id} x1={hub.x * 10} y1={hub.y * 6} x2={POS[id].x * 10} y2={POS[id].y * 6} stroke="var(--ink-3)" strokeWidth="1.2" strokeDasharray="4 5" opacity="0.7" />
            ))}
            {/* Atlantic leg */}
            <path d={`M ${POS.kigali.x * 10} ${POS.kigali.y * 6} C 420 40, 640 40, ${hub.x * 10} ${hub.y * 6}`} fill="none" stroke="var(--survey)" strokeWidth="2" strokeDasharray="10 7" opacity="0.8" />
          </svg>
          <p className="absolute left-[4%] top-[5%] font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-3 sm:text-[0.68rem]">East Africa</p>
          <p className="absolute left-[43%] top-[5%] font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink-3 sm:text-[0.68rem]">United States</p>
          <p className="absolute left-[44%] top-[13%] hidden font-mono text-[0.62rem] text-survey-ink sm:block">Kigali → Rochester ≈ 11,600 km</p>
          {places.map((p) => {
            const pos = POS[p.id];
            if (!pos) return null;
            const on = p.id === sel;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => choose(p.id)}
                aria-pressed={on}
                aria-label={`${p.name}, ${p.years}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 p-2.5"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <span className={`block h-3.5 w-3.5 rotate-45 border-2 transition-transform ${on ? "scale-125 border-survey bg-survey" : "border-ink bg-bg group-hover:border-survey"}`} />
                <span className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-bg/85 px-1.5 py-0.5 font-mono text-[0.66rem] sm:block ${pos.label === "r" ? "left-8" : "right-8"} ${on ? "font-semibold text-ink" : "text-ink-2"}`}>
                  {p.name.split(" · ")[0]}
                </span>
              </button>
            );
          })}
          <p className="absolute bottom-[3%] right-[3%] font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-3">Schematic · not to scale</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <article aria-live="polite" className="rounded-2xl border border-line bg-surface p-6">
          <p className="station">{current.years}</p>
          <h3 className="mt-2 text-2xl font-extrabold">{current.name}</h3>
          <p className="font-mono text-xs text-ink-3">{fmt(current.lat, current.lon)}</p>
          <p className="mt-4 font-display text-lg font-medium leading-snug">{current.headline}</p>
          <p className="mt-2 text-ink-2">{current.story}</p>
          {current.links && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {current.links.map((l) => (
                <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 text-sm font-semibold underline decoration-line-strong underline-offset-4 hover:decoration-survey">
                  {l.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ))}
            </div>
          )}
        </article>
        <div>
          <p className="station !text-ink-3">All stops</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {places.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => choose(p.id)} aria-pressed={p.id === sel}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${p.id === sel ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink"}`}>
                  {p.name.split(" · ")[0]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
