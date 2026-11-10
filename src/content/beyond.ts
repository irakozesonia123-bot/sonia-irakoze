import type { Figure } from "./types";

/**
 * Everything on "Outside work" (/about/beyond). All of it is editable here.
 * Items with a `src` that doesn't exist yet show as photo slots on local/preview builds and
 * as a small illustration (never an empty box) on the live site.
 */

export const eagle = {
  line: "An eagle of excellence, always becoming.",
  body: [
    "The eagle reminds me of who I am working to become: someone with clear vision, who can see the whole picture, who cares about the people the work is for, and who acts with purpose.",
    "It also reminds me that excellence is never finished. I keep learning, and when something doesn’t work, I begin again.",
  ],
  verse: {
    text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    cite: "Isaiah 40:31",
    translation: "NIV",
  },
};

export type Artwork = Figure & { title: string; note: string; visibility: "public" | "slot" };

/** The art collection: painting, sketching, and design. Slots stay off the live site. */
export const artworks: Artwork[] = [
  {
    title: "Blake Quarterly cover",
    note: "Summer 2025 cover of Blake/An Illustrated Quarterly. The artwork is William Blake’s; the layout and type are mine.",
    src: "/images/blake-cover.jpg",
    alt: "Cover of Blake/An Illustrated Quarterly, Summer 2025, with a William Blake illustration",
    fit: "contain",
    tag: "My work",
    visibility: "public",
  },
  {
    title: "A painting",
    note: "Title, year, and medium.",
    src: "/images/beyond/painting-1.jpg",
    alt: "One of Sonia’s paintings",
    fit: "contain",
    tag: "My work",
    want: "A photo of a painting, shot straight on in daylight.",
    visibility: "slot",
  },
  {
    title: "A sketch",
    note: "Title, year, and medium.",
    src: "/images/beyond/sketch-1.jpg",
    alt: "One of Sonia’s sketches",
    fit: "contain",
    tag: "My work",
    want: "A scan or photo of a sketch.",
    visibility: "slot",
  },
];

/** Rowing, karate, and dance: annotated photographs, each with Sonia’s own words. */
export const movement: { id: string; label: string; line?: string; hue: "rose" | "lav" | "sky"; figure: Figure }[] = [
  {
    id: "rowing",
    label: "Rowing",
    line: "I joined Rochester’s women’s rowing team as a novice. Early practices have become a different way to start my day, learning something new alongside a crew. I’m still building strength and technique, and I enjoy having a challenge that takes me outside the classroom.",
    hue: "sky",
    figure: { src: "/images/beyond/rowing.jpg", alt: "Sonia rowing", want: "A rowing photo: on the water, the boathouse, or with your crew." },
  },
  {
    id: "karate",
    label: "Shotokan karate",
    line: "I started Shotokan karate at Gashora Girls Academy and continued at Rochester. I enjoy having something to work on that asks for a different kind of focus: paying attention to my stance, repeating a movement, and improving it through practice.",
    hue: "rose",
    figure: { src: "/images/beyond/karate.jpg", alt: "Sonia in a karate gi", want: "A karate photo: training, a kata, or your gi." },
  },
  {
    id: "dance",
    label: "Dance and Rwandan culture",
    line: "Being Rwandan is part of how I express myself, including through dance. I love the grace of Rwandan dance and the energy of Afrobeat. They give a different side of me room to show up, beyond classes, projects, and the responsibilities I take on.",
    hue: "lav",
    figure: { src: "/images/beyond/dance.jpg", alt: "Sonia dancing", want: "A dance photo, ideally Rwandan dance or a cultural event." },
  },
];

/** Singing and faith. */
export const music = {
  line: "I sing in my church choir, where I also serve as a deaconess.",
  figure: { src: "/images/beyond/choir.jpg", alt: "Sonia singing with her church choir", want: "A choir photo, with the choir’s permission." } as Figure,
};

/** Words: writing and speaking. Leave `reading` empty until you choose what to share. */
export const words = {
  writing: "Essays took me further than I expected. One brought me to Arusha for the East African Community essay prize; another earned a Silver Award in the Queen’s Commonwealth Essay Competition. These days, most of my writing is grant proposals and technical reports.",
  speaking: [
    { when: "2022", text: "Named “Miss Creativity” for the most creative speech at an inter-club competition, with the Gashora Girls Academy Gavel Club." },
    { when: "2023", text: "Gave the TechGirls information session at Gashora Girls Academy, two months after the exchange." },
    { when: "2026", text: "Presented the problem and market slides in MarketBite’s Heist Hackathon pitch." },
  ],
  speakingFigure: { src: "/images/techgirls-info-session.jpg", alt: "Sonia speaking to a room of students at Gashora Girls Academy", caption: "TechGirls information session, Gashora, October 2023.", tag: "Event", pos: "60% 40%" } as Figure,
  reading: [] as { title: string; author: string; note?: string }[],
};

/** Service. Historical items stay historical; add Shoes For Love and SOS tutoring once described. */
export const service: { when: string; text: string; href?: string }[] = [
  { when: "2023", text: "Water-education workshops in Gashora through my TechGirls Community Action Project, reaching 300+ residents.", href: "/work/techgirls-community-action-project" },
  { when: "2024 –", text: "College-access mentoring for high school students in Rwanda with NextGen4All." },
  { when: "2025 –", text: "Math and science tutoring at the Boys & Girls Club of Rochester, and mentoring new international students." },
  { when: "2026 –", text: "Founding SAquaSolve Rwanda, including its Youth Ambassador program.", href: "/work/saquasolve-rwanda" },
];
/** An example day: not a fixed routine. Edit freely. */
export const day: { when: string; title: string; body: string; icon: "sunrise" | "book" | "laptop" | "wrench" | "moon" }[] = [
  { when: "Early", title: "Rowing practice", body: "On the water with my crew before the day fills up.", icon: "sunrise" },
  { when: "Morning", title: "Engineering classes", body: "Mechanics, design, and the problem sets that come with them.", icon: "book" },
  { when: "Afternoon", title: "IT Center shift", body: "Helping students and staff fix what’s broken, and logging it in Jira.", icon: "laptop" },
  { when: "Evening", title: "Building", body: "SAquaSolve planning, CubeSat frame models, or an engineering assignment due that week.", icon: "wrench" },
  { when: "Night", title: "Recharge", body: "Choir practice, a painting, or a call home.", icon: "moon" },
];
