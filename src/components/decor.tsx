/**
 * Original hand-built SVG decorations: a five-petal flower, a feather, and a small sprig.
 * All are decorative (aria-hidden) and colored with currentColor plus theme tokens.
 */

type P = { className?: string };

const PETALS = [0, 72, 144, 216, 288];

export function Flower({ className, center = "var(--surface)" }: P & { center?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} aria-hidden focusable="false">
      {PETALS.map((r) => (
        <path key={r} d="M0 0 C -4 -3, -4 -9, 0 -11 C 4 -9, 4 -3, 0 0Z" fill="currentColor" transform={`rotate(${r})`} opacity={0.92} />
      ))}
      <circle r="2.6" fill={center} />
      <circle r="1.3" fill="currentColor" opacity={0.55} />
    </svg>
  );
}

export function Feather({ className }: P) {
  return (
    <svg viewBox="0 0 40 80" className={className} aria-hidden focusable="false" fill="none">
      <path d="M20 4 C 34 16, 36 40, 22 66 C 10 52, 6 26, 20 4Z" fill="currentColor" opacity={0.22} />
      <path d="M20 4 C 34 16, 36 40, 22 66 C 10 52, 6 26, 20 4Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M21 10 C 22 34, 21 58, 18 78" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {[18, 26, 34, 42, 50].map((y, i) => (
        <g key={y} stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={0.7}>
          <path d={`M21.4 ${y} L ${30 - i * 0.6} ${y - 6}`} />
          <path d={`M21.2 ${y + 3} L ${12 + i * 0.4} ${y - 3}`} />
        </g>
      ))}
    </svg>
  );
}

/** Small divider above section titles: a stem, two leaves, and a bud. */
export function Sprig({ className = "h-5 w-14" }: P) {
  return (
    <svg viewBox="0 0 64 20" className={`${className} text-rose`} aria-hidden focusable="false" fill="none">
      <path d="M2 14 C 18 14, 34 12, 50 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M18 13.5 C 16 8, 20 5, 24 5 C 24 9, 22 12, 18 13.5Z" fill="var(--lav-ink)" opacity="0.55" />
      <path d="M32 12 C 34 17, 38 18, 41 17 C 40 14, 37 12, 32 12Z" fill="var(--sky-ink)" opacity="0.5" />
      <g transform="translate(55 7)">
        {PETALS.map((r) => (
          <path key={r} d="M0 0 C -2 -1.5, -2 -4.5, 0 -5.5 C 2 -4.5, 2 -1.5, 0 0Z" fill="currentColor" transform={`rotate(${r})`} />
        ))}
        <circle r="1.3" fill="var(--bg)" />
      </g>
    </svg>
  );
}

export { Bouquet } from "./bouquet";

/* ───────── Botanical bloom ─────────
   An original five-petal flower drawn as overlapping, slightly irregular petals in two layers,
   with soft gradients, fine veins, and a stamen-ringed center. */

const PETAL = "M0 0 C -15 -7, -24 -28, -14 -43 C -9 -50, -3 -48, 0 -44 C 3 -48, 9 -51, 14 -43 C 24 -28, 15 -7, 0 0Z";
const VEINS = "M0 -3 C -1 -16, 0 -29, 0 -40 M0 -12 C -4 -20, -7 -26, -9 -33 M0 -12 C 4 -20, 7 -26, 9 -33";
const BACK = [
  { r: 36, s: 0.9 }, { r: 106, s: 0.86 }, { r: 182, s: 0.92 }, { r: 250, s: 0.85 }, { r: 322, s: 0.9 },
];
const FRONT = [
  { r: 0, s: 1 }, { r: 70, s: 0.95 }, { r: 145, s: 1.03 }, { r: 218, s: 0.97 }, { r: 290, s: 1.01 },
];
const STAMENS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const rr = i % 2 ? 9.5 : 11;
  return { x: +(Math.cos(a) * rr).toFixed(2), y: +(Math.sin(a) * rr).toFixed(2) };
});

export function Bloom({ className, animated, id = "bloom" }: P & { animated?: boolean; id?: string }) {
  const petal = (fill: string, i: number, layer: number, r: number, sc: number) => (
    <g key={`${layer}-${i}`} transform={`rotate(${r}) scale(${sc})`}>
      <g className={animated ? "bloom-petal" : undefined} style={animated ? { animationDelay: `${layer * 120 + i * 45}ms` } : undefined}>
        <path d={PETAL} fill={`url(#${id}-${fill})`} stroke="var(--bloom-edge)" strokeWidth="0.8" />
        <path d={VEINS} fill="none" stroke="var(--bloom-vein)" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />
      </g>
    </g>
  );
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden focusable="false">
      <defs>
        <radialGradient id={`${id}-pink`} cx="0" cy="0" r="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--bloom-pink-in)" />
          <stop offset="1" stopColor="var(--bloom-pink-out)" />
        </radialGradient>
        <radialGradient id={`${id}-lav`} cx="0" cy="0" r="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--bloom-lav-in)" />
          <stop offset="1" stopColor="var(--bloom-lav-out)" />
        </radialGradient>
        <radialGradient id={`${id}-core`} cx="-2" cy="-2" r="9" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f8de8a" />
          <stop offset="1" stopColor="#d9a23c" />
        </radialGradient>
      </defs>
      {BACK.map((p, i) => petal("lav", i, 0, p.r, p.s))}
      {FRONT.map((p, i) => petal("pink", i, 1, p.r, p.s))}
      <g className={animated ? "bloom-core" : undefined}>
        {STAMENS.map((st, i) => (
          <g key={i}>
            <path d={`M0 0 L ${st.x} ${st.y}`} stroke="#c98b3a" strokeWidth="0.6" opacity="0.7" />
            <circle cx={st.x} cy={st.y} r="1.3" fill="#b9772a" />
          </g>
        ))}
        <circle r="6.5" fill={`url(#${id}-core)`} />
      </g>
    </svg>
  );
}
