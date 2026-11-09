"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const PETAL_COLORS = ["var(--rose)", "var(--lav-ink)", "var(--sky-ink)"];

/** Copy button with a small petal burst and clear "Copied" feedback. */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const [burst, setBurst] = useState(0);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
      setBurst((b) => b + 1);
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2200);
  };
  return (
    <button type="button" onClick={copy} className="relative inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-sm font-semibold transition-colors hover:border-ink">
      {state === "copied" ? <Check className="h-4 w-4 text-berry" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Select & copy" : "Copy email"}</span>
      {burst > 0 && state === "copied" && (
        <span key={burst} aria-hidden>
          {Array.from({ length: 8 }, (_, k) => (
            <span key={k} className="burst-petal" style={{ ["--a" as string]: `${k * 45}deg`, background: PETAL_COLORS[k % 3] }} />
          ))}
        </span>
      )}
    </button>
  );
}
