import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";
import { FlagshipFeature, ProjectCard } from "@/components/work/project-cards";
import { Archive } from "@/components/work/archive";
import { publicProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected engineering, water, software, and design projects by Sonia Irakoze, plus a searchable archive of everything else.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const flagship = publicProjects.filter((p) => p.tier === "flagship");
  // Mechanical and aerospace work first, so it's easy to find
  const mechFirst = (c: string[]) => (c.includes("Aerospace") || c.includes("Mechanical") ? 0 : 1);
  const supporting = publicProjects.filter((p) => p.tier === "supporting").sort((a, b) => mechFirst(a.categories) - mechFirst(b.categories));
  return (
    <>
      <PageHeader
        sheet="S-02"
        kicker="Work"
        title="Things I’ve built and worked on"
        intro="Four flagship projects up top, the supporting work behind them, then a searchable archive of everything. Every status says plainly what’s finished, what’s in progress, and what’s only planned."
        meta={[
          { label: "Flagship", value: String(flagship.length) },
          { label: "Supporting", value: String(supporting.length) },
          { label: "Archive", value: String(publicProjects.length - flagship.length - supporting.length) },
          { label: "Total", value: String(publicProjects.length) },
        ]}
      />
      <Section id="selected" station="02+10" kicker="Flagship" title="Selected work">
        <div className="space-y-6">
          {flagship.map((p, i) => <FlagshipFeature key={p.slug} p={p} index={i} />)}
        </div>
      </Section>
      <Section id="supporting" station="02+20" kicker="Supporting" title="Also on the drawing board" intro="Real projects with smaller footprints, or ones still waiting for their best evidence.">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supporting.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      </Section>
      <Section id="archive" station="02+30" kicker="Archive" title="The full index" intro="Coursework, side projects, and experiments, alongside everything above. The playful ones also live on the Workbench." action={{ href: "/workbench", label: "Visit the Workbench" }}>
        <Archive projects={publicProjects} />
      </Section>
    </>
  );
}
