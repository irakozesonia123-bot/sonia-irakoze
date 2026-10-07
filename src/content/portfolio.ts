/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit this file to update the portfolio; no component changes needed.
 *  Search for "[ADD" to find every placeholder that still needs content.
 * ─────────────────────────────────────────────────────────────
 */
import type {
  AboutBlock,
  Award,
  Education,
  Experience,
  JourneyStop,
  Leadership,
  NavItem,
  Profile,
  Project,
  Recommendation,
  SkillGroup,
} from "./types";

export const profile: Profile = {
  name: "Sonia Irakoze",
  shortName: "Sonia",
  pronouns: "she/her",
  role: "Mechanical engineering student who also writes software",
  positioning: "I engineer for the systems people rely on, and I write the software that helps others understand them.",
  intro:
    "Mechanical engineering at the University of Rochester. This summer I worked on bridge data at the Colorado Department of Transportation and built a web tool that CDOT published. In Rwanda, I lead SAquaSolve, a solar-powered water system now in testing and design.",
  location: "Rochester, NY",
  origin: "Kigali, Rwanda",
  status: "Data Research Intern at AGR Sensors · Founder of SAquaSolve Rwanda",
  lookingFor: "Summer 2027 internships and undergraduate research in mechanical, infrastructure, or water systems",
  email: "irakozesonia123@gmail.com",
  links: {
    github: "https://github.com/irakozesonia123-bot",
    linkedin: "https://www.linkedin.com/in/irakoze-sonia",
    resume: "/resume/Sonia_Irakoze_Resume.pdf",
    saquasolve: "https://www.saquasolverwanda.org",
  },
  headshot: { src: "/images/portrait.jpg", alt: "Sonia Irakoze in a pink blazer, smiling" },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sonia-irakoze.vercel.app",
  seoDescription:
    "Sonia Irakoze is a mechanical engineering student at the University of Rochester who builds software too: bridge asset data at CDOT, the CDOT Compass web app, and SAquaSolve, a solar-powered water project in Gashora, Rwanda.",
};

export const nav: NavItem[] = [
  { id: "about", label: "About", station: "01" },
  { id: "experience", label: "Experience", station: "02" },
  { id: "projects", label: "Projects", station: "03" },
  { id: "education", label: "Education", station: "04" },
  { id: "leadership", label: "Leadership", station: "05" },
  { id: "skills", label: "Skills", station: "06" },
  { id: "journey", label: "Journey", station: "07" },
  { id: "recommendations", label: "Recommendations", station: "08" },
  { id: "contact", label: "Contact", station: "09" },
];

export const about: AboutBlock = {
  paragraphs: [
    "I’m from Rwanda. I spent three years as a boarding student at Gashora Girls Academy of Science and Technology in Bugesera, near Lake Mirayi, a lake many nearby residents use even though the water isn’t safe to drink. That gap between having water nearby and having safe water is the problem I keep coming back to.",
    "In 2023 the U.S. State Department’s TechGirls program took me to Virginia Tech for a course on rivers and climate, where I wrote my first Python for data analysis, and then to a two-day job shadow at the Colorado Department of Transportation. I remember thinking I wanted to come back. In 2026 I did, as an engineering intern on the team that tracks Colorado’s 3,500+ bridges.",
    "At the University of Rochester I study mechanical engineering and keep ending up as the person on the team who also writes the software: a web prototype CDOT published for new staff, the website for my own water project, and data checks for an AI crop-disease tool. I like work where the physical system and the information about it both have to be right.",
    "Next I want internships and research where mechanical design meets infrastructure, water, or energy, especially where better tools help engineers make better decisions.",
  ],
  interests: [
    { label: "Singing", detail: "In my church choir, where I also serve as a deaconess" },
    { label: "Rowing", detail: "Women’s rowing team at the University of Rochester" },
    { label: "Shotokan karate", detail: "Since high school at Gashora, now with the UR club" },
    { label: "Writing", detail: "Essay prizes from the East African Community and the Royal Commonwealth Society" },
    { label: "Design", detail: "Journal covers, NSBE branding, and the interfaces I build" },
  ],
  photo: {
    src: "/images/cdot-field-site.jpg",
    alt: "Sonia in a hard hat and high-visibility vest at a Colorado highway construction site",
    caption: "Field visit, CDOT, summer 2026",
  },
};

