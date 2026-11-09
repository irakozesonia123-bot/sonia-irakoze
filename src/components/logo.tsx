/** Monogram: "SI" in a small five-petal flower. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-16 -16 32 32" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((r, i) => (
        <path key={r} d="M0 -6 C -5 -8, -5 -15, 0 -16 C 5 -15, 5 -8, 0 -6Z" fill={i % 2 ? "var(--lav)" : "var(--rose-soft)"} stroke="var(--rose)" strokeWidth="1" transform={`rotate(${r})`} />
      ))}
      <circle r="8" fill="var(--surface)" stroke="var(--rose)" strokeWidth="1" />
      <text y="3.4" textAnchor="middle" fontFamily="var(--font-display), serif" fontStyle="italic" fontWeight="700" fontSize="9" fill="var(--berry)">SI</text>
    </svg>
  );
}
