/**
 * Topographic contour lines (think: a bathymetric survey of a lake), generated
 * deterministically on the server so there is no client JS and no layout shift.
 */
function ring(cx: number, cy: number, rx: number, ry: number, k: number) {
  const pts: string[] = [];
  const steps = 72;
  for (let s = 0; s <= steps; s++) {
    const a = (s / steps) * Math.PI * 2;
    const wob = 1 + 0.07 * Math.sin(a * 3 + k * 0.6) + 0.045 * Math.sin(a * 5 - k * 0.9) + 0.02 * Math.cos(a * 7 + k);
    const x = cx + Math.cos(a) * rx * wob;
    const y = cy + Math.sin(a) * ry * wob;
    pts.push(`${s === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join("") + "Z";
}

export function ContourField({ className = "" }: { className?: string }) {
  const rings = Array.from({ length: 15 }, (_, i) => i + 1);
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <g className="contour-drift" fill="none" stroke="var(--lake)">
        {rings.map((k) => (
          <path key={k} d={ring(860, 380, k * 42, k * 27, k)} strokeWidth={k % 5 === 0 ? 1.4 : 0.8} opacity={Math.max(0.06, 0.34 - k * 0.018)} />
        ))}
      </g>
      {/* survey alignment crossing the contours */}
      <path d="M-20 690 C 300 640, 520 560, 760 470 S 1120 300, 1240 260" fill="none" stroke="var(--survey)" strokeWidth="1.4" strokeDasharray="10 8" opacity="0.55" />
      {[180, 420, 640, 860, 1060].map((x, i) => {
        const y = 690 - (x / 1200) * 420 + (i === 2 ? 10 : 0);
        return <circle key={x} cx={x} cy={y} r="3.5" fill="var(--survey)" opacity="0.7" />;
      })}
    </svg>
  );
}
