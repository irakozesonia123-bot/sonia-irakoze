"use client";

import { useState } from "react";
import { Flower } from "../decor";

/**
 * The hero name. Only the surname reacts: hover, keyboard focus, or a tap reveals a solid
 * highlight behind "Irakoze" and a small flower. Nothing around it moves, and the text stays selectable.
 */
export function NameMark({ first, last }: { first: string; last: string }) {
  const [on, setOn] = useState(false);
  return (
    <h1 id="hero-title" className="mt-3 text-[clamp(3.1rem,8.5vw,6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
      {first}{" "}
      <span
        className="surname"
        data-on={on || undefined}
        tabIndex={0}
        onClick={() => setOn((v) => !v)}
        onBlur={() => setOn(false)}
      >
        <span className="surname-hl" aria-hidden />
        <span className="relative">{last}</span>
        <Flower className="surname-flower" />
      </span>
    </h1>
  );
}
