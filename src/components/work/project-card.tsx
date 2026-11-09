import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/types";
import { Fig, willRender } from "../figure";
import { Feather, Flower } from "../decor";
import { Tilt } from "../interactive/tilt";

/** Clean typographic stand-in when a project has no image yet. */
export function CoverPlate({ p, aspect }: { p: Project; aspect: string }) {
  return (
    <div className={`${aspect} relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-lav to-sky p-5`}>
      <Flower className="h-8 w-8 text-rose" />
      <Feather className="absolute -right-2 -top-3 h-28 w-14 rotate-[24deg] text-lav-ink/60" />
      <div>
        <p className="label !text-berry">{p.area}</p>
        <p className="mt-1 font-display text-2xl font-semibold leading-tight text-ink">{p.title}</p>
      </div>
    </div>
  );
}

export function ProjectCover({ p, aspect, sizes, priority }: { p: Project; aspect: string; sizes: string; priority?: boolean }) {
  return willRender(p.cover) ? (
    <Fig fig={p.cover} aspect={aspect} sizes={sizes} zoom={false} showCaption={false} priority={priority} />
  ) : (
    <CoverPlate p={p} aspect={aspect} />
  );
}

/**
 * One project, once. The title is the link; a stretched hit area makes the whole card clickable
 * without nesting interactive content.
 */
export function ProjectCard({ p, size = "md", priority }: { p: Project; size?: "lg" | "md"; priority?: boolean }) {
  const lg = size === "lg";
  return (
    <article className={`group relative ${lg ? "grid gap-6 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center md:gap-10" : "flex flex-col"}`}>
      <Tilt>
        <ProjectCover p={p} aspect={lg ? "aspect-[16/10]" : "aspect-[3/2]"} sizes={lg ? "(min-width: 768px) 640px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"} priority={priority} />
      </Tilt>
      <div className={lg ? "" : "mt-4"}>
        <p className="label">{p.area} · {p.dates}</p>
        <h3 className={`mt-1.5 font-semibold leading-tight ${lg ? "text-3xl sm:text-4xl" : "text-[1.4rem]"}`}>
          <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:text-berry">
            {p.title}
          </Link>
        </h3>
        <p className={`mt-2 text-ink-2 ${lg ? "text-[1.08rem]" : ""}`}>{p.blurb}</p>
        <p className="mt-3 border-l-2 border-rose pl-3 text-[0.95rem] font-semibold leading-snug">{p.outcome}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-berry" aria-hidden>
          Read the case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

/** Compact row for earlier and smaller work. */
export function ProjectRow({ p }: { p: Project }) {
  return (
    <article className="group relative grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[8rem_minmax(0,1fr)_auto]">
      <p className="label sm:pt-1">{p.dates}</p>
      <div className="col-span-2 row-start-2 sm:col-span-1 sm:row-start-auto">
        <h3 className="font-bold leading-snug">
          <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:text-berry">{p.title}</Link>
        </h3>
        <p className="text-[0.96rem] text-ink-2">{p.blurb}</p>
      </div>
      <ArrowRight className="col-start-2 row-start-1 h-4 w-4 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-berry sm:col-start-3" aria-hidden />
    </article>
  );
}