export const experience: Experience[] = [
  {
    company: "Colorado Department of Transportation",
    team: "Staff Bridge Branch · Bridge Asset Management",
    role: "Engineering Intern",
    location: "Denver, CO",
    start: "May 2026",
    end: "Summer 2026",
    summary: "Bridge inventory, inspection, and clearance data for a statewide inventory of 3,500+ bridges under federal asset-management rules.",
    highlights: [
      "Wrote SQL queries in SQL Server Management Studio against inspection, project, and vertical-clearance databases for analysis and reporting",
      "Reviewed bridge drawings and structural plan sets to identify structures, classify treatment types, and update records to the National Bridge Inventory (SNBI) specifications",
      "Built CDOT Compass, a web app for new staff that CDOT published as a 2026 Lean Everyday Idea",
    ],
    details: [
      "Cross-referenced structure identifiers across SIMSA, OnBase, and OTIS to find and correct discrepancies.",
      "Joined licensed inspectors on bridge inspections and traveled with intern teams to record vertical-clearance measurements.",
      "Visited active construction, including girder erection on the I-70 Floyd Hill project.",
      "Supported by Greene Center summer internship funding.",
    ],
    tech: ["SQL", "SSMS", "SNBI", "OpenRoads Designer", "React", "TypeScript"],
    link: { label: "CDOT Compass idea card", href: "https://docs.google.com/presentation/d/12Ta0FAas_kKpvBQ0F2O1W6uQZGFcWMgNj-wkbhd-SQ0/" },
  },
  {
    company: "AGR Sensors",
    team: "CropSight AI pipeline",
    role: "Data Research Intern",
    location: "Rochester, NY · Remote",
    start: "Jan 2026",
    end: "Present",
    summary: "Building the structured knowledge base behind CropSight, an AI system that diagnoses crop diseases early.",
    highlights: [
      "Audited 250+ document chunks from 22 agricultural reference books to full page coverage with zero schema-validation errors",
      "Catalogued 212 disease and pest entries as ML-ready JSON, checking schema, page ranges, image counts, and scientific names with Python",
      "Kept a multi-contributor Git repository in sync (branching, rebasing, conflict resolution) and synced 600 MB+ of source PDFs with rclone",
    ],
    tech: ["Python", "JSON Schema", "Git", "rclone"],
  },
  {
    company: "Handshake",
    team: "AI Fellowship",
    role: "AI Fellow",
    location: "Remote",
    start: "Jun 2026",
    end: "Present",
    summary: "Creating and reviewing structured task prompts for AI training data on real desktop workflows.",
    highlights: [
      "Write and review task prompts for computer workflows against quality guidelines",
      "Validate labeled data for consistency across the dataset",
    ],
    tech: ["Data labeling", "Prompt review"],
  },
  {
    company: "Ugandan Water Project",
    team: "Development Office · Schwartz Community-Based Internship",
    role: "Development Intern",
    location: "Lima, NY",
    start: "Jun 2025",
    end: "Aug 2025",
    summary: "Fundraising and partner outreach for a nonprofit building clean-water infrastructure in Uganda.",
    highlights: [
      "Contacted 100+ donors and prospective corporate sponsors by phone and email, helping raise $5K+",
      "Cleaned and organized donor-database records",
      "Ran communications for the 3rd Annual UWP Golf Tournament (July 2025)",
    ],
    tech: ["CRM data", "Excel", "Adobe Illustrator", "Canva"],
  },
  {
    company: "University of Rochester River Campus Libraries",
    team: "Open publishing",
    role: "Editorial Assistant Intern",
    location: "Rochester, NY",
    start: "May 2025",
    end: "Aug 2025",
    summary: "Editorial and web work for three UR journals: Blake/An Illustrated Quarterly, InVisible Culture, and Working Papers in the Language Sciences.",
    highlights: [
      "Designed the Summer 2025 cover of Blake/An Illustrated Quarterly (Vol. 59, No. 1)",
      "Created article metadata and reviewed DOI integration",
      "Edited journal stylesheets in HTML and CSS on Open Journal Systems and PubPub",
    ],
    tech: ["HTML/CSS", "OJS", "PubPub", "InDesign"],
  },
  {
    company: "University of Rochester IT Center",
    role: "Level 2 Training Coordinator",
    team: "Promoted from Help Desk Technician (Jan 2025)",
    location: "Rochester, NY",
    start: "Jan 2026",
    end: "Present",
    summary: "Escalated support and training for the student help desk.",
    highlights: [
      "Handle escalated network registration, wired/wireless, NetID/Duo, and malware cases (75+ ServiceNow tickets a week)",
      "Mentor Level 1 staff and help shape the student training program",
    ],
    tech: ["ServiceNow", "Windows", "macOS", "Linux"],
  },
];

