"use client";

import { useEffect } from "react";
import { Bloom } from "../decor";

/**
 * The one-second welcome: a bloom opens, then the homepage appears. Visibility is decided by the
 * inline head script (html[data-intro]), so this markup is inert on every other visit.
 * Click, Escape, or Skip ends it.
 */
export function Intro() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-intro")) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && root.removeAttribute("data-intro");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const skip = () => document.documentElement.removeAttribute("data-intro");
  return (
    <div className="intro" onClick={skip}>
      <div className="intro-mark flex flex-col items-center">
        <Bloom animated id="intro-bloom" className="h-44 w-44 sm:h-52 sm:w-52" />
        <span className="intro-letters mt-2 font-display text-xl italic tracking-[0.3em] text-berry">SI</span>
      </div>
      <button type="button" onClick={skip} className="absolute bottom-8 right-6 rounded-full border border-line-strong bg-surface px-4 py-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
        Skip intro
      </button>
    </div>
  );
}
