/**
 * Content types for the whole site. Data lives in the sibling files
 * (profile.ts, projects.ts, experience.ts, …). Components only read these types.
 *
 * Conventions
 * - `visibility: "hidden"` keeps an item out of the public site while it waits for
 *   verification or evidence. It still appears in `needed.ts` reports.
 * - `needs` lists the evidence that would strengthen an item (never rendered publicly).
 */

export type LinkRef = { label: string; href: string };
export type Visibility = "public" | "hidden";
export type Tier = "flagship" | "supporting" | "archive";

/** Show-the-receipts items, rendered in the Evidence drawer. */
export type ArtifactKind =
  | "photo" | "diagram" | "screenshot" | "cad" | "fea" | "code" | "demo" | "video"
  | "presentation" | "report" | "certificate" | "publication" | "article" | "post" | "drawing";
export type Artifact = {
  kind: ArtifactKind;
  label: string;
  /** External URL or local /images path */
  href?: string;
  /** Local image for a thumbnail */
  src?: string;
  note?: string;
};

export type Image = { src: string; alt: string; caption?: string };

export type Status = "completed" | "ongoing" | "in-development" | "concept";

export type Profile = {
  name: string;
  pronouns?: string;
  descriptor: string;
  builderLine: string;
  positioning: string;
  intro: string;
  location: string;
  origin: string;
  coordinates: string;
  now: string[];
  lookingFor: string;
  email: string;
  links: { github: string; linkedin: string; resume: string; saquasolve: string };
  headshot: Image;
  siteUrl: string;
  seoDescription: string;
};

export type ProjectCategory =
  | "Mechanical" | "Software" | "Water" | "Infrastructure" | "Aerospace" | "Data & AI" | "Design" | "Coursework" | "Entrepreneurship" | "Just for fun";

/** Case-study building blocks. Each project composes its own page from these. */
export type StoryBlock =
  | { type: "text"; title: string; body: string[] }
  | { type: "list"; title: string; items: string[] }
  | { type: "steps"; title: string; intro?: string; steps: { label: string; title: string; body: string }[] }
  | { type: "stats"; title?: string; stats: { value: string; label: string; note?: string }[] }
  | { type: "architecture"; title: string; intro?: string; parts: { label: string; detail: string }[]; caption?: string }
  | { type: "compare"; title: string; intro?: string; before: Image & { label: string }; after: Image & { label: string } }
  | { type: "status"; title: string; rows: { state: "done" | "underway" | "coordinating" | "next" | "not-started"; text: string }[] }
  | { type: "gallery"; title: string; images: Image[] }
  | { type: "quote"; quote: string; cite: string }
  | { type: "lesson"; title: string; body: string; differently?: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  sort: number; // for chronology, e.g. 2026.07
  tier: Tier;
  visibility: Visibility;
  role: string;
  team?: string;
  status: Status;
  statusLabel: string;
  categories: ProjectCategory[];
  tools: string[];
  cover?: Image;
  links: LinkRef[];
  /** One-line "interesting challenge" for archive rows */
  challenge?: string;
  learned?: string;
  /** Summary shown on cards; case pages use `story` */
  summary: string;
  story?: StoryBlock[];
  artifacts?: Artifact[];
  related?: { experience?: string[]; projects?: string[] };
  /** Workbench-only flavour */
  bench?: { note: string; sticker?: string };
  needs?: string[];
};

export type ExperienceRole = { title: string; start: string; end: string; note?: string };

export type Experience = {
  id: string;
  org: string;
  team?: string;
  location: string;
  kind: "Internship" | "Campus job" | "Fellowship" | "Part-time";
  visibility: Visibility;
  current: boolean;
  /** Most recent first; more than one role shows growth */
  roles: ExperienceRole[];
  summary: string;
  highlights: string[];
  details?: string[];
  tools: string[];
  artifacts?: Artifact[];
  relatedProjects?: string[];
  needs?: string[];
};

export type LeadershipLevel = "Elected" | "Appointed" | "Selected" | "Hired" | "Co-founder" | "Mentor" | "Volunteer" | "Member";

export type Leadership = {
  id: string;
  org: string;
  role: string;
  level: LeadershipLevel;
  start: string;
  end: string;
  group: "Engineering community" | "University" | "Mentoring & teaching" | "Global";
  detail: string;
  visibility: Visibility;
  needs?: string[];
};

export type FieldNote = {
  id: string;
  type: "conference" | "speaking" | "program";
  title: string;
  org: string;
  place: string;
  date: string;
  sort: number;
  role: string;
  /** Why it mattered / what happened */
  note: string;
  takeaway?: string;
  image?: Image;
  links?: LinkRef[];
  visibility: Visibility;
  needs?: string[];
};

export type Recognition = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  sort: number;
  kind: "Grant" | "Scholarship" | "Award" | "Honor" | "Funding";
  why: string;
  opened?: string;
  image?: Image;
  href?: string;
  visibility: Visibility;
  needs?: string[];
};

export type Feature = {
  id: string;
  outlet: string;
  headline: string;
  kind: "University announcement" | "Program feature" | "Agency publication" | "Social feature" | "Published work" | "Film";
  date: string;
  sort: number;
  excerpt: string;
  href?: string;
  image?: Image;
  visibility: Visibility;
  needs?: string[];
};

export type Place = {
  id: string;
  name: string;
  region: "east-africa" | "north-america";
  lat: number;
  lon: number;
  years: string;
  headline: string;
  story: string;
  links?: LinkRef[];
};

export type TurningPoint = {
  id: string;
  year: string;
  place: string;
  moment: string;
  detail: string;
  led: string;
  placeId?: string;
};

export type Interest = { id: string; label: string; line: string; image?: Image; visibility: Visibility; needs?: string[] };

export type Recommendation = {
  name: string;
  role: string;
  relationship: string;
  date: string;
  quote: string;
  experienceId?: string;
  source?: LinkRef;
  visibility: Visibility;
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

export type SkillGroup = { title: string; items: string[] };

export type NavItem = { href: string; label: string; sheet: string; blurb: string };
