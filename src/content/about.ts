import type { EventNote, Feature, Figure, Recognition } from "./types";

/**
 * Everything on the About page: story, values, places, recognition, events, and media. Personal interests live in beyond.ts.
 * Items with visibility "slot" are empty spaces for new photos; they show on local and
 * preview builds only. Fill one by saving the photo at its `src` and switching it to "public".
 */

export const story = [
  "I was born and raised in Kigali, Rwanda, and spent my secondary-school years at Gashora Girls Academy, a boarding school beside Lake Mirayi. Many of our neighbors collected drinking water from that lake even though it wasn’t safe to drink. That gap between having water nearby and having safe water is the problem I keep coming back to.",
  "Writing and speaking opened doors early: an essay prize took me to Arusha to represent Rwanda, and the TechGirls exchange brought me to the United States in 2023. Since 2024 I have studied mechanical engineering at the University of Rochester as a Handler Scholar.",
  "Outside class, I serve in several communities, from NSBE to the students I mentor in Rwanda, and I make room for art, music, and faith. My roles are on Experience, my work is on Projects, and the rest is in Beyond the blueprint.",
];

/** What shapes how I work: four short pointers, each to where the detail lives. */
export const values: { title: string; text: string; href: string; link: string; hue: "rose" | "lav" | "sky" }[] = [
  { title: "Engineering", text: "Aircraft and satellite structures at Rochester, and bridge plans, data, and a recognized tool at CDOT.", href: "/work", link: "Projects", hue: "sky" },
  { title: "Creativity", text: "Painting, sketching, and design, including a published journal cover.", href: "/about/beyond#art", link: "Art", hue: "rose" },
  { title: "Faith", text: "Choir, my role as a deaconess, and the eagle I keep in mind.", href: "/about/beyond#faith", link: "Singing and faith", hue: "lav" },
  { title: "Service", text: "From community workshops in Gashora to mentoring students in Rwanda and Rochester.", href: "/about/beyond#service", link: "Service", hue: "sky" },
];


export const recognition: Recognition[] = [
  {
    id: "p4p",
    title: "Davis Projects for Peace grant",
    issuer: "Davis Projects for Peace",
    year: "2026",
    sort: 2026.04,
    why: "$10,000 for SAquaSolve Rwanda. One of two University of Rochester students funded in 2026.",
    href: "/work/saquasolve-rwanda",
    figure: { src: "/images/projects-for-peace-grantee.jpg", alt: "Projects for Peace 2026 grantee graphic with Sonia’s portrait", tag: "Award", fit: "contain" },
    visibility: "public",
  },
  {
    id: "compass",
    title: "Outstanding AI Improvement, Headquarters Division Winner",
    issuer: "2026 CDOT Innovations Challenge",
    year: "2026",
    sort: 2026.08,
    why: "For CDOT Compass, the onboarding tool I built as an intern.",
    href: "/work/cdot-compass",
    figure: { src: "/images/compass/innovation-award.jpg", alt: "CDOT Innovations Challenge award for CDOT Compass", tag: "Award", fit: "contain", want: "Award certificate or ceremony photo." },
    visibility: "public",
  },
  {
    id: "heist",
    title: "Best Entrepreneurial Vision, Ain Center Special Award",
    issuer: "Heist Hackathon, University of Rochester",
    year: "2026",
    sort: 2026.10,
    why: "Team award for MarketBite.",
    href: "/work/marketbite",
    figure: { src: "/images/marketbite/award.jpg", alt: "Team MarketBite with the Best Entrepreneurial Vision award", tag: "Award", want: "Award photo or certificate." },
    visibility: "public",
  },
  {
    id: "handler",
    title: "Alan & Jane Handler Endowed Scholarship",
    issuer: "University of Rochester",
    year: "2024",
    sort: 2024.03,
    why: "The university’s top merit scholarship, offered to about 1% of the incoming class.",
    visibility: "public",
  },
  {
    id: "techgirls",
    title: "TechGirls exchange",
    issuer: "U.S. Department of State",
    year: "2023",
    sort: 2023.07,
    why: "One of three students selected from Rwanda, and 125 worldwide.",
    figure: { src: "/images/cert-techgirls-2023.jpg", alt: "TechGirls 2023 certificate of completion", tag: "Award", fit: "contain" },
    visibility: "public",
  },
  {
    id: "eac",
    title: "3rd Prize, East African Community Students’ Essay Competition",
    issuer: "East African Community",
    year: "2022, received 2023",
    sort: 2022.06,
    why: "Represented Rwanda. I received the prize at an EAC event in Arusha, Tanzania.",
    figure: { src: "/images/eac-award-2.jpg", alt: "Sonia receiving her East African Community essay prize in Arusha", tag: "Award", pos: "70% 35%" },
    visibility: "public",
  },
  {
    id: "qcec",
    title: "Silver Award, Queen’s Commonwealth Essay Competition",
    issuer: "Royal Commonwealth Society",
    year: "2023",
    sort: 2023.06,
    why: "Awarded on the recommendation of the society’s judging panels.",
    figure: { src: "/images/cert-qcec-2023.jpg", alt: "Queen’s Commonwealth Essay Competition 2023 Silver Award certificate", tag: "Award", fit: "contain" },
    visibility: "public",
  },
  {
    id: "izone",
    title: "iZone Make It Happen grant",
    issuer: "Barbara J. Burger iZone, University of Rochester",
    year: "2026",
    sort: 2026.02,
    why: "For UniBooth; one of 13 winners from 28 applicants.",
    href: "/work/unibooth",
    visibility: "public",
  },
];

