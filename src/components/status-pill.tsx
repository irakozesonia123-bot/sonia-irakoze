import type { Status } from "@/content/types";

const styles: Record<Status, string> = {
  completed: "text-ok bg-ok/12 border-ok/30",
  ongoing: "text-lake bg-lake/10 border-lake/30",
  "in-development": "text-wip bg-wip/12 border-wip/35",
  placeholder: "text-ink-3 bg-surface-2 border-line",
};

export function StatusPill({ status, label }: { status: Status; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}
