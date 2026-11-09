import type { Figure } from "./types";

/**
 * Everything on "Beyond the blueprint" (/about/beyond). All of it is editable here.
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

/** The browsable art stack. Add paintings as you send them; slots stay off the live site. */
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
    title: "Another painting",
    note: "Title, year, and medium.",
    src: "/images/beyond/painting-2.jpg",
    alt: "Another of Sonia’s paintings",
    fit: "contain",
    tag: "My work",
    want: "A second painting or sketch.",
    visibility: "slot",
  },
];

/** The photo strip: movement and music. `hue` colors the illustrated stand-in. */
export const strip: { id: string; label: string; line: string; hue: "rose" | "lav" | "sky"; figure: Figure }[] = [
  {
    id: "rowing",
    label: "Rowing",
    line: "Early mornings and moving in time with a crew. Something hard I chose to take on at Rochester.",
    hue: "sky",
    figure: { src: "/images/beyond/rowing.jpg", alt: "Sonia rowing", want: "A rowing photo: on the water, the boathouse, or with your crew." },
  },
  {
    id: "karate",
    label: "Shotokan karate",
    line: "Something I started in high school at Gashora.",
    hue: "rose",
    figure: { src: "/images/beyond/karate.jpg", alt: "Sonia in a karate gi", want: "A karate photo (training, a kata, or your belt)." },
  },
  {
    id: "choir",
    label: "Singing",
    line: "I sing in my church choir, where I also serve as a deaconess.",
    hue: "lav",
    figure: { src: "/images/beyond/choir.jpg", alt: "Sonia singing with her church choir", want: "A choir photo, with the choir’s permission." },
  },
];

/** The notebook: reading and writing. Leave `reading` empty until you choose what to share. */
export const notebook = {
  writing: "Essays took me further than I expected: to Arusha for the East African Community prize, and to a Silver Award in the Queen’s Commonwealth Essay Competition. Now most of my writing is grant proposals and technical reports.",
  reading: [] as { title: string; author: string; note?: string }[],
};

/** Expandable notes on Rwanda and mentoring. */
export const notes: { id: string; title: string; body: string; figure?: Figure }[] = [
  {
    id: "mentoring",
    title: "Mentoring, and staying connected to home",
    body: "Two months after TechGirls, I went back to Gashora Girls Academy to walk younger students through the application. Since 2024 I have mentored high school students in Rwanda through their university applications with NextGen4All.",
    figure: { src: "/images/techgirls-info-session.jpg", alt: "Sonia speaking to a room of students at Gashora Girls Academy", caption: "TechGirls info session, Gashora, October 2023.", tag: "Event", pos: "60% 40%" },
  },
];

/** An example day: not a fixed routine. Edit freely. */
export const day: { when: string; title: string; body: string; icon: "sunrise" | "book" | "laptop" | "wrench" | "moon" }[] = [
  { when: "Early", title: "Practice", body: "An early start, before the day fills up.", icon: "sunrise" },
  { when: "Morning", title: "Engineering classes", body: "Mechanics, design, and the problem sets that come with them.", icon: "book" },
  { when: "Afternoon", title: "IT Center shift", body: "Helping students and staff fix what’s broken, and logging it in Jira.", icon: "laptop" },
  { when: "Evening", title: "Building", body: "SAquaSolve planning, Aero Design CAD, or a website to finish.", icon: "wrench" },
  { when: "Night", title: "Recharge", body: "Choir practice, a painting, or a call home.", icon: "moon" },
];
