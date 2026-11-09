/** Simplified bloom for small sizes: five overlapping rounded petals and a warm center. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-16 -16 32 32" className={className} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((r, i) => (
        <ellipse key={r} cx="0" cy="-7.5" rx="6.2" ry="8" transform={`rotate(${r + (i % 2 ? 4 : -3)})`} fill={i % 2 ? "var(--bloom-lav-out)" : "var(--bloom-pink-out)"} stroke="var(--bloom-edge)" strokeWidth="0.8" />
      ))}
      <circle r="3.6" fill="#e2ad45" stroke="#b9772a" strokeWidth="0.7" />
    </svg>
  );
}
