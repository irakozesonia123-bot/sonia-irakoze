"use client";

import { useState } from "react";
import { Flower } from "../decor";

/**
 * The hero name. Hover or focus draws a soft highlight and a flower; a click or tap
 * (or Enter) also reveals one more line about where I'm from.
 */
export function NameMark({ name, note }: { name: string; note: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1 id="hero-title" className="mt-3 text-[clamp(3.1rem,8.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
        <button type="button" className="name" aria-expanded={open} aria-controls="name-note" onClick={() => setOpen((v) => !v)}>
          <span className="name-hl" aria-hidden />
          <span className="name-text">{name}</span>
          <Flower className="name-flower" />
        </button>
      </h1>
      <p id="name-note" className={`mt-3 text-[0.98rem] text-ink-2 ${open ? "pop" : "sr-only"}`}>
        <span className="script text-berry">{note}</span>
      </p>
    </>
  );
}
