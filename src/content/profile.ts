import type { Education, NavItem, SkillGroup } from "./types";

export const profile = {
  name: "Sonia Irakoze",
  pronouns: "she/her",
  program: "Mechanical Engineering",
  school: "University of Rochester",
  classOf: "Class of 2028",
  intro:
    "Born and raised in Kigali, Rwanda, I’m a mechanical engineering student at the University of Rochester, founder of SAquaSolve Rwanda, and an artist. Engineering, creativity, faith, and service shape how I approach my work and the life I’m building. Thank you for being here. I’m excited to share my work with you.",
  location: "Rochester, NY",
  origin: "Kigali, Rwanda",
  lookingFor:
    "I’m looking for summer 2027 internships and undergraduate research in mechanical design, infrastructure, aerospace, and water systems.",
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
    "Sonia Irakoze is a Mechanical Engineering student at the University of Rochester (Class of 2028) from Kigali, Rwanda. Founder of SAquaSolve Rwanda, builder of CDOT Compass, and member of Aero Design and UR CubeSat.",
};

export const nav: NavItem[] = [
  { href: "/work", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export const education: Education[] = [
  {
    school: "University of Rochester",
    credential: "B.S. Mechanical Engineering, Hajim School of Engineering & Applied Sciences",
    location: "Rochester, NY",
    start: "Aug 2024",
    end: "Expected May 2028",
    notes: [
      "Alan & Jane Handler Endowed Scholarship, the university’s top merit award (about 1% of the incoming class)",
      "Kearns Scholar, David T. Kearns Center",
      "Dean’s List, Fall 2024",
    ],
    coursework: ["Thermodynamics", "Engineering Mechanics", "Mechanical Fabrication", "CAD & Engineering Drawing", "Electricity & Magnetism", "The Engineering of Bridges", "Intro to Computer Science (Java)", "Intro to Web Development"],
  },
  {
    school: "Gashora Girls Academy of Science and Technology",
    credential: "High school diploma, Physics, Chemistry & Mathematics",
    location: "Gashora, Bugesera, Rwanda",
    start: "Sep 2021",
    end: "Jul 2024",
    notes: ["Three years as a boarding student beside Lake Mirayi, where SAquaSolve began"],
  },
];

export const skills: SkillGroup[] = [
  { title: "Mechanical design & analysis", items: ["Siemens NX", "Fusion 360", "FEA", "GD&T", "Engineering drawings", "Dr.Frame", "OpenRoads Designer", "ProjectWise"], seenIn: [{ label: "Aero Design", href: "/work/aero-design" }, { label: "CubeSat", href: "/work/cubesat-structures" }, { label: "Timber truss", href: "/work/timber-truss-bridge" }, { label: "CDOT bridge work", href: "/work/cdot-bridge-asset-management" }] },
  { title: "Fabrication", items: ["Lathe", "Knee mill", "Drill press", "Sheet metal", "3D printing", "Laser cutting"], seenIn: [{ label: "Aero Design prototypes", href: "/work/aero-design" }] },
  { title: "Software & data", items: ["Python", "SQL (SSMS)", "MATLAB", "TypeScript", "React", "Next.js", "Java", "Git", "JSON Schema"], seenIn: [{ label: "CDOT Compass", href: "/work/cdot-compass" }, { label: "CropSight", href: "/work/cropsight-knowledge-base" }, { label: "saquasolverwanda.org", href: "/work/saquasolve-website" }] },
  { title: "Design & communication", items: ["Adobe InDesign", "Illustrator", "Figma", "Canva", "Grant writing", "Technical reports"], seenIn: [{ label: "Blake Quarterly cover", href: "/work/blake-quarterly-cover" }, { label: "SAquaSolve", href: "/work/saquasolve-rwanda" }] },
  { title: "Languages", items: ["Kinyarwanda (native)", "English (fluent)", "French (intermediate)"] },
];
