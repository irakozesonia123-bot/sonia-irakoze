"use client";

import Image from "next/image";
import { useState } from "react";
import { Flower } from "../decor";

/** Greetings only; this is not a list of languages I speak. */
const GREETINGS = [
  { word: "Hello!", lang: "English" },
  { word: "Muraho!", lang: "Kinyarwanda" },
  { word: "Bonjour!", lang: "French" },
  { word: "Hujambo!", lang: "Swahili" },
  { word: "¡Hola!", lang: "Spanish" },
];

/** Positions for the two offset frame layers; each tap moves them to the next set. */
const LAYERS = [
  ["translate(14px, -14px) rotate(3deg)", "translate(-12px, 12px) rotate(-3deg)"],
  ["translate(-14px, -10px) rotate(-3deg)", "translate(12px, 14px) rotate(2deg)"],
  ["translate(4px, -18px) rotate(1deg)", "translate(-4px, 18px) rotate(-1deg)"],
  ["translate(16px, 6px) rotate(2deg)", "translate(-14px, -6px) rotate(-2deg)"],
  ["translate(-6px, -16px) rotate(-1deg)", "translate(8px, 16px) rotate(1deg)"],
];

/**
 * My portrait in an arched frame. The frame's outline draws itself once; a tap or click
 * (or Enter) cycles the greeting and shifts the colored layers. Nothing moves on its own after that.
 */
export function PortraitHello({ src, alt }: { src: string; alt: string }) {
  const [i, setI] = useState(0);
  const g = GREETINGS[i];
  const next = () => setI((v) => (v + 1) % GREETINGS.length);
  return (
    <figure className="mx-auto w-full max-w-[16rem] sm:max-w-[20rem] md:max-w-[23rem]">
      <div className="relative">
      <div className="frame-layer absolute inset-0 rounded-t-full rounded-b-[2rem] bg-sky" style={{ transform: LAYERS[i][0] }} aria-hidden />
      <div className="frame-layer absolute inset-0 rounded-t-full rounded-b-[2rem] bg-lav" style={{ transform: LAYERS[i][1] }} aria-hidden />
      <button
        type="button"
        onClick={next}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-[2rem] bg-surface-2 ring-4 ring-surface"
        aria-label={`Show a greeting in another language. Now showing “${g.word}”, a ${g.lang} greeting.`}
      >
        <Image src={src} alt={alt} fill priority sizes="(min-width: 768px) 368px, 320px" className="object-cover object-[50%_22%] transition-transform duration-700 group-hover:scale-[1.03]" />
      </button>
      <svg viewBox="0 0 100 125" className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]" preserveAspectRatio="none" aria-hidden>
        <path d="M4 121 L4 50 A46 46 0 0 1 96 50 L96 121 Z" fill="none" stroke="var(--rose)" strokeWidth="0.5" pathLength={1} className="frame-draw" vectorEffect="non-scaling-stroke" />
      </svg>
      <Flower key={`f${i}`} className="bloom pointer-events-none absolute -bottom-3 -right-3 h-12 w-12 text-rose" />
      <Flower key={`g${i}`} className="bloom pointer-events-none absolute -right-2 top-[18%] h-7 w-7 text-lav-ink [animation-delay:120ms]" />

      <div className="absolute -left-3 bottom-[12%] sm:-left-12" aria-live="polite">
        <p key={g.word} className="pop min-w-[9.5rem] rounded-2xl rounded-tl-sm bg-surface px-4 py-2.5 shadow-[0_10px_28px_-12px_rgb(40_20_60/0.4)] ring-1 ring-line">
          <span className="block font-display text-2xl font-semibold leading-none text-berry">{g.word}</span>
          <span className="label mt-1 block">{g.lang} greeting</span>
        </p>
      </div>
      </div>
      <figcaption className="mt-5 text-center text-[0.92rem] text-ink-2">
        <button type="button" onClick={next} className="ulink font-semibold text-ink">Tap my photo</button> for a greeting in another language.
      </figcaption>
    </figure>
  );
}
