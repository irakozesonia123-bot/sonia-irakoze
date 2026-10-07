import type { Feature, Interest, Place, TurningPoint } from "./types";

export const features: Feature[] = [
  {
    id: "ur-p4p",
    outlet: "University of Rochester · Student Fellowships Office",
    headline: "Congratulations to our most recent University of Rochester Projects for Peace recipients",
    kind: "University announcement",
    date: "2026",
    sort: 2026.05,
    excerpt: "Profiles the 2026 grant for “AquaSolve Rwanda: Solar-Powered Filtration for Peace” on Lake Mirayi in Bugesera District.",
    href: "https://www.rochester.edu/college/studentfellowships/news-events/projects-for-peace.html",
    image: { src: "/images/projects-for-peace-grantee.jpg", alt: "Projects for Peace grantee graphic with Sonia’s portrait" },
    visibility: "public",
  },
  {
    id: "p4p-reading-room",
    outlet: "Davis Projects for Peace · Reading Room (Middlebury)",
    headline: "Added to the Projects for Peace Reading Room",
    kind: "Program feature",
    date: "Jul 2026",
    sort: 2026.07,
    excerpt: "The program’s library of funded projects added the University of Rochester’s 2026 recipients, including SAquaSolve.",
    href: "https://www.middlebury.edu/projects-peace/congratulations-our-most-recent-university-rochester-projects-peace-recipients",
    visibility: "public",
  },
  {
    id: "cdot-lean",
    outlet: "Colorado Department of Transportation · Lean Everyday Ideas",
    headline: "CDOT Compass",
    kind: "Agency publication",
    date: "Jul 2, 2026",
    sort: 2026.07,
    excerpt: "CDOT’s Process Improvement office published my prototype as a #BorrowThis idea for onboarding.",
    href: "https://docs.google.com/presentation/d/12Ta0FAas_kKpvBQ0F2O1W6uQZGFcWMgNj-wkbhd-SQ0/",
    image: { src: "/images/cdot-compass-idea-card.jpg", alt: "CDOT Lean Everyday Ideas card for CDOT Compass" },
    visibility: "public",
  },
  {
    id: "worlddenver",
    outlet: "WorldDenver · Instagram",
    headline: "2023 TechGirls participant returns to Denver",
    kind: "Social feature",
    date: "Jun 2026",
    sort: 2026.06,
    excerpt: "WorldDenver, which hosted my 2023 TechGirls visit, featured my return to Colorado as a CDOT engineering intern.",
    href: "https://www.instagram.com/p/DZdOJtYE6Up/",
    visibility: "public",
  },
  {
    id: "blake-cover",
    outlet: "Blake/An Illustrated Quarterly · Vol. 59, No. 1",
    headline: "Summer 2025 cover",
    kind: "Published work",
    date: "Summer 2025",
    sort: 2025.07,
    excerpt: "Cover design for the University of Rochester–based journal on William Blake.",
    image: { src: "/images/blake-cover.jpg", alt: "Blake: An Illustrated Quarterly Summer 2025 cover" },
    visibility: "public",
    needs: ["Link to the published issue"],
  },
  { id: "p4p-film", outlet: "[VERIFY] Projects for Peace", headline: "[VERIFY] 20th anniversary film", kind: "Film", date: "[VERIFY]", sort: 2026, excerpt: "[VERIFY participation and link]", visibility: "hidden", needs: ["Confirm participation, release date, link"] },
];

/** Places with a story. Coordinates are real; the map is schematic. */
export const places: Place[] = [
  { id: "kigali", name: "Kigali", region: "east-africa", lat: -1.9441, lon: 30.0619, years: "Home", headline: "Where it starts", story: "Home. A STEM mentoring camp and a coding and robotics competition in 2019 were my first taste of building things. NextGen4All mentoring keeps me connected to students here." },
  { id: "gashora", name: "Gashora · Lake Mirayi", region: "east-africa", lat: -2.2167, lon: 30.2667, years: "2021 – now", headline: "School by the lake, and the water problem I chose", story: "Three years as a boarding student at Gashora Girls Academy, next to Lake Mirayi. In 2023 I came back to speak about TechGirls; in 2026 SAquaSolve held two days of workshops here with 53 residents.", links: [{ label: "SAquaSolve case study", href: "/work/saquasolve-rwanda" }] },
  { id: "arusha", name: "Arusha", region: "east-africa", lat: -3.3869, lon: 36.683, years: "2022", headline: "Representing Rwanda", story: "Received 3rd prize in the East African Community essay competition, my first time representing my country.", links: [{ label: "Recognition", href: "/recognition" }] },
  { id: "blacksburg", name: "Blacksburg, VA", region: "north-america", lat: 37.2296, lon: -80.4139, years: "2023", headline: "Virginia Tech and Washington, DC, through TechGirls", story: "Flume experiments and my first Python at Virginia Tech, then site visits to NASA Goddard and Washington, DC, with a cohort of girls from around the world.", links: [{ label: "Flume project", href: "/work/virginia-tech-flume" }] },
  { id: "denver", name: "Denver, CO", region: "north-america", lat: 39.7392, lon: -104.9903, years: "2023 · 2026", headline: "The job shadow that came true", story: "A two-day TechGirls job shadow at CDOT in 2023. In 2026, back as an engineering intern on the same team: bridge data, field inspections, and CDOT Compass.", links: [{ label: "Bridge work", href: "/work/cdot-bridge-asset-management" }, { label: "CDOT Compass", href: "/work/cdot-compass" }] },
  { id: "rochester", name: "Rochester, NY", region: "north-america", lat: 43.1566, lon: -77.6088, years: "2024 – now", headline: "Engineering school, and everything around it", story: "Mechanical engineering, CubeSat, Aero Design, NSBE, the IT Center, the libraries, the Ugandan Water Project in nearby Lima, AGR Sensors, and the women’s rowing team.", links: [{ label: "Experience", href: "/experience" }] },
  { id: "chicago", name: "Chicago, IL", region: "north-america", lat: 41.8781, lon: -87.6298, years: "2025", headline: "First NSBE convention", story: "NSBE’s 50th anniversary convention, where I got clarity on my major.", links: [{ label: "Field notes", href: "/field-notes" }] },
  { id: "albany", name: "Albany, NY", region: "north-america", lat: 42.6526, lon: -73.7562, years: "2025", headline: "Regional NSBE, as Senator", story: "The Fall Regional Conference, representing my chapter.", links: [{ label: "Field notes", href: "/field-notes" }] },
  { id: "baltimore", name: "Baltimore, MD", region: "north-america", lat: 39.2904, lon: -76.6122, years: "2026", headline: "Second NSBE convention", story: "Back at the national convention, this time as the chapter’s elected Senator.", links: [{ label: "Field notes", href: "/field-notes" }] },
];

