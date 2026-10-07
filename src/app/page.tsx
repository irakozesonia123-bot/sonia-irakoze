import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ExperienceList } from "@/components/experience";
import { ProjectsGrid } from "@/components/projects";
import { About, ContactSection, EducationSection, JourneySection, LeadershipSection, RecommendationsSection, SkillsSection } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Section id="experience" title="Where I’ve worked" kicker="Experience" intro="Infrastructure, data, and nonprofit work, most recent first. Open any role for the details.">
        <ExperienceList />
      </Section>
      <Section id="projects" title="Things I’ve built" kicker="Projects" intro="Hardware, software, and a water system that isn’t built yet. Each status says plainly where things stand.">
        <ProjectsGrid />
      </Section>
      <EducationSection />
      <LeadershipSection />
      <SkillsSection />
      <JourneySection />
      <RecommendationsSection />
      <ContactSection />
    </>
  );
}
