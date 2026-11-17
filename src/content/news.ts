/**
 * News and mentions: third-party articles, profiles, announcements, listings, and official records
 * that name Sonia. Each entry was checked against its source on 17 Nov 2026.
 *
 * Rules: only coverage published by someone else (never this site or Sonia's own posts); keep the
 * source's original title; leave `date` empty when the source shows none; summaries are original.
 */

export type NewsType = "Article" | "Article mention" | "Recipient profile" | "Newsletter profile" | "Student profile" | "Profile" | "Announcement" | "Award listing" | "Official record" | "Idea card" | "Social feature" | "University listing";

export type NewsItem = {
  /** Stable ID, used for links from project and experience pages. */
  id: string;
  source: string;
  /** The source's own title, or a descriptive label when the mention sits inside a larger page. */
  title: string;
  titleIsDescriptive?: boolean;
  /** Only when verified on the source. */
  date?: string;
  /** Sorting only, never displayed. */
  sort: number;
  type: NewsType;
  summary: string;
  href: string;
  action: string;
  /** PDF page the mention is on, when verified. */
  pdfPage?: number;
  /** The same story or listing at another address. */
  alsoAt?: { label: string; href: string }[];
  featured?: boolean;
  related?: { projects?: string[]; experience?: string[]; leadership?: string[] };
};

