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

/** A loose floral cluster for corners of sections. */
export function Bouquet({ className }: P) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden focusable="false" fill="none">
      <path d="M20 150 C 50 120, 70 90, 80 40" stroke="var(--line-strong)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M44 128 C 70 120, 100 112, 130 70" stroke="var(--line-strong)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M60 104 C 50 92, 54 80, 66 76 C 70 88, 68 98, 60 104Z" fill="var(--lav-ink)" opacity="0.3" />
      <path d="M96 112 C 104 100, 116 98, 124 104 C 114 114, 104 116, 96 112Z" fill="var(--sky-ink)" opacity="0.3" />
      <g transform="translate(80 38) scale(1.6)" color="var(--rose)"><Petals /></g>
      <g transform="translate(130 68) scale(1.2)" color="var(--lav-ink)" opacity="0.8"><Petals /></g>
      <g transform="translate(40 96) scale(0.9)" color="var(--sky-ink)" opacity="0.7"><Petals /></g>
    </svg>
  );
}

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

/** The SI monogram inside a ring of petals: used by the logo and the welcome animation. */
export function Monogram({ className, animated }: P & { animated?: boolean }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden focusable="false">
      {PETALS.map((r, i) => (
        <g key={r} transform={`rotate(${r})`}>
          <path
            d="M0 -16 C -12 -22, -12 -40, 0 -46 C 12 -40, 12 -22, 0 -16Z"
            fill={i % 2 ? "var(--lav)" : "var(--rose-soft)"}
            stroke="var(--rose)"
            strokeWidth="1.4"
            className={animated ? "intro-petal" : undefined}
            style={animated ? { animationDelay: `${i * 60}ms` } : undefined}
          />
        </g>
      ))}
      <circle r="17" fill="var(--surface)" stroke="var(--rose)" strokeWidth="1.4" />
      <text y="6.5" textAnchor="middle" fontSize="18" fontStyle="italic" fontWeight="600" fill="var(--berry)" style={{ fontFamily: "var(--font-display)" }} className={animated ? "intro-letters" : undefined}>
        SI
      </text>
    </svg>
  );
}