/** Cause → effect. Not a second résumé. */
export const turningPoints: TurningPoint[] = [
  { id: "ggast", year: "2021", place: "Gashora", moment: "Boarding school next to a lake people couldn’t safely drink from", detail: "Three years at Gashora Girls Academy, studying physics, chemistry, and math.", led: "The problem SAquaSolve exists to solve, and the relationships that let us work there.", placeId: "gashora" },
  { id: "eac", year: "2022", place: "Arusha", moment: "An essay sent me abroad for the first time", detail: "3rd prize in the East African Community essay competition, representing Rwanda.", led: "Confidence that my writing could open doors.", placeId: "arusha" },
  { id: "techgirls", year: "2023", place: "Virginia · Denver", moment: "TechGirls, and two days at CDOT", detail: "STEM instruction at Virginia Tech, then a job shadow with CDOT’s bridge engineers.", led: "A quiet wish to come back to CDOT, and a first look at water engineering in a lab.", placeId: "denver" },
  { id: "founding", year: "2023", place: "Gashora", moment: "Starting SAquaSolve", detail: "Turned the lake problem into a project with a name.", led: "Three years of learning what it takes to build water infrastructure responsibly.", placeId: "gashora" },
  { id: "rochester", year: "2024", place: "Rochester", moment: "Mechanical engineering at Rochester, as a Handler Scholar", detail: "Engineering teams, NSBE, campus jobs, and a community of mentors.", led: "CubeSat, Aero Design, leadership roles, and the people who pointed me to the next opportunities.", placeId: "rochester" },
  { id: "uwp", year: "2025", place: "Lima, NY", moment: "A summer funding someone else’s water projects", detail: "Development intern at the Ugandan Water Project.", led: "Learning how water work gets funded, and a relationship that continued as support for my Projects for Peace project.", placeId: "rochester" },
  { id: "p4p", year: "2026", place: "Rochester → Gashora", moment: "Projects for Peace", detail: "A $10,000 grant for SAquaSolve.", led: "Workshops with 53 residents, a field assessment, and water testing in Gashora.", placeId: "gashora" },
  { id: "cdot", year: "2026", place: "Denver", moment: "Back at CDOT, as an intern", detail: "Bridge asset data and field inspections on the team I once shadowed.", led: "CDOT Compass, a published idea, and a clear interest in infrastructure.", placeId: "denver" },
];

export const interests: Interest[] = [
  { id: "rowing", label: "Rowing", line: "I row with the University of Rochester women’s rowing team. Early mornings, synchronized effort, and something hard I chose to take on at Rochester.", visibility: "public", needs: ["Rowing photo", "Confirm how to describe your role (varsity/novice/club)"] },
  { id: "karate", label: "Shotokan karate", line: "I’ve trained in Shotokan karate since high school at Gashora, and continue at Rochester.", visibility: "public", needs: ["Photo", "Belt or rank, if you want it mentioned"] },
  { id: "singing", label: "Singing", line: "I sing in my church choir, where I also serve as a deaconess.", visibility: "public", needs: ["Photo (optional)"] },
  { id: "painting", label: "Painting", line: "I paint.", visibility: "public", needs: ["A painting to show", "Confirm wording"] },
  { id: "writing", label: "Writing", line: "Essays got me to Arusha and won prizes; now I write grant proposals and technical reports.", visibility: "public" },
];

export const publicFeatures = features.filter((f) => f.visibility === "public");
export const publicInterests = interests.filter((i) => i.visibility === "public");
