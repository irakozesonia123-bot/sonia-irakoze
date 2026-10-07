/** Shared content types. Every piece of copy on the site lives in `portfolio.ts`. */

export type LinkRef = { label: string; href: string };

export type Status = "completed" | "ongoing" | "in-development" | "placeholder";

export type Profile = {
  name: string;
  shortName: string;
  pronouns?: string;
  role: string;
  positioning: string;
  intro: string;
  location: string;
  origin: string;
  status: string;
  lookingFor: string;
  email: string;
  links: { github: string; linkedin: string; resume: string; saquasolve: string };
  headshot: { src: string; alt: string };
  siteUrl: string;
  seoDescription: string;
};

export type AboutBlock = {
  paragraphs: string[];
  interests: { label: string; detail: string }[];
  photo?: { src: string; alt: string; caption: string };
};

export type Experience = {
  company: string;
  team?: string;
  role: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  details?: string[];
  tech: string[];
  link?: LinkRef;
};

export type ProjectCategory = "Software" | "Mechanical" | "Water & Infrastructure" | "Data" | "Design";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  status: Status;
  statusLabel: string;
  featured: boolean;
  categories: ProjectCategory[];
  tech: string[];
  cover?: { src: string; alt: string };
  links: LinkRef[];
  /** Case-study page content */
  problem: string;
  approach: string[];
  architecture?: { label: string; detail: string }[];
  challenges: string[];
  outcome: string[];
  lessons: string;
  gallery: { src: string; alt: string; caption: string }[];
};

export type Education = {
  school: string;
  credential: string;
  location: string;
  start: string;
  end: string;
  notes: string[];
  coursework?: string[];
};

export type Award = { title: string; issuer: string; year: string; note?: string; href?: string };

export type Leadership = {
  org: string;
  role: string;
  start: string;
  end: string;
  kind: "Leadership" | "Mentorship" | "Volunteering" | "Entrepreneurship";
  detail: string;
};

export type SkillGroup = { title: string; note?: string; items: string[] };

export type JourneyStop = {
  /** Survey-style station number, e.g. "0+00" */
  station: string;
  date: string;
  place: string;
  title: string;
  detail: string;
  milestone?: boolean;
};

export type Recommendation = {
  name: string;
  role: string;
  relationship: string;
  date: string;
  quote: string;
  source?: LinkRef;
  placeholder?: boolean;
};

export type NavItem = { id: string; label: string; station: string };
