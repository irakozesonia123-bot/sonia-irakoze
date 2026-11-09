import type { Metadata } from "next";
import { PageHeader } from "@/components/section";
import { ProjectCard, ProjectRow } from "@/components/work/project-card";
import { WorkFilters } from "@/components/work/work-filters";
import { featuredSlugs, publicProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Sonia Irakoze’s projects: SAquaSolve Rwanda, CDOT Compass, Aero Design, MarketBite, bridge work at CDOT, CropSight, CubeSat, a timber truss bridge, UniBooth, and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const rank = (slug: string) => { const i = featuredSlugs.indexOf(slug); return i === -1 ? 99 : i; };
  const main = publicProjects.filter((p) => p.prominence === "main").sort((a, b) => rank(a.slug) - rank(b.slug) || b.sort - a.sort);
  const more = publicProjects.filter((p) => p.prominence === "more").sort((a, b) => b.sort - a.sort);

  return (
    <>
      <PageHeader
        title="Work"
        intro="Engineering, software, and ventures, from a water nonprofit in Rwanda to aircraft structures in Rochester. Each project page explains what I did, what the team did, and where things stand."
      />
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8">
        <WorkFilters
          main={main.map((p, i) => ({ id: p.slug, filters: p.filters, node: <ProjectCard p={p} priority={i < 3} /> }))}
          more={more.map((p) => ({ id: p.slug, filters: p.filters, node: <ProjectRow p={p} /> }))}
        />
      </div>
    </>
  );
}
