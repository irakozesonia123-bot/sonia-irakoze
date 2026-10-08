import type { Education, NavItem, Profile, SkillGroup } from "./types";

export const profile: Profile = {
  name: "Sonia Irakoze",
  pronouns: "she/her",
  descriptor: "Mechanical Engineering student · University of Rochester ’28",
  builderLine: "Building across physical and digital systems",
  positioning:
    "Satellite and aircraft structures at Rochester, bridge records checked against the field in Colorado, a solar-powered water system in development in Rwanda, and the web tools in between.",
  intro:
    "Mechanical engineering is the core. This summer I interned on the Colorado Department of Transportation’s bridge asset management team and built a web tool CDOT published. Now I’m a data research intern at AGR Sensors, a structures member on UR CubeSat and design lead on Aero Design, and President & Legal Representative of SAquaSolve Rwanda, which is developing a community water system for Lake Mirayi.",
  location: "Rochester, NY",
  origin: "Kigali, Rwanda",
  coordinates: "43.1566° N, 77.6088° W",
  now: [
    "Structures, UR CubeSat · Design Lead, Aero Design",
    "Data Research Intern, AGR Sensors",
    "President & Legal Representative, SAquaSolve Rwanda",
  ],
  lookingFor: "Summer 2027 internships and undergraduate research in mechanical, infrastructure, aerospace, or water systems",
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
    "Sonia Irakoze is a Mechanical Engineering student at the University of Rochester who builds across physical and digital systems: CubeSat and Aero Design structures, bridge asset data at the Colorado Department of Transportation, CDOT Compass, CropSight at AGR Sensors, and SAquaSolve Rwanda, which is developing a solar-powered community water system.",
};

/** Sheet numbers follow an engineering drawing set. */
export const nav: NavItem[] = [
  { href: "/work", label: "Work", sheet: "S-02", blurb: "Selected projects and the full archive" },
  { href: "/workbench", label: "Workbench", sheet: "S-03", blurb: "Games, models, drawings, and experiments" },
  { href: "/experience", label: "Experience", sheet: "S-04", blurb: "Internships, campus work, and leadership" },
  { href: "/journey", label: "Journey", sheet: "S-05", blurb: "Turning points, and a map of where they happened" },
  { href: "/field-notes", label: "Field Notes", sheet: "S-06", blurb: "Conferences, talks, and programs" },
  { href: "/recognition", label: "Recognition", sheet: "S-07", blurb: "Grants, scholarships, and awards, with context" },
  { href: "/on-the-record", label: "On the Record", sheet: "S-08", blurb: "Published work and public features" },
  { href: "/about", label: "About", sheet: "S-09", blurb: "The person behind the field book" },
];

export const education: Education[] = [
  {
    school: "University of Rochester",
    credential: "B.S. Mechanical Engineering",
    location: "Rochester, NY",
    start: "Aug 2024",
    end: "Expected May 2028",
    notes: [
      "Alan & Jane Handler Endowed Scholar",
      "Kearns Scholar, David T. Kearns Center",
      "Dean’s List, Fall 2024",
    ],
    coursework: ["Thermodynamics", "Engineering Mechanics", "Mechanical Fabrication", "CAD & Engineering Drawing", "Electricity & Magnetism", "The Engineering of Bridges", "Introduction to Computer Science (Java)", "Introduction to Web Development"],
  },
  {
    school: "Gashora Girls Academy of Science and Technology",
    credential: "High school diploma · Physics, Chemistry & Mathematics",
    location: "Gashora, Bugesera, Rwanda",
    start: "Sep 2021",
    end: "Jul 2024",
    notes: ["Three years beside Lake Mirayi, where SAquaSolve began"],
  },
];

export const skills: SkillGroup[] = [
  { title: "Mechanical design & analysis", items: ["Siemens NX", "Fusion 360", "Dr.Frame", "FEA", "GD&T", "Engineering drawings", "OpenRoads Designer (intro)"] },
  { title: "Fabrication & lab", items: ["Lathe", "Knee mill", "Drill press", "Sheet metal", "3D printing", "Laser cutting", "Flume measurement (ADV)"] },
  { title: "Languages", items: ["TypeScript", "Python", "Java", "SQL", "MATLAB", "HTML/CSS"] },
  { title: "Web & software", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Vite", "Sanity", "Stripe", "Resend"] },
  { title: "Data", items: ["SQL Server (SSMS)", "JSON Schema", "Git", "rclone", "Excel"] },
  { title: "Infrastructure", items: ["National Bridge Inventory (SNBI)", "Bridge asset data", "Plan-set review", "WASH program design"] },
  { title: "Design", items: ["Adobe InDesign", "Illustrator", "Figma", "Canva"] },
];