export const projects: Project[] = [
  {
    slug: "saquasolve-rwanda",
    title: "SAquaSolve Rwanda",
    tagline: "A solar-powered system to treat lake water and pipe it to community taps in Gashora.",
    year: "2023 – now",
    role: "Founder & Legal Representative",
    status: "in-development",
    statusLabel: "In testing & design · not built",
    featured: true,
    categories: ["Water & Infrastructure", "Mechanical"],
    tech: ["Solar pumping", "Water treatment", "Community engagement", "Systems design"],
    cover: { src: "/images/sq-workshop-hall.jpg", alt: "The SAquaSolve team addressing a full community hall in Gashora" },
    links: [
      { label: "saquasolverwanda.org", href: "https://www.saquasolverwanda.org" },
      { label: "Projects for Peace announcement", href: "https://www.rochester.edu/college/studentfellowships/news-events/projects-for-peace.html" },
    ],
    problem:
      "Lake Mirayi sits beside communities in Gashora, Bugesera, but its water is untreated. Many residents collect from it anyway, despite parasites, bacteria, and the risk of crocodiles. Proximity to water isn’t the same as access to safe water.",
    approach: [
      "Won a $10,000 2026 Davis Projects for Peace grant to start the work.",
      "Held two-day WASH and community workshops in Gashora with Gashora Girls Academy to gather residents’ input before any design decision.",
      "Started water-quality testing and lab analysis of Lake Mirayi with the Rwanda Institute for Conservation Agriculture (RICA).",
      "Developed an initial conceptual layout with engineering support.",
    ],
    architecture: [
      { label: "Source", detail: "Lake Mirayi, under water-quality testing" },
      { label: "Intake", detail: "Screened intake with solar-powered pumping" },
      { label: "Conveyance", detail: "Raw-water line to the plant" },
      { label: "Treatment", detail: "Containerized plant; process chosen from test data" },
      { label: "Storage", detail: "Protected tank to prevent recontamination" },
      { label: "Distribution", detail: "Several community access points from one system" },
    ],
    challenges: [
      "Treatment can’t be chosen responsibly until the source water is measured.",
      "The site is off-grid, so pumping and treatment need solar power.",
      "District and regulatory approvals are required before construction.",
      "I’m a full-time student in Rochester, so the project depends on strong local partners, including our technical lead, a water and sanitation engineer.",
    ],
    outcome: [
      "Done: grant-funded workshops and a conceptual system layout.",
      "Underway: lake water-quality testing with RICA; site and service-area mapping.",
      "Next: detailed engineering, approvals, and a quoted construction budget.",
      "Not started: construction and operation. Nothing has been built yet.",
    ],
    lessons:
      "My grant proposal planned one or two standalone filtration kiosks. After the workshops and test planning, the design became one treatment hub serving several access points, which is easier to monitor and maintain. Letting the data decide the design made the plan slower and more honest.",
    gallery: [
      { src: "/images/sq-workshop-hall.jpg", alt: "Community hall during a SAquaSolve workshop", caption: "Community workshop, Gashora, 2026" },
      { src: "/images/sq-team-presenting.jpg", alt: "Two SAquaSolve team members presenting with a microphone", caption: "Presenting the plan" },
      { src: "/images/sq-workshop-audience.jpg", alt: "Residents seated at a workshop", caption: "Residents’ input shaped the concept" },
      { src: "/images/sq-lake-mirayi.jpg", alt: "Lake Mirayi with reeds in the foreground", caption: "Lake Mirayi, the intended source" },
    ],
  },
  {
    slug: "cdot-compass",
    title: "CDOT Compass",
    tagline: "A web app that maps a large state agency for its newest employees.",
    year: "2026",
    role: "Designer & developer",
    status: "completed",
    statusLabel: "Live prototype · published by CDOT",
    featured: true,
    categories: ["Software", "Design"],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "React Router 7", "Vercel"],
    cover: { src: "/images/compass-dashboard.jpg", alt: "CDOT Compass dashboard with quick actions for exploring divisions, projects, and mentors" },
    links: [
      { label: "Live demo", href: "https://cdot-compass.vercel.app" },
      { label: "GitHub", href: "https://github.com/irakozesonia123-bot/cdot-compass" },
      { label: "CDOT idea card", href: "https://docs.google.com/presentation/d/12Ta0FAas_kKpvBQ0F2O1W6uQZGFcWMgNj-wkbhd-SQ0/" },
    ],
    problem:
      "CDOT is a large organization. As a new intern I kept asking what each division actually does, what projects are underway, and who to talk to. That information existed, but it was scattered.",
    approach: [
      "Designed a dashboard around the questions new staff ask in their first weeks: explore divisions, browse projects, find a mentor, see events.",
      "Built a Compass Guide that asks a few questions and suggests divisions, projects, and people to look at.",
      "Added global search across divisions, projects, and people.",
      "Used AI coding tools, including Claude, to move fast, and gathered feedback from colleagues as I built.",
    ],
    architecture: [
      { label: "Frontend", detail: "React 19 + TypeScript on Vite" },
      { label: "Styling & motion", detail: "Tailwind CSS, Framer Motion" },
      { label: "Routing", detail: "React Router 7" },
      { label: "Data", detail: "Local JSON content, no backend" },
      { label: "Hosting", detail: "Vercel" },
    ],
    challenges: [
      "Turning a complicated org chart into something a first-week intern can navigate.",
      "Keeping it a prototype people could try without internal systems access.",
    ],
    outcome: [
      "Published by CDOT’s Process Improvement office on 2 July 2026 as a Lean Everyday Idea (#BorrowThis).",
      "Entered in the 2026 CDOT Innovation Challenge.",
      "A prototype, not an official CDOT system.",
    ],
    lessons:
      "Improvement doesn’t have to start with the biggest problem in the room. Sometimes it starts with friction you notice in your own first week.",
    gallery: [
      { src: "/images/compass-dashboard.jpg", alt: "Compass dashboard", caption: "Dashboard" },
      { src: "/images/compass-explore.jpg", alt: "Explore Divisions grid with filters", caption: "Explore divisions" },
      { src: "/images/compass-guide.jpg", alt: "Compass Guide onboarding screen", caption: "Compass Guide" },
      { src: "/images/compass-search.jpg", alt: "Global search overlay showing divisions and people", caption: "Global search" },
      { src: "/images/cdot-compass-idea-card.jpg", alt: "CDOT Lean Everyday Ideas card for CDOT Compass", caption: "CDOT’s published idea card" },
    ],
  },
  {
    slug: "saquasolve-website",
    title: "saquasolverwanda.org",
    tagline: "The organization’s full website: pages, blog CMS, contact, newsletter, and donations.",
    year: "2026",
    role: "Designer & developer",
    status: "completed",
    statusLabel: "Live",
    featured: true,
    categories: ["Software", "Design"],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Sanity", "Resend", "Stripe", "Vercel"],
    cover: { src: "/images/saquasolve-site-about.jpg", alt: "SAquaSolve Rwanda website About page" },
    links: [{ label: "Live site", href: "https://www.saquasolverwanda.org" }],
    problem:
      "SAquaSolve needed a credible home for partners, funders, and residents that explains a complex, unfinished project honestly and lets people get in touch or give.",
    approach: [
      "Built the site in Next.js with the App Router: overview, our work, what we do, about, impact, FAQ, partner, donate, media, and legal pages.",
      "Connected Sanity for blog content so posts can be published without code changes.",
      "Added API routes for the contact form and newsletter (Resend) and for donations (Stripe).",
      "Wrote the copy to separate what is done from what is planned, including a system-architecture explainer.",
    ],
    architecture: [
      { label: "Framework", detail: "Next.js 16 App Router, React 19, TypeScript" },
      { label: "Content", detail: "Sanity CMS for the blog; typed site data for pages" },
      { label: "Email", detail: "Resend for contact and newsletter" },
      { label: "Payments", detail: "Stripe for donations" },
      { label: "SEO", detail: "Sitemap, robots, metadata" },
    ],
    challenges: [
      "Writing about infrastructure that isn’t built yet without overstating it.",
      "Handling forms, email, and payments safely in a small project.",
    ],
    outcome: [
      "Live at saquasolverwanda.org.",
      "89 commits in a private repository.",
    ],
    lessons:
      "A website for a real organization is mostly content decisions. The code was the easier part.",
    gallery: [
      { src: "/images/saquasolve-site-about.jpg", alt: "SAquaSolve About page", caption: "About page" },
      { src: "/images/saquasolve-site-programs.jpg", alt: "SAquaSolve What We Do page", caption: "Program areas" },
    ],
  },
  {
    slug: "cropsight-knowledge-base",
    title: "CropSight knowledge base",
    tagline: "Clean, traceable reference data for an AI crop-disease diagnosis system.",
    year: "2026 – now",
    role: "Data Research Intern, AGR Sensors",
    status: "ongoing",
    statusLabel: "Ongoing",
    featured: false,
    categories: ["Data", "Software"],
    tech: ["Python", "JSON Schema", "Git", "rclone"],
    links: [],
    problem:
      "A diagnosis model is only as trustworthy as the reference data behind it. CropSight’s knowledge comes from agricultural reference books that had to be split, checked, and structured.",
    approach: [
      "Audited document chunks from 22 reference books until every page was covered.",
      "Converted 212 disease and pest entries to ML-ready JSON.",
      "Wrote Python checks for schema, page ranges, image counts, and scientific names.",
    ],
    architecture: [
      { label: "Sources", detail: "22 agricultural reference books (PDF)" },
      { label: "Chunks", detail: "250+ audited document chunks" },
      { label: "Entries", detail: "212 disease & pest records" },
      { label: "Validation", detail: "0 schema errors" },
    ],
    challenges: ["Many contributors editing one dataset at once.", "Proprietary work, so no screenshots are shared."],
    outcome: ["Full page coverage with zero schema-validation errors."],
    lessons: "Data quality is mostly careful, repeatable checking. Small validation scripts beat reading every record by eye.",
    gallery: [],
  },
  {
    slug: "cubesat-and-aero-design",
    title: "CubeSat structures & Aero Design glider",
    tagline: "Structural modeling and analysis for a student satellite and a competition glider.",
    year: "2025 – now",
    role: "Structures Team Member (CubeSat) · Design Lead (Aero Design)",
    status: "ongoing",
    statusLabel: "Ongoing",
    featured: false,
    categories: ["Mechanical"],
    tech: ["Siemens NX", "FEA", "Laser cutting", "Prototyping"],
    links: [],
    problem: "Student-built aircraft and spacecraft have to be light and strong at the same time, with tight fit between subsystems.",
    approach: [
      "Model CubeSat frame components in Siemens NX, balancing mass limits against launch-vibration loads.",
      "Coordinate fit and integration questions with the avionics and propulsion teams.",
      "Compared glider wing and tail configurations with FEA and built laser-cut prototypes across 15+ iterations.",
    ],
    challenges: ["Mass versus stiffness trade-offs", "Integrating parts designed by different sub-teams"],
    outcome: ["The Aero Design team reduced airframe weight by about 10%."],
    lessons: "[ADD WHAT YOU LEARNED ON CUBESAT / AERO DESIGN]",
    gallery: [],
  },
  {
    slug: "blake-quarterly-cover",
    title: "Blake Quarterly, Summer 2025 cover",
    tagline: "Cover design for an academic journal on William Blake.",
    year: "2025",
    role: "Editorial Assistant Intern, River Campus Libraries",
    status: "completed",
    statusLabel: "Published",
    featured: false,
    categories: ["Design"],
    tech: ["Adobe InDesign", "Typography"],
    cover: { src: "/images/blake-cover.jpg", alt: "Blake: An Illustrated Quarterly Summer 2025 cover" },
    links: [],
    problem: "The journal needed a cover for Vol. 59, No. 1 that let Blake’s art lead.",
    approach: ["Stacked two Blake paintings and joined them with one translucent band carrying the title, season, and volume."],
    challenges: ["Keeping type readable over detailed artwork."],
    outcome: ["Published as the Summer 2025 cover. Artwork by William Blake; layout and type by me."],
    lessons: "Restraint matters most when the source material is already strong.",
    gallery: [
      { src: "/images/blake-cover.jpg", alt: "Blake Quarterly cover", caption: "Vol. 59, No. 1" },
      { src: "/images/rcl-presentation.jpg", alt: "Sonia with library colleagues at her internship presentation", caption: "End-of-internship presentation" },
    ],
  },
];