export const events: EventNote[] = [
  {
    id: "heist-2026",
    title: "Heist Hackathon",
    place: "Rochester, NY",
    date: "Oct 2026",
    sort: 2026.10,
    role: "Team MarketBite",
    note: "A weekend building MarketBite with four teammates; we won Best Entrepreneurial Vision.",
    figure: { src: "/images/marketbite/pitch.jpg", alt: "Sonia presenting at the Heist Hackathon", tag: "Event", want: "A photo from the Heist." },
    links: [{ label: "MarketBite", href: "/work/marketbite" }],
    visibility: "public",
  },
  {
    id: "saquasolve-workshops",
    title: "SAquaSolve community workshops",
    place: "Gashora, Rwanda",
    date: "Aug 2026",
    sort: 2026.08,
    role: "Organizer and co-facilitator",
    note: "Two days with 53 people from Gashora Sector on safe water, sanitation, and hygiene. Half the point was listening.",
    figure: { src: "/images/sq-ws-presenting.jpg", alt: "A SAquaSolve team member presenting at the community workshop", tag: "Event" },
    links: [{ label: "SAquaSolve", href: "/work/saquasolve-rwanda" }],
    visibility: "public",
  },
  {
    id: "worlddenver-2026",
    title: "International Career Connections panel",
    place: "WorldDenver, Denver",
    date: "May 2026",
    sort: 2026.05,
    role: "Attendee",
    note: "A panel on international careers in aerospace, diplomacy, and community development. The lesson: there isn’t one blueprint.",
    figure: { src: "/images/worlddenver-panel.jpg", alt: "Panelists speaking to an audience at the WorldDenver event", tag: "Event" },
    links: [{ label: "Reflection", href: "https://www.linkedin.com/feed/update/urn:li:activity:7476393666383740930/" }],
    visibility: "public",
  },
  {
    id: "nsbe-2026",
    title: "NSBE Annual Convention",
    place: "Baltimore, MD",
    date: "Mar 2026",
    sort: 2026.03,
    role: "Chapter Senator",
    note: "My first convention as the chapter’s elected Senator, representing the University of Rochester.",
    figure: { src: "/images/nsbe-baltimore-chapter.jpg", alt: "University of Rochester NSBE members at the 2026 convention", tag: "Event" },
    links: [{ label: "Reflection", href: "https://www.linkedin.com/feed/update/urn:li:activity:7441981882608734208/" }],
    visibility: "public",
  },
  {
    id: "nsbe-frc-2025",
    title: "NSBE Fall Regional Conference",
    place: "Albany, NY",
    date: "Nov 2025",
    sort: 2025.11,
    role: "Chapter Senator",
    note: "Workshops, networking, and the regional side of NSBE that I later joined as Publications Chair.",
    figure: { src: "/images/nsbe-albany.jpg", alt: "Sonia smiling in a blazer at the NSBE Fall Regional Conference", tag: "Event", pos: "50% 25%" },
    visibility: "public",
  },
  {
    id: "nsbe-2025",
    title: "NSBE 50th Annual Convention",
    place: "Chicago, IL",
    date: "Mar 2025",
    sort: 2025.03,
    role: "First convention",
    note: "Meeting Rwandan engineers there, including a fellow Gashora alumna, helped me commit to my major.",
    figure: { src: "/images/nsbe-chicago-2025.jpg", alt: "Sonia and a friend in front of the NSBE 50th anniversary backdrop", tag: "Event", pos: "50% 30%" },
    links: [{ label: "Reflection", href: "https://www.linkedin.com/feed/update/urn:li:activity:7311955307604197376/" }],
    visibility: "public",
  },
  {
    id: "techgirls-talk",
    title: "TechGirls info session",
    place: "Gashora Girls Academy",
    date: "Oct 2023",
    sort: 2023.10,
    role: "Speaker",
    note: "Back at my school two months after the exchange, walking younger students through how to apply.",
    figure: { src: "/images/techgirls-info-session.jpg", alt: "Sonia speaking to a room of students", tag: "Event", pos: "60% 40%" },
    visibility: "public",
  },
];

