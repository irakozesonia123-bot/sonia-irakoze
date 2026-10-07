import { profile } from "@/content/portfolio";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink-3 sm:px-8">
        <p className="flex items-center gap-2"><Logo className="h-5 w-5 text-ink-2" /> © 2026 {profile.name}</p>
        <p className="font-mono text-xs">End of alignment · press ⌘K / Ctrl K to jump anywhere</p>
      </div>
    </footer>
  );
}