export const education: Education[] = [
  {
    school: "University of Rochester",
    credential: "B.S. Mechanical Engineering",
    location: "Rochester, NY",
    start: "Aug 2024",
    end: "Expected May 2028",
    notes: [
      "Alan & Jane Handler Endowed Scholar, the university’s most selective merit scholarship (about 1% of the incoming class)",
      "Kearns Scholar, David T. Kearns Center",
      "Dean’s List, Fall 2024",
    ],
    coursework: ["Thermodynamics", "Engineering Mechanics", "Mechanical Fabrication", "CAD & Engineering Drawing", "Electricity & Magnetism", "Linear Algebra & Differential Equations"],
  },
  {
    school: "TechGirls, U.S. Department of State",
    credential: "Summer exchange · Civil & Environmental Engineering at Virginia Tech",
    location: "Blacksburg, VA · Denver, CO · Washington, DC",
    start: "Jul 2023",
    end: "Aug 2023",
    notes: [
      "40 hours of STEM instruction in the RIVERS course: climate change and rivers, Python data analysis, a flow-velocity lab",
      "Two-day job shadow at the Colorado Department of Transportation",
    ],
  },
  {
    school: "Gashora Girls Academy of Science and Technology",
    credential: "High school diploma · Physics, Chemistry & Mathematics",
    location: "Gashora, Bugesera, Rwanda",
    start: "Sep 2021",
    end: "Jul 2024",
    notes: ["Where SAquaSolve’s first project site is", "Gavel Club, Mathletes, Arts Club, Shotokan karate"],
  },
];

