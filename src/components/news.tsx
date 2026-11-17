import { ArrowUpRight, FileText } from "lucide-react";
import type { NewsItem } from "@/content/news";

/** The external link for one entry: clear action text, PDF label, and new-tab notice for screen readers. */
function NewsAction({ n, className = "" }: { n: NewsItem; className?: string }) {
  return (
    <a
      href={n.href}
      target="_blank"
      rel="noopener"
      className={`ulink inline-flex items-center gap-1.5 font-semibold text-ink ${className}`}
    >
      {n.pdfPage ? <FileText className="h-4 w-4 flex-none text-ink-3" aria-hidden /> : null}
      {n.action}
      <span className="sr-only">: {n.title}, {n.source}{n.pdfPage ? " (PDF)" : ""} (opens in a new tab)</span>
      <ArrowUpRight className="h-4 w-4 flex-none" aria-hidden />
    </a>
  );
}

function Meta({ n }: { n: NewsItem }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="rounded-full bg-lav px-2.5 py-0.5 font-mono text-[0.72rem] text-lav-ink">{n.type}{n.pdfPage ? " · PDF" : ""}</span>
      {n.date && <span className="label">{n.date}</span>}
    </p>
  );
}

function Title({ n, as: H = "h3" }: { n: NewsItem; as?: "h3" | "p" }) {
  return n.titleIsDescriptive ? <H className="font-display text-lg font-semibold leading-snug">{n.title}</H> : <H className="font-display text-lg font-semibold leading-snug">“{n.title}”</H>;
}

function AlsoAt({ n }: { n: NewsItem }) {
  if (!n.alsoAt?.length) return null;
  return (
    <p className="mt-2 text-[0.92rem] text-ink-2">
      Also at:{" "}
      {n.alsoAt.map((a, k) => (
        <span key={a.href}>{k > 0 && " · "}<a href={a.href} target="_blank" rel="noopener" className="ulink">{a.label}<span className="sr-only"> (opens in a new tab)</span></a></span>
      ))}
    </p>
  );
}

export function NewsFeatured({ items }: { items: NewsItem[] }) {
  return (
    <ul className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
      {items.map((n) => (
        <li key={n.id} id={`news-${n.id}`} className="flex flex-col rounded-2xl bg-surface p-6 ring-1 ring-line">
          <Meta n={n} />
          <p className="mt-3 text-[0.92rem] font-semibold text-berry">{n.source}</p>
          <div className="mt-1"><Title n={n} /></div>
          <p className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-ink-2">{n.summary}</p>
          <AlsoAt n={n} />
          <NewsAction n={n} className="mt-4 self-start" />
        </li>
      ))}
    </ul>
  );
}

export function NewsRows({ items }: { items: NewsItem[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((n) => (
        <li key={n.id} id={`news-${n.id}`} className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="min-w-0">
            <Meta n={n} />
            <p className="mt-2 text-[0.92rem] font-semibold text-berry">{n.source}</p>
            <Title n={n} as="p" />
            <p className="mt-1 text-[0.98rem] text-ink-2">{n.summary}</p>
            <AlsoAt n={n} />
          </div>
          <NewsAction n={n} className="md:mt-1 md:justify-self-end md:whitespace-nowrap" />
        </li>
      ))}
    </ul>
  );
}

/** Small "In the news" line for project and experience pages. */
export function NewsLinks({ items, className = "" }: { items: NewsItem[]; className?: string }) {
  if (!items.length) return null;
  return (
    <p className={`text-[0.96rem] ${className}`}>
      <span className="label mr-2">In the news</span>
      {items.map((n, k) => (
        <span key={n.id}>
          {k > 0 && " · "}
          <a href={n.href} target="_blank" rel="noopener" className="ulink font-semibold">{n.source}{n.pdfPage ? " (PDF)" : ""}<span className="sr-only">: {n.title} (opens in a new tab)</span></a>
        </span>
      ))}
    </p>
  );
}