export const features: Feature[] = [
  { id: "ur-p4p", outlet: "University of Rochester", headline: "2026 Projects for Peace recipients", date: "2026", sort: 2026.05, href: "https://www.rochester.edu/college/studentfellowships/news-events/projects-for-peace.html", visibility: "public" },
  { id: "p4p-reading-room", outlet: "Davis Projects for Peace", headline: "Reading Room listing for SAquaSolve", date: "Jul 2026", sort: 2026.07, href: "https://www.middlebury.edu/projects-peace/congratulations-our-most-recent-university-rochester-projects-peace-recipients", visibility: "public" },
  { id: "cdot-lean", outlet: "CDOT Lean Everyday Ideas", headline: "CDOT Compass", date: "Jul 2026", sort: 2026.07, href: "https://docs.google.com/presentation/d/12Ta0FAas_kKpvBQ0F2O1W6uQZGFcWMgNj-wkbhd-SQ0/", visibility: "public" },
  { id: "worlddenver", outlet: "WorldDenver", headline: "2023 TechGirls participant returns to Denver", date: "Jun 2026", sort: 2026.06, href: "https://www.instagram.com/p/DZdOJtYE6Up/", visibility: "public" },
];


export type Place = {
  id: string;
  name: string;
  region: "east-africa" | "us";
  lon: number;
  lat: number;
  when: string;
  text: string;
  figure?: Figure;
  link?: { label: string; href: string };
  /** Display-only offset in % so neighboring pins (Kigali and Gashora) don’t overlap */
  nudge?: [number, number];
};

/** Places that shaped me. Only places with evidence; Uganda is deliberately absent (UWP was in New York). */
export const places: Place[] = [
  { id: "kigali", name: "Kigali, Rwanda", region: "east-africa", lon: 30.06, lat: -1.95, nudge: [-3, -8], when: "Born and raised", text: "Home. It is also where SAquaSolve’s nine founding members held the general assembly that established the organization in August 2026.", figure: { src: "/images/places/kigali.jpg", alt: "Sonia in Kigali", want: "A photo of you in Kigali." }, link: { label: "SAquaSolve Rwanda", href: "/work/saquasolve-rwanda" } },
  { id: "gashora", name: "Gashora, Rwanda", region: "east-africa", lon: 30.25, lat: -2.25, nudge: [6, 10], when: "2021 – 2024", text: "Three years at Gashora Girls Academy, beside Lake Mirayi. The lake is the reason SAquaSolve exists.", figure: { src: "/images/sq-lake-mirayi.jpg", alt: "Lake Mirayi with reeds in the foreground", caption: "Lake Mirayi. Photo by Nadine Uwizeyimana." }, link: { label: "SAquaSolve Rwanda", href: "/work/saquasolve-rwanda" } },
  { id: "arusha", name: "Arusha, Tanzania", region: "east-africa", lon: 36.68, lat: -3.37, when: "2023", text: "Where I received my East African Community essay prize, representing Rwanda.", figure: { src: "/images/eac-award-2.jpg", alt: "Sonia receiving her East African Community essay prize in Arusha", pos: "80% 35%" }, link: { label: "Recognition", href: "/about#recognition" } },
  { id: "virginia", name: "Blacksburg, Virginia", region: "us", lon: -80.41, lat: 37.23, when: "2023", text: "TechGirls at Virginia Tech: flume experiments on open-channel flow, and my first Python.", figure: { src: "/images/techgirls-virginia-tech.jpg", alt: "Sonia on the Virginia Tech campus at sunset", pos: "50% 40%" }, link: { label: "Flume experiments", href: "/work/virginia-tech-flume" } },
  { id: "colorado", name: "Denver, Colorado", region: "us", lon: -104.99, lat: 39.74, when: "2023 and 2026", text: "A two-day job shadow at the Colorado Department of Transportation in 2023, then a return in 2026 as an engineering intern, when I built CDOT Compass.", figure: { src: "/images/cdot-welcome-colorado.jpg", alt: "Sonia beside a Welcome to Colorful Colorado sign at CDOT headquarters", pos: "60% 40%" }, link: { label: "CDOT Compass", href: "/work/cdot-compass" } },
  { id: "rochester", name: "Rochester, New York", region: "us", lon: -77.61, lat: 43.16, when: "2024 – present", text: "Mechanical engineering at the University of Rochester as a Handler Scholar, with Aero Design, the IT Center, and a summer editorial internship.", figure: { src: "/images/rcl-presentation.jpg", alt: "Sonia with colleagues in front of her summer internship presentation slide", pos: "50% 70%" }, link: { label: "Experience", href: "/experience" } },
];