export const awards: Award[] = [
  { title: "Davis Projects for Peace Grant ($10,000)", issuer: "Davis Projects for Peace · University of Rochester", year: "2026", href: "https://www.rochester.edu/college/studentfellowships/news-events/projects-for-peace.html" },
  { title: "Greene Center Summer Internship Funding", issuer: "University of Rochester", year: "2026" },
  { title: "iZone Make It Happen Grant (13 of 28)", issuer: "UR Libraries iZone", year: "2026", note: "For UniBooth" },
  { title: "Schwartz Community-Based Internship Scholar", issuer: "University of Rochester", year: "2025" },
  { title: "Silver Award, Queen’s Commonwealth Essay Competition", issuer: "Royal Commonwealth Society", year: "2023" },
  { title: "3rd Prize, Students’ Essay Writing Competition", issuer: "East African Community", year: "2022", note: "Awarded in Arusha, Tanzania" },
];

export const leadership: Leadership[] = [
  { org: "National Society of Black Engineers, Region 1 Upstate Zone", role: "Publications Chair", start: "May 2026", end: "Present", kind: "Leadership", detail: "Zone visual identity, a shared Canva design system, and promotion for regional conferences." },
  { org: "National Society of Black Engineers, UR Chapter", role: "Senator", start: "Apr 2025", end: "Jun 2026", kind: "Leadership", detail: "Represented the chapter in national meetings and votes; attended conventions in Chicago (2025) and Baltimore (2026)." },
  { org: "UniBooth", role: "Co-founder, COO & CFO", start: "Sep 2025", end: "Present", kind: "Entrepreneurship", detail: "Student startup for campus photobooths. Built the business model and pitch; won an iZone Make It Happen grant." },
  { org: "Center for Advising Services, UR", role: "Peer Advisor", start: "[ADD START DATE]", end: "Present", kind: "Mentorship", detail: "Advising fellow students on academic planning." },
  { org: "[ADD ADMISSIONS OFFICE NAME]", role: "[ADD ADMISSIONS ROLE TITLE]", start: "[ADD DATES]", end: "", kind: "Leadership", detail: "[ADD ONE-LINE DESCRIPTION]" },
  { org: "UR Office of Alumni Relations", role: "Student Alumni Ambassador", start: "Mar 2025", end: "Present", kind: "Leadership", detail: "Alumni events including Meliora Weekend, campus visits, and student–alumni connections." },
  { org: "UR International Services Office", role: "International Student Mentor", start: "Aug 2025", end: "Present", kind: "Mentorship", detail: "One-on-one mentoring and workshops for new international students." },
  { org: "TechGirls Alumnae Advisory Council", role: "Core Council Member", start: "2024", end: "2025", kind: "Leadership", detail: "Community Building Committee (2024), Programming Committee (2025); ran an info session for students at Gashora Girls Academy." },
  { org: "NextGen4All", role: "College-access Mentor", start: "Oct 2024", end: "Present", kind: "Volunteering", detail: "Helping high school students in Rwanda through college applications." },
  { org: "Boys & Girls Club, Rochester", role: "Tutor & Mentor", start: "Feb 2025", end: "Present", kind: "Volunteering", detail: "Tutoring elementary and high school students." },
];

