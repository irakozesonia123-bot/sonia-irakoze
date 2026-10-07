/** Monogram: a survey station marker (circle + crosshair ticks) around "SI". */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 0v5M16 27v5M0 16h5M27 16h5" stroke="var(--survey)" strokeWidth="2" strokeLinecap="round" />
      <text x="16" y="20.2" textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="11.5" fill="currentColor">SI</text>
    </svg>
  );
}
