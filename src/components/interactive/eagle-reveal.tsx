"use client";

import { useState } from "react";
import { Feather } from "../decor";

/** The feather opens the reflection. It is a plain button, so keyboard and touch work the same. */
export function EagleReveal({ line, body }: { line: string; body: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="eagle-body"
        className="group flex items-start gap-4 text-left"
      >
        <Feather className={`mt-1 h-14 w-7 flex-none text-lav-ink transition-transform duration-500 ${open ? "rotate-[18deg]" : "group-hover:-rotate-12"}`} />
        <span>
          <span className="script block text-[clamp(1.7rem,4vw,2.5rem)] leading-tight text-ink">{line}</span>
          <span className="mt-2 inline-block text-[0.95rem] font-semibold text-berry underline decoration-line-strong underline-offset-4">
            {open ? "Close the reflection" : "What the eagle means to me"}
          </span>
        </span>
      </button>
      <div id="eagle-body" hidden={!open} className="pop mt-5 max-w-[60ch] space-y-3 pl-11 text-[1.06rem] leading-relaxed text-ink-2">
        {body.map((p) => <p key={p}>{p}</p>)}
      </div>
    </div>
  );
}