export const skills: SkillGroup[] = [
  { title: "Mechanical design & analysis", items: ["Siemens NX", "Fusion 360", "FEA", "GD&T", "Engineering drawings", "OpenRoads Designer (intro)"] },
  { title: "Fabrication", items: ["Lathe", "Knee mill", "Drill press", "Sheet metal", "3D printing", "Laser cutting"] },
  { title: "Languages", items: ["TypeScript", "Python", "SQL", "MATLAB", "HTML/CSS", "Java"] },
  { title: "Frontend & web", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite", "React Router"] },
  { title: "Backend, data & services", items: ["SQL Server (SSMS)", "JSON Schema", "Sanity CMS", "Resend", "Stripe"] },
  { title: "Tools", items: ["Git & GitHub", "Vercel", "rclone", "ServiceNow", "Claude (AI-assisted coding)"] },
  { title: "Infrastructure & standards", items: ["National Bridge Inventory (SNBI)", "Bridge asset data", "WASH program design"] },
  { title: "Design", items: ["Adobe InDesign", "Illustrator", "Figma", "Canva"] },
];

export const journey: JourneyStop[] = [
  { station: "0+00", date: "Jan 2019", place: "Kigali", title: "First STEM camp and robotics competition", detail: "A STEM mentoring camp at FAWE Girls School and a coding and robotics competition at Kigali Public Library." },
  { station: "1+00", date: "Sep 2021", place: "Gashora", title: "Boarding school by Lake Mirayi", detail: "Three years at Gashora Girls Academy, studying physics, chemistry, and math." },
  { station: "2+00", date: "2022", place: "Arusha", title: "Essay prize from the East African Community", detail: "3rd prize representing Rwanda, awarded by the region’s heads of state." },
  { station: "3+00", date: "Jul 2023", place: "Virginia · Denver", title: "TechGirls and a two-day job shadow at CDOT", detail: "First Python, first river-flow lab, and a quiet wish to come back to CDOT one day.", milestone: true },
  { station: "3+50", date: "Aug 2023", place: "Gashora", title: "Founded SAquaSolve", detail: "Started work on safe water for the community around Lake Mirayi." },
  { station: "4+00", date: "Aug 2024", place: "Rochester", title: "University of Rochester, Handler Scholar", detail: "Started mechanical engineering." },
  { station: "5+00", date: "Summer 2025", place: "Rochester", title: "Two internships: water fundraising and open publishing", detail: "Ugandan Water Project and River Campus Libraries; designed a journal cover." },
  { station: "6+00", date: "Jan 2026", place: "Rochester", title: "Data research at AGR Sensors, and a promotion", detail: "Started on CropSight’s knowledge base; promoted to Level 2 at the IT Center." },
  { station: "7+00", date: "Apr 2026", place: "Rochester", title: "$10,000 Projects for Peace grant", detail: "Funding for SAquaSolve’s 2026 work in Gashora.", milestone: true },
  { station: "8+00", date: "May 2026", place: "Denver", title: "Back at CDOT, this time as an intern", detail: "Bridge data, field inspections, and CDOT Compass, published in July.", milestone: true },
  { station: "9+00", date: "2026", place: "Gashora", title: "Workshops done, water testing underway", detail: "Community workshops completed; Lake Mirayi testing with RICA." },
  { station: "10+00", date: "Next", place: "?", title: "Summer 2027", detail: "Looking for an internship or research role in mechanical, infrastructure, or water systems." },
];

export const recommendations: Recommendation[] = [
  {
    name: "David Beyerlein",
    role: "Development Professional",
    relationship: "Managed Sonia directly at the Ugandan Water Project",
    date: "Nov 2025",
    quote:
      "Sonia was an exceptional addition to our team. She is hard-working, reliable, and self-motivated; striking a great balance between taking initiative and asking thoughtful, clarifying questions when needed. One standout was her outreach initiative to prospective partner organizations. Sonia led the effort with confidence.",
    source: { label: "LinkedIn", href: "https://www.linkedin.com/in/irakoze-sonia/details/recommendations/" },
  },
  {
    name: "Tanner Hoffman",
    role: "Director of Program & Operations, Ugandan Water Project",
    relationship: "Worked with Sonia on a different team",
    date: "Sep 2025",
    quote:
      "Sonia approached every challenge from researching and engaging new corporate partners to managing communications for our golf tournament with energy and purpose. Her work was consistently thorough, high-quality, and impactful.",
    source: { label: "LinkedIn", href: "https://www.linkedin.com/in/irakoze-sonia/details/recommendations/" },
  },
  {
    name: "Kyle Taylor",
    role: "Director of Development, Ugandan Water Project",
    relationship: "Senior colleague at the Ugandan Water Project",
    date: "Sep 2025",
    quote:
      "She made a remarkable impact in a short time. She is hardworking, detail-oriented, and resourceful—qualities that showed up consistently across projects ranging from donor engagement and data cleaning to securing corporate sponsorships.",
    source: { label: "LinkedIn", href: "https://www.linkedin.com/in/irakoze-sonia/details/recommendations/" },
  },
  {
    name: "Kristen Totleben",
    role: "Open Publishing Librarian, UR Libraries",
    relationship: "Supervised Sonia’s 2025 editorial internship",
    date: "Aug 2025",
    quote: "Sonia’s work with UR-based publications was detail-oriented and excellent. Great work, Sonia!",
  },
  {
    name: "[ADD RECOMMENDER NAME]",
    role: "[ADD ROLE, e.g. CDOT Bridge Asset Management]",
    relationship: "[ADD RELATIONSHIP]",
    date: "[ADD DATE]",
    quote: "[ADD RECOMMENDATION — a CDOT supervisor or engineering faculty member would round this out.]",
    placeholder: true,
  },
];
