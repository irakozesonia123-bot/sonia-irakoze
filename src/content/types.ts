/**
 * Content types for the whole site. Data lives in the sibling files
 * (profile.ts, projects.ts, experience.ts, about.ts). Components only read these types.
 *
 * Conventions
 * - `visibility: "hidden"` keeps an item off the public site while it waits for verification.
 * - `needs` lists evidence that would strengthen an item (never rendered publicly).
 * - Every image is a `Figure`. If its file is not in /public yet, the figure becomes an
 *   "add a photo" slot on local and preview builds, and disappears on production.
 *   To fill a slot, save the file at exactly the `src` path. See docs/ASSETS_NEEDED.md.
 */

export type LinkRef = { label: string; href: string };
export type Visibility = "public" | "hidden" | "slot";

/** What an image shows, so team work, concepts, and finished work are never confused. */
export type FigureTag = "My work" | "Team work" | "Concept" | "Simulation" | "Built" | "Fieldwork" | "Screenshot" | "Award" | "Event";

export type Figure = {
  /** Local path under /public, e.g. /images/aero/wing-cad.jpg */
  src: string;
  alt: string;
  caption?: string;
  tag?: FigureTag;
  /** CSS object-position, e.g. "50% 20%" to keep a face in frame */
  pos?: string;
  /** "contain" for drawings, screenshots, and certificates so nothing is cropped */
  fit?: "cover" | "contain";
  /** Only for empty slots: exactly what to add here */
  want?: string;
};

export type WorkFilter = "Engineering" | "Software & Data" | "Ventures & Community";

/** Case-study building blocks. Each project composes its own page from these. */
export type StoryBlock =
  | { type: "text"; title: string; body: string[]; figure?: Figure; figureSide?: "left" | "right" }
  | { type: "list"; title: string; intro?: string; items: string[]; figure?: Figure }
  | { type: "steps"; title: string; intro?: string; steps: { label: string; title: string; body: string }[] }
  | { type: "contribution"; title?: string; team: string[]; me: string[]; teamLabel?: string }
  | { type: "figures"; title?: string; intro?: string; items: Figure[] }
  | { type: "compare"; title: string; intro?: string; before: Figure & { label: string }; after: Figure & { label: string } }
  | { type: "status"; title: string; intro?: string; rows: { state: "done" | "underway" | "next"; text: string }[] }
  | { type: "quote"; quote: string; cite: string }
  /** Step-through of real screenshots of a prototype */
  | { type: "tour"; title: string; intro?: string[]; steps: (Figure & { label: string; body: string })[] }
  | { type: "lesson"; title: string; body: string }
  /** Deeper technical detail, collapsed by default */
  | { type: "details"; title: string; intro?: string; items: { label: string; detail: string }[]; caption?: string };

export type Project = {
  slug: string;
  title: string;
  /** What it is, in one sentence */
  kind: string;
  /** Short description for cards (homepage and Work) */
  blurb: string;
  /** One supported outcome or contribution */
  outcome: string;
  dates: string;
  sort: number;
  /** main = full card on Work; more = compact row under "Earlier and smaller work" */
  prominence: "main" | "more";
  visibility: Visibility;
  role: string;
  team?: string;
  status: string;
  filters: WorkFilter[];
  /** Short label shown on cards, e.g. "Water infrastructure" */
  area: string;
  tools: string[];
  cover?: Figure;
  /** Optional key figures under the header (plain type, no cards) */
  facts?: { value: string; label: string }[];
  links: LinkRef[];
  story?: StoryBlock[];
  /** Secondary documents and posts, shown in an expandable list */
  documents?: LinkRef[];
  related?: { experience?: string[]; projects?: string[] };
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
  tools: string[];
  relatedProjects?: string[];
  /** Shown on the homepage preview */
  preview?: boolean;
  needs?: string[];
};

export type Leadership = {
  id: string;
  org: string;
  role: string;
  how: "Elected" | "Appointed" | "Selected" | "Founder" | "Co-founder" | "Mentor" | "Volunteer" | "Member";
  start: string;
  end: string;
  detail: string;
  /** Case study this role produced; linked instead of repeating it */
  project?: string;
  visibility: Visibility;
  needs?: string[];
};

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

export type SkillGroup = { title: string; items: string[]   /** Projects that show this group in use */
  seenIn?: { label: string; href: string }[];
};

export type Recognition = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  sort: number;
  why: string;
  href?: string;
  figure?: Figure;
  visibility: Visibility;
};

export type EventNote = {
  id: string;
  title: string;
  place: string;
  date: string;
  sort: number;
  role: string;
  note: string;
  figure?: Figure;
  links?: LinkRef[];
  visibility: Visibility;
  needs?: string[];
};

export type Feature = {
  id: string;
  outlet: string;
  headline: string;
  date: string;
  sort: number;
  href?: string;
  visibility: Visibility;
};

export type Milestone = { year: string; place: string; text: string };

export type Interest = { id: string; label: string; line: string; figure?: Figure; visibility: Visibility };

export type NavItem = { href: string; label: string };