export const news: NewsItem[] = [
  {
    id: "p4p-recipient-profile",
    source: "Davis Projects for Peace, Middlebury College",
    title: "Congratulations to our most recent University of Rochester Projects for Peace recipients",
    sort: 2026.05,
    type: "Recipient profile",
    summary: "A profile of me and my original proposal, “AquaSolve Rwanda: Solar-Powered Filtration for Peace,” for safe water around Lake Mirayi. The proposal grew into SAquaSolve Rwanda; the profile describes plans at the time of the award, not completed infrastructure.",
    href: "https://www.middlebury.edu/projects-peace/congratulations-our-most-recent-university-rochester-projects-peace-recipients",
    action: "View profile",
    alsoAt: [{ label: "Same profile on the University of Rochester Student Fellowships Office site", href: "https://www.rochester.edu/college/studentfellowships/news-events/projects-for-peace.html" }],
    featured: true,
    related: { projects: ["saquasolve-rwanda"] },
  },
  {
    id: "ur-newscenter-2026-awards",
    source: "University of Rochester News Center",
    title: "Recognition, research, and global reach for students and alumni",
    date: "May 14, 2026",
    sort: 2026.0514,
    type: "Article",
    summary: "A roundup of student and alumni honors that names me as one of two 2026 Projects for Peace recipients and describes my Rwanda water project.",
    href: "https://www.rochester.edu/newscenter/recognition-research-and-global-reach-for-students-and-alumni-701752/",
    action: "Read article",
    featured: true,
    related: { projects: ["saquasolve-rwanda"] },
  },
  {
    id: "uwp-newsletter-july-2025",
    source: "Ugandan Water Project",
    title: "July 2025",
    date: "July 2025 issue",
    sort: 2025.07,
    type: "Newsletter profile",
    summary: "An intern spotlight introducing me as a University of Rochester mechanical engineering student, with a few of my interests. I interned with the organization in summer 2025, working from its office in Lima, New York.",
    href: "https://ugandanwaterproject.com/2026/11/july-2025/",
    action: "Read newsletter",
    featured: true,
    related: { experience: ["uwp"] },
  },
  {
    id: "ur-admissions-profile",
    source: "University of Rochester Undergraduate Admissions",
    title: "Student Admissions Associate profile",
    titleIsDescriptive: true,
    sort: 2026.09,
    type: "Student profile",
    summary: "My profile as a Student Admissions Associate, with my studies, campus involvement, and interests.",
    href: "https://admissions.rochester.edu/our-students/",
    action: "View profile",
    featured: true,
  },
  {
    id: "cdot-stac-nov-2026",
    source: "Colorado Department of Transportation",
    title: "November 2026 STAC Packet",
    date: "November 2026",
    sort: 2026.11,
    type: "Official record",
    summary: "Transportation Commission minutes in the packet list me and CDOT Compass as the Honorable Mention for the Outstanding AI-Enabled Improvement Award in the FY26 CDOT Innovations Challenge. This statewide recognition is separate from Compass’s Headquarters Division award.",
    href: "https://www.codot.gov/programs/planning/assets/stac-archives/2026stacmaterials/stacpacketnovember2026#page=25",
    action: "Open PDF, page 25",
    pdfPage: 25,
    related: { projects: ["cdot-compass"], experience: ["cdot"] },
  },
  {
    id: "cdot-compass-idea-card",
    source: "Colorado Department of Transportation, Lean Everyday Ideas",
    title: "2026 Idea Card: CDOT Compass",
    date: "July 2, 2026",
    sort: 2026.0702,
    type: "Idea card",
    summary: "CDOT’s published idea card for CDOT Compass, naming me as the Staff Bridge intern who built it.",
    href: "https://docs.google.com/presentation/d/12Ta0FAas_kKpvBQ0F2O1W6uQZGFcWMgNj-wkbhd-SQ0/",
    action: "View idea card",
    related: { projects: ["cdot-compass"], experience: ["cdot"] },
  },
  {
    id: "worlddenver-instagram-2026",
    source: "WorldDenver",
    title: "Instagram post on my return to Denver",
    titleIsDescriptive: true,
    date: "June 11, 2026",
    sort: 2026.0611,
    type: "Social feature",
    summary: "WorldDenver’s Instagram post about my return to Denver as a CDOT engineering intern, three years after my TechGirls exchange visit.",
    href: "https://www.instagram.com/p/DZdOJtYE6Up/",
    action: "View post",
    related: { experience: ["cdot"] },
  },
  {
    id: "saa-profiles-2026-27",
    source: "University of Rochester Student Alumni Ambassadors",
    title: "2026–2027 Student Alumni Ambassador profiles",
    titleIsDescriptive: true,
    date: "2026–2027",
    sort: 2026.07,
    type: "Profile",
    summary: "My page in the ambassadors’ profile collection.",
    href: "https://www.rochester.edu/alumni/wp-content/uploads/2026/07/2026-2027-SAA-Profiles_ALL-compressed.pdf#page=29",
    action: "Open PDF, page 29",
    pdfPage: 29,
    alsoAt: [{ label: "Student Alumni Ambassadors team listing", href: "https://ccc.rochester.edu/saa/leadership-team/" }],
    related: { leadership: ["saa"] },
  },
  {
    id: "eyeradio-eac-essay-2023",
    source: "Eye Radio",
    title: "South Sudanese student among winners of regional essay writing competition",
    date: "November 27, 2023",
    sort: 2023.1127,
    type: "Article mention",
    summary: "An article about the 2022 East African Community essay competition. It profiles another winner and lists me, as Irakoze Sonia of Rwanda, among the other winners.",
    href: "https://eyeradio.org/south-sudanese-student-among-winners-of-regional-essay-writing-competition/",
    action: "Read article",
  },
  {
    id: "tsl-essay-2020",
    source: "Trust for Sustainable Living",
    title: "2020 Essay competition secondary winners",
    date: "2020",
    sort: 2020.06,
    type: "Award listing",
    summary: "Lists me, as IRAKOZE Sonia of FAWE Girls’ School Kigali, with an Honourable Mention in the 2020 secondary essay competition.",
    href: "https://trustforsustainableliving.org/take-part/international-schools-essay-competition-and-debate/winners/2020-essay-competition-secondary-winners",
    action: "View listing",
  },
];

/** Featured entries keep their order in this file (most substantial first). */
export const featuredNews = news.filter((n) => n.featured);
export const otherNews = news.filter((n) => !n.featured).sort((a, b) => b.sort - a.sort);
export const newsFor = (kind: "projects" | "experience" | "leadership", id: string) => news.filter((n) => n.related?.[kind]?.includes(id)).sort((a, b) => b.sort - a.sort);

/**
 * Published papers and writing. Empty on purpose: nothing is shown until a verified citation exists.
 * Example shape: { id, title, venue, date, href, role }
 */
export const publications: { id: string; title: string; venue: string; date: string; href: string; role?: string }[] = [];
