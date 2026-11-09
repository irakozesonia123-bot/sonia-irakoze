"use client";

import { useEffect } from "react";
import { Feather, Monogram } from "../decor";

/**
 * The one-second welcome. Visibility is decided by the inline head script (html[data-intro]),
 * so this markup is inert on every other visit. Click, Escape, or the Skip button ends it.
 */
export function Intro() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-intro")) return;
    const end = () => root.removeAttribute("data-intro");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && end();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const skip = () => document.documentElement.removeAttribute("data-intro");
  return (
    <div className="intro" onClick={skip}>
      <div className="relative">
        <Monogram animated className="intro-mark h-40 w-40 sm:h-48 sm:w-48" />
        <Feather className="intro-feather absolute -right-6 -top-4 h-16 w-8 text-lav-ink" />
      </div>
      <button type="button" onClick={skip} className="absolute bottom-8 right-6 rounded-full border border-line-strong bg-surface px-4 py-1.5 text-sm font-semibold text-ink-2 hover:text-ink">
        Skip intro
      </button>
    </div>
  );
}
