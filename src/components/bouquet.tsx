"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * A loose floral cluster for section corners, swaying as if a light breeze passes through.
 * Each stem rotates a few degrees around its own anchored base; leaves and flower heads follow
 * slightly later. Motion runs only while the cluster is on screen and never under reduced motion.
 */

const PETALS = [0, 72, 144, 216, 288];

function Petals() {
  return (
    <>
      {PETALS.map((r) => (
        <path key={r} d="M0 0 C -4 -3, -4 -9, 0 -11 C 4 -9, 4 -3, 0 0Z" fill="currentColor" transform={`rotate(${r})`} />
      ))}
      <circle r="2.4" fill="var(--bg)" />
    </>
  );
}

/** One swaying group. `origin` is the anchor in viewBox units, `amp` the swing to each side. */
function Sway({ origin, amp, dur, delay, children }: { origin: string; amp: number; dur: number; delay: number; children: ReactNode }) {
  const style = { "--a": `${amp}deg`, "--d": `${dur}s`, "--o": `${delay}s`, transformOrigin: origin } as CSSProperties;
  return <g className="sway" style={style}>{children}</g>;
}

export function Bouquet({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.setAttribute("data-breeze", "");
        else el.removeAttribute("data-breeze");
      },
      { rootMargin: "80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 160 160" className={className} aria-hidden focusable="false" fill="none">
      {/* Tall stem: rose head, lavender leaf, small sky-blue bloom */}
      <Sway origin="20px 150px" amp={1.7} dur={9.4} delay={-1.2}>
        <path d="M20 150 C 50 120, 70 90, 80 40" stroke="var(--line-strong)" strokeWidth="1.6" strokeLinecap="round" />
        <Sway origin="60px 104px" amp={2.6} dur={9.4} delay={-0.5}>
          <path d="M60 104 C 50 92, 54 80, 66 76 C 70 88, 68 98, 60 104Z" fill="var(--lav-ink)" opacity="0.3" />
        </Sway>
        <Sway origin="80px 48px" amp={2.2} dur={9.4} delay={-0.1}>
          <g transform="translate(80 38) scale(1.6)" color="var(--rose)"><Petals /></g>
        </Sway>
        <Sway origin="42px 106px" amp={2} dur={10.6} delay={-3.4}>
          <g transform="translate(40 96) scale(0.9)" color="var(--sky-ink)" opacity="0.7"><Petals /></g>
        </Sway>
      </Sway>
      {/* Shorter stem: lavender head and sky-blue leaf, on its own rhythm */}
      <Sway origin="44px 128px" amp={1.4} dur={7.8} delay={-4.6}>
        <path d="M44 128 C 70 120, 100 112, 130 70" stroke="var(--line-strong)" strokeWidth="1.6" strokeLinecap="round" />
        <Sway origin="96px 112px" amp={2.8} dur={7.8} delay={-3.9}>
          <path d="M96 112 C 104 100, 116 98, 124 104 C 114 114, 104 116, 96 112Z" fill="var(--sky-ink)" opacity="0.3" />
        </Sway>
        <Sway origin="128px 78px" amp={2.2} dur={7.8} delay={-3.5}>
          <g transform="translate(130 68) scale(1.2)" color="var(--lav-ink)" opacity="0.8"><Petals /></g>
        </Sway>
      </Sway>
    </svg>
  );
}
