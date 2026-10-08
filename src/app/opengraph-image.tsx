import { ImageResponse } from "next/og";

export const alt = "Sonia Irakoze, Mechanical Engineering student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const rings = Array.from({ length: 9 }, (_, i) => i + 1);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b1517", color: "#e5eeeb", padding: 72, position: "relative" }}>
        {rings.map((k) => (
          <div key={k} style={{ position: "absolute", right: 260 - k * 34, top: 300 - k * 24, width: k * 68, height: k * 48, borderRadius: "50%", border: "1.5px solid rgba(124,198,214,0.28)" }} />
        ))}
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#ffa36b", fontFamily: "monospace" }}>STA 00+00 · ROCHESTER, NY · FROM KIGALI, RWANDA</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>Sonia</div>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, color: "#7cc6d6" }}>Irakoze</div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#a6b9b6", maxWidth: 820 }}>Mechanical Engineering · building across physical and digital systems</div>
        </div>
      </div>
    ),
    size,
  );
}
