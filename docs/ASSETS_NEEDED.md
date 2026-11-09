# Photos, artwork, and details to add

**How slots work.** Every image below has a fixed path. Until the file exists:
- **Live site (production):** nothing empty is ever shown. A project falls back to a designed text
  cover, a personal photo falls back to a flower or feather illustration, an event shows a designed
  date panel, and an award shows its text only.
- **Local and Vercel preview builds only:** a dashed pink "Photo slot" box shows where the image
  will go, with its path. Preview links need a Vercel login, so they are not public.

**To fill a slot**, save the image at the exact path (under `public/`), as a JPG about 1600 px wide
(PNG for charts and screenshots), then rebuild. Captions and alt text live in `src/content/`.
Never add confidential CDOT/AGR material, internal data, or identifiable photos of workshop
participants (especially minors) without consent.

Hypothetical slots (an unnamed future award and two unnamed future events) were removed on
9 Nov 2026. To add a new award or event, add a normal entry in `src/content/about.ts`.

## Checklist (deduplicated, in priority order)

| # | Project / event | Image needed | Placement | Path (`public/…`) | Existing alternative | Optional? |
|---|---|---|---|---|---|---|
| 1 | Aero Design | Best Siemens NX screenshot of the wing or airframe | Homepage project card + case-study cover | `/images/aero/wing-cad.jpg` | None on file | No: homepage feature |
| 2 | CDOT Compass | Innovations Challenge certificate, announcement slide, or ceremony photo | Compass › Recognition; About › Recognition | `/images/compass/innovation-award.jpg` | `cdot-compass-idea-card.jpg` already shown beside it | No |
| 3 | SAquaSolve | Founding general assembly group photo (20 Aug 2026), no ID documents visible | SAquaSolve › Building the organization | `/images/saquasolve/founding-assembly.jpg` | None on file | No |
| 4 | MarketBite / Heist | Any photo from the Heist: team, stage, demo, or venue. You don't need to be in it | MarketBite › Pitch and award; About › Events (Heist) | `/images/marketbite/pitch.jpg` | Events card shows a designed date panel meanwhile | No |
| 5 | MarketBite / Heist | Award photo, certificate, or winners-page screenshot | MarketBite › Pitch and award; About › Recognition | `/images/marketbite/award.jpg` | A screenshot of the Ain Center Heist page would work | No |
| 6 | Aero Design | FEA stress/deflection plot comparing two options | Aero › The challenge | `/images/aero/fea-comparison.jpg` | None on file | No |
| 7 | Aero Design | Laser-cut parts or prototype (also shows fabrication skills) | Aero › What I did | `/images/aero/prototype.jpg` | None on file | No |
| 8 | Homepage | Sharper portrait, at least 1200 × 1500 px | Homepage hero | `/images/portrait.jpg` (replace) | Current file is 800 × 800, slightly soft on high-density screens | Yes, recommended |
| 9 | Beyond › Art | A painting, shot straight on in daylight (+ title, year, medium) | Beyond › art collection | `/images/beyond/painting-1.jpg` | Blake Quarterly cover is in the collection | No: only one artwork until this arrives |
| 10 | Beyond › Art | A sketch (+ title, year, medium) | Beyond › art collection | `/images/beyond/sketch-1.jpg` | None on file | Yes |
| 11 | Timber truss | Dr.Frame screenshot of the final truss (forces or deflected shape) | Truss case-study cover | `/images/truss/model.jpg` | None on file | Yes |
| 12 | Timber truss | The three designs side by side, or a weight/deflection table. Two same-size images can become a before/after slider | Truss › Approach | `/images/truss/comparison.jpg` | None on file | Yes |
| 13 | CubeSat | CAD screenshot of the frame parts you modeled | CubeSat case study | `/images/cubesat/frame-cad.jpg` | None on file | Yes |
| 14 | CubeSat | Vibration or thermal plot from your MATLAB work | CubeSat case study | `/images/cubesat/simulation.jpg` | None on file | Yes |
| 15 | CDOT Compass | Aggregate survey chart (no names or emails) | Compass › The problem | `/images/compass/survey-summary.png` | None on file | Yes |
| 16 | Beyond › Movement | Rowing: on the water, the boathouse, or with your crew | Beyond › Movement | `/images/beyond/rowing.jpg` | Illustration shows meanwhile | Yes |
| 17 | Beyond › Movement | Karate: training, teaching, a kata, or your belt | Beyond › Movement | `/images/beyond/karate.jpg` | Illustration shows meanwhile | Yes |
| 18 | Beyond › Movement | Dance, ideally Rwandan dance or a cultural event | Beyond › Movement | `/images/beyond/dance.jpg` | Illustration shows meanwhile | Yes |
| 19 | Beyond › Singing and faith | Choir photo, with the choir's permission | Beyond › Singing and faith | `/images/beyond/choir.jpg` | None (section works without it) | Yes |
| 20 | Places › Kigali | A photo of you in Kigali | About › Places that shaped me | `/images/places/kigali.jpg` | #3 could double here if taken in Kigali | Yes |
| 21 | SAquaSolve | The four Youth Ambassadors, only with their and the school's consent | SAquaSolve › Two days of community workshops | `/images/saquasolve/youth-ambassadors.jpg` | Two workshop photos already shown | Yes |
| 22 | MarketBite | Your slide 2 (problem) and slide 6 (market), side by side | MarketBite › Pitch and award | `/images/marketbite/my-slides.jpg` | None on file | Yes |
| 23 | Aero Design | Team build or test-day photo | Aero › Build and test | `/images/aero/team-build.jpg` | None on file | Yes |
| 24 | UniBooth | Pitch-night photo or booth mockup | UniBooth › The opportunity | `/images/unibooth/pitch.jpg` | `unibooth-mark.jpg` (logo) is the cover | Yes |
| 25 | CDOT bridge work | Public-site photo at Floyd Hill (nothing confidential) | CDOT bridge asset management | `/images/cdot/floyd-hill.jpg` | `cdot-field-site.jpg` already used | Yes |
| 26 | TechGirls CAP | A photo from the 2023 community workshops | TechGirls Community Action Project | `/images/techgirls-cap/workshop.jpg` | None (the 2023 LinkedIn "journey" photos are Virginia Tech) | Yes |
| 27 | TechGirls CAP | CAP certificate scan | TechGirls Community Action Project | `/images/techgirls-cap/certificate.jpg` | `cert-techgirls-2023.jpg` is the exchange certificate, not the CAP one | Yes |
| 28 | Bowl Voyage | Gameplay screenshot | Bowl Voyage | `/images/bowl-voyage/gameplay.jpg` | None on file | Yes |

**Unused certificates already on file** (in `sonia-portfolio/assets-originals/certificates/`):
Institution of Engineers Rwanda essay recognition (2023), Maxwell iChoose leadership (2023),
Gashora Gavel Club "Miss Creativity" (2022), Kigali Public Library coding and robotics (2019),
FAWE STEM mentoring camp (2019), and the TechGirls Alumnae Advisory Council certificate (2024). Say
which ones you want on About › Recognition and I'll add them.

See `docs/CONTENT_MAP.md` for the personal details and words only you can supply.

## Swapping the homepage mechanical project
`featuredSlugs` in `src/content/projects.ts`. Replace `"aero-design"` with `"timber-truss-bridge"`
or `"cubesat-structures"` if one of those ends up with stronger visuals.
