import { ImageResponse } from "next/og";

export const alt = "Sonia Irakoze, Mechanical Engineering, University of Rochester";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#fcecef", color: "#2b1830", padding: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 64, height: 14, borderLeft: "3px solid #e0708f", borderRight: "3px solid #e0708f", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 5, borderTop: "3px solid #e0708f" }} />
          </div>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#4a5155", fontFamily: "monospace" }}>KIGALI · ROCHESTER</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>Sonia Irakoze</div>
          <div style={{ marginTop: 28, fontSize: 38, color: "#9c2259" }}>Mechanical Engineering · University of Rochester · Class of 2028</div>
        </div>
      </div>
    ),
    size,
  );
}
